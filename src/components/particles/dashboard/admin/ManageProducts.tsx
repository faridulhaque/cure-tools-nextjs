import { auth } from "@/services/firebase.init";
import { useDeleteProductMutation } from "@/services/queries/adminApi";
import { useGetInventoriesQuery } from "@/services/queries/homeApi";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";

const ManageProducts = () => {
  const [user, loading, error] = useAuthState(auth);
  const { data: products, isLoading } = useGetInventoriesQuery<any>(null);

  const [action, others] = useDeleteProductMutation();

  const deleteProduct = async (_id: string) => {
    const result = await action(_id);
    console.log(result);
  };

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
                    onClick={() => deleteProduct(d?._id)}
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
    </div>
  );
};

export default ManageProducts;
