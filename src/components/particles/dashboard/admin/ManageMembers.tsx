import {
  useGetUsersQuery,
  useHandleAdminMutation,
} from "@/services/queries/adminApi";
import React from "react";
import Loading from "../../shared/Loading";

const ManageMembers = () => {
  const { data, isLoading } = useGetUsersQuery<any>(null);

  const [action, others] = useHandleAdminMutation();

  const makeAdmin = async (email: string) => {
  const res = await  action({ email, role: "admin" });
  console.log(res)
  };

  const removeAdmin = async (email: string) => {
    action({ email, role: "member" });
  };

  if (isLoading) {
    return <Loading></Loading>;
  }
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
                    onClick={() => makeAdmin(d?.email)}
                    className="bg-[#000944] text-white py-2 px-3 btn hover:bg-slate-500 hover:text-white"
                  >
                    Make
                  </button>
                </td>
                <td>
                  <button
                    disabled={d?.role !== "admin"}
                    onClick={() => removeAdmin(d?.email)}
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
    </div>
  );
};

export default ManageMembers;
