import {
  useGetOrdersQuery,
  useMakeShipmentMutation,
} from "@/services/queries/adminApi";
import React from "react";
import Loading from "../../shared/Loading";
import { useMakeContactMutation } from "@/services/queries/homeApi";

const ManageOrders = () => {
  const { data, isLoading } = useGetOrdersQuery<any>(null);

  const [makeShipment, { isLoading: shipmentLoading }] =
    useMakeShipmentMutation<any>();

  if (isLoading) return <Loading></Loading>;

  return (
    <div className="w-full">
      <p className="mt-5 text-md text-red-500 text-center lg:hidden">
        Your device seems too small to show this page
      </p>
      <div className="overflow-x-auto hidden lg:block">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Client&apos;s Name</th>
              <th>Client&apos;s Email</th>
              <th>Product Name</th>
              <th>Quantity (unit)</th>
              <th>Total Price</th>
              <th>Payment Status</th>
              <th>Shipping Status</th>
              <th>Change shipment</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((d: any) => (
              <tr key={d?._id}>
                <td>{d?.name}</td>
                <td>{d?.email}</td>
                <td>{d?.productName}</td>
                <td>{d?.quantity}</td>
                <td className="text-right">
                  {parseInt(d?.quantity) * parseInt(d?.price)}
                </td>
                <td
                  className={`${
                    d?.payment ? "text-green-500" : "text-red-500"
                  } text-center`}
                >
                  {d?.payment ? "Paid" : "Unpaid"}
                </td>
                <td
                  className={`${
                    d?.shipment ? "text-green-500" : "text-red-500"
                  } text-center`}
                >
                  {d?.shipment ? "Shipped" : "Unshipped"}
                </td>
                <td>
                  <button
                    onClick={() => makeShipment(d?._id)}
                    disabled={!d?.payment || shipmentLoading || d?.shipment}
                    className="bg-[#000944] text-white py-2 px-3 hover:bg-slate-500 hover:text-white btn"
                  >
                    Shipped
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageOrders;
