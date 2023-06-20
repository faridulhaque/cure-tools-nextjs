import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import CheckoutForm from "../dashboard/user/CheckoutForm";
import { Elements } from "@stripe/react-stripe-js";

const stripe_pk = process.env.NEXT_PUBLIC_STRIPE_PK || "";
const stripePromise = loadStripe(stripe_pk);

const PaymentModal = ({ setModalData, modalData }: any) => {
  const totalPrice = parseInt(modalData?.price) * parseInt(modalData?.quantity)
  return (
    <div className="fixed w-full h-screen top-0 left-0 open-modal z-10">
      <div className="w-11/12 lg:w-2/5 py-10 px-5 absolute top-0 left-0 bottom-0 right-0 m-auto bg-white h-[400px] rounded-md shadow-2xl">
        <h2 className="text-3xl text-[#000944]">{modalData.productName}</h2>
        <p className="text-xl my-5 text-[#000944]">
          Pay ${" "}
          <strong className="text-green-500">{totalPrice}</strong>{" "}
          Now!
        </p>
        <Elements stripe={stripePromise}>
          <CheckoutForm modalData={modalData} setModalData={setModalData}></CheckoutForm>
        </Elements>
        <button
          onClick={() => setModalData(null)}
          className="absolute text-white text-xl rounded-full px-4 py-3 bg-black right-[-5px] top-[-5px]"
        >
          X
        </button>
      </div>
    </div>
  );
};

export default PaymentModal;
