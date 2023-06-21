import { auth } from "@/services/firebase.init";
import { useDeleteProductMutation } from "@/services/queries/adminApi";
import { useGetInventoriesQuery } from "@/services/queries/homeApi";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { ToastContainer, toast } from "react-toastify";

const ManageProducts = () => {
  const [user, loading, error] = useAuthState(auth);
  const { data: products, isLoading } = useGetInventoriesQuery<any>(null);

  const [deleteProduct, others] = useDeleteProductMutation();

  const handleDelete = async (id: string) => {
    const { Confirm } = await import("react-st-modal");
    const isConfirmed = await Confirm(
      "You can't undo this action",
      "Are you sure?"
    );

    if (isConfirmed) {
      const result: any = await deleteProduct(id);

      if (result?.data?.acknowledged) {
        toast.success("You have deleted an product!", {
          position: toast.POSITION.BOTTOM_CENTER,
          toastId: 1,
        });
      }
    }
  };

  return (
    <div className="w-full">
      <p className="mt-5 text-md text-red-500 text-center md:hidden lg:hidden">
        Your device seems too small to show this page
      </p>

      <div className="overflow-x-auto hidden md:hidden lg:block">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Admin&apos;s Email</th>
              <th>Product Name</th>
              <th>Price</th>
              <th>Available Quantity</th>
              <th>Min Quantity</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {products?.map((d: any) => (
              <tr key={d?._id}>
                <td>{d?.email}</td>
                <td>{d?.name}</td>
                <td>{d?.price}</td>
                <td>{d?.avlQuantity}</td>
                <td>{d?.minQuantity}</td>

                <td>
                  <button
                    disabled={d?.email !== user?.email}
                    onClick={() => handleDelete(d?._id)}
                    className="bg-[#000944] text-white py-2 px-3 btn hover:bg-slate-500 hover:text-white"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ToastContainer></ToastContainer>
    </div>
  );
};

export default ManageProducts;
