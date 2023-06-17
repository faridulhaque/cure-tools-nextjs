import { auth } from "@/services/firebase.init";
import { useGetUserOrdersQuery } from "@/services/queries/userOrdersApi";
import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import PaymentModal from "../../modals/PaymentModal";

const MyOrders = () => {
  const [modalData, setModalData] = useState<any>(null);

  const [user, loading] = useAuthState(auth);

  const email: any = "faridulhaquemurshed@gmail.com";

  const { data, isLoading } = useGetUserOrdersQuery<any>(email);

  return (
    <>
      <div className="w-full">
        <p className="mt-5 text-md text-red-500 text-center lg:hidden">
          Your device seems too small to show this page
        </p>
        <div className="overflow-x-auto hidden lg:block">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Quantity (unit)</th>
                <th>Price (unit)</th>
                <th>Total Price</th>
                <th>Payment Status</th>
                <th>Pay</th>
                <th>Cancel</th>
              </tr>
            </thead>
            <tbody>
              {data?.map((d: any) => (
                <tr key={d?._id}>
                  <td>{d?.productName}</td>
                  <td>{d?.quantity}</td>
                  <td>{d?.price}</td>
                  <td className="">
                    {parseInt(d?.quantity) * parseInt(d?.price)}
                  </td>

                  <td
                    className={`${
                      d?.payment ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    {d?.payment ? "Paid" : "Unpaid"}
                  </td>

                  <td>
                    <button
                      onClick={() =>
                        setModalData(d)
                      }
                      className="bg-[#000944] text-white py-2 px-3 hover:bg-slate-500 hover:text-white btn"
                    >
                      Pay now
                    </button>
                  </td>
                  <td>
                    <button
                      disabled={d?.payment}
                      className="bg-red-600 text-white py-2 px-3 hover:bg-red-500 hover:text-white btn"
                    >
                      Cancel
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {modalData?._id && (
        <PaymentModal
          setModalData={setModalData}
          modalData={modalData}
        ></PaymentModal>
      )}
    </>
  );
};

export default MyOrders;
