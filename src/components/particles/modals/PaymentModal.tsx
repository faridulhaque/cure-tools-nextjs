import React from "react";

const PaymentModal = ({ setModalData }: any) => {
  return (
    <div className="fixed w-full h-screen top-0 left-0 open-modal z-10">
      <div className="w-11/12 lg:w-2/5 py-10 absolute top-0 left-0 bottom-0 right-0 m-auto bg-white h-[400px] rounded-md shadow-2xl">
        <button
          onClick={() => setModalData(null)}
          className="absolute text-white text-xl bg-white rounded-full px-4 py-3 bg-black right-[-5px] top-[-5px]"
        >
          X
        </button>
      </div>
    </div>
  );
};

export default PaymentModal;
