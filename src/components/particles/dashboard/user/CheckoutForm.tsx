import { useMakePaymentMutation, useUpdatePaymentMutation } from "@/services/queries/userOrdersApi";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import React from "react";
import { Alert } from "react-st-modal";

const CheckoutForm = ({ modalData }: any) => {
  console.log(modalData)
  const [clientSecret, setClientSecret] = React.useState<any>("");

  const stripe = useStripe();
  const elements = useElements();

  const [createPaymentIntent, others] = useMakePaymentMutation<any>();
  const [updatePayment, paymentStatusInfo] = useUpdatePaymentMutation<any>()

  React.useEffect(() => {
    const fetchData = async () => {
      const response: any = await createPaymentIntent({
        totalPrice: modalData.price * modalData?.quantity,
      });
      setClientSecret(response?.data?.clientSecret);
    };

    fetchData();
  }, [createPaymentIntent, modalData?.price, modalData?.quantity]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);
    if (card === null) return;

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("[error]", error);
    } else {
      console.log("[PaymentMethod]", paymentMethod);
    }

    // const response: any = await createPaymentIntent({
    //   totalPrice: modalData.totalPrice,
    // });
  
    const { paymentIntent, error: intentError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: modalData?.name,
            email: modalData?.email,
          },
        },
      });

      if(paymentIntent?.id){
        console.log(paymentIntent)
        // await Alert('Your payment is successful', 'Congratulations!')
        updatePayment({trId: paymentIntent?.id, id: modalData?._id})

      }
    }
  
  return (
    <form onSubmit={handleSubmit}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "24px",
              color: "#424770",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
      />
      <button
        className="mt-4 btn bg-[#000944] text-white hover:bg-[#000944]"
        type="submit"
        disabled={!stripe}
      >
        Pay
      </button>
    </form>
  );
};

export default CheckoutForm;
