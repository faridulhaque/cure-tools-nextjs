import {
  useMakePaymentMutation,
  useUpdatePaymentMutation,
} from "@/services/queries/userOrdersApi";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import React from "react";
import { Alert } from "react-st-modal";
import { ToastContainer, toast } from "react-toastify";

const CheckoutForm = ({ modalData, setModalData }: any) => {
  const [clientSecret, setClientSecret] = React.useState<any>("");

  const stripe = useStripe();
  const elements = useElements();

  const [createPaymentIntent, others] = useMakePaymentMutation<any>();
  const [updatePayment, paymentStatusInfo] = useUpdatePaymentMutation<any>();

  React.useEffect(() => {
    const fetchData = async () => {
      const response: any = await createPaymentIntent({
        totalPrice: parseInt(modalData.price) * parseInt(modalData?.quantity),
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
      // console.log("[error]", error);
    } else {
      // console.log("[PaymentMethod]", paymentMethod);
    }

    const { paymentIntent, error: intentError }: any =
      await stripe?.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: modalData?.name,
            email: modalData?.email,
          },
        },
      });

    if (intentError) {
      // console.log(intentError);
    }

    if (paymentIntent?.id) {
      paymentStatusUpdate(paymentIntent?.id);
      toast.success("Your payment is successful", {
        toastId: 1,
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }
  };

  const paymentStatusUpdate = async (trId: any) => {
    const result = await updatePayment({
      trId: trId,
      id: modalData?._id,
    });
    // console.log(result);
  };

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
        // onClick={() => testFun()}
        className="mt-4 btn bg-[#000944] text-white hover:bg-[#000944]"
        // type="button"
        type="submit"
        disabled={!stripe}
      >
        Pay
      </button>
      <ToastContainer></ToastContainer>
    </form>
  );
};

export default CheckoutForm;
