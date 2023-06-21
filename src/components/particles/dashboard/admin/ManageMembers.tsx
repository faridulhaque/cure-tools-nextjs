import {
  useGetUsersQuery,
  useHandleAdminMutation,
} from "@/services/queries/adminApi";
import React from "react";
import Loading from "../../shared/Loading";
import { ToastContainer, toast } from "react-toastify";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/services/firebase.init";

const ManageMembers = () => {
  const { data, isLoading } = useGetUsersQuery<any>(null);

  const [handleAdmin, others] = useHandleAdminMutation();

  const [user, loading] = useAuthState(auth);

  const userEmail = user?.email;

  if (isLoading || loading) {
    return <Loading></Loading>;
  }

  const handleMakeAdmin = async (email: string) => {
    const { Confirm } = await import("react-st-modal");
    const isConfirmed = await Confirm(
      "By granting someone admin privileges, you will enable them to access sensitive functions and revoke their actions as a regular member",
      "Are you sure?"
    );

    if (isConfirmed) {
      const result: any = await handleAdmin({ email: email, role: "admin" });

      if (result?.data?.acknowledged) {
        toast.success("You added a new admin successfully!", {
          position: toast.POSITION.BOTTOM_CENTER,
          toastId: 1,
        });
      }
    }
  };

  const handleRemoveAdmin = async (email: string) => {
    const { Confirm } = await import("react-st-modal");
    const isConfirmed = await Confirm(
      "By removing him from the admin role, he will have access as a regular member.",
      "Are you sure?"
    );

    if (isConfirmed) {
      const result: any = await handleAdmin({ email: email, role: "member" });
      if (result?.data?.acknowledged) {
        console.log(email)
        console.log(userEmail)
        if (userEmail == email) {
          window.location.reload();
        }
        toast.success("You removed an admin successfully!", {
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

      <div
        className="overflow-x-auto 
      hidden md:block lg:block"
      >
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th className="text-center">Make Admin</th>
              <th>Remove Admin</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((d: any) => (
              <tr key={d?._id}>
                <td>{d?.displayName}</td>
                <td>{d?.email}</td>
                <td>{d?.role}</td>

                <td className="text-center">
                  <button
                    disabled={d?.role === "admin"}
                    onClick={() => handleMakeAdmin(d?.email)}
                    className="bg-[#000944] text-white py-2 px-3 btn hover:bg-slate-500 hover:text-white"
                  >
                    Make
                  </button>
                </td>
                <td>
                  <button
                    disabled={
                      d?.role !== "admin" ||
                      d?.email == process.env.NEXT_PUBLIC_SA
                    }
                    onClick={() => handleRemoveAdmin(d?.email)}
                    className="bg-[#000944] text-white py-2 px-3 btn hover:bg-slate-500 hover:text-white"
                  >
                    Remove
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

export default ManageMembers;
