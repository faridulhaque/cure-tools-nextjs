import React from "react";
import Navbar from "../particles/shared/Navbar";
import Footer from "../particles/shared/Footer";
import MyProfile from "../particles/dashboard/MyProfile";
import { useRouter } from "next/router";
import Sidebar from "../particles/dashboard/Sidebar";
import Link from "next/link";
import AddReview from "../particles/dashboard/user/AddReview";
import MyOrders from "../particles/dashboard/user/MyOrders";
import RequireCommon from "@/Requires/RequireCommon";
import RequireUser from "@/Requires/RequireUser";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/services/firebase.init";
import { useGetUserProfileQuery } from "@/services/queries/profileApi";
import Loading from "../particles/shared/Loading";
import AddNewProduct from "../particles/dashboard/admin/AddNewProduct";
import RequireAdmin from "@/Requires/RequireAdmin";
import ManageOrders from "../particles/dashboard/admin/ManageOrders";
import ManageProducts from "../particles/dashboard/admin/ManageProducts";
import ManageMembers from "../particles/dashboard/admin/ManageMembers";

const DashboardIndex = () => {
  const router = useRouter();

  const [user, loading] = useAuthState(auth);

  const { data: profileData, isLoading } = useGetUserProfileQuery<any>(
    user?.email
  );

  const items = [
    {
      title: "My Profile",
      link: "/dashboard/profile",
      comp: (
        <RequireCommon>
          <MyProfile></MyProfile>
        </RequireCommon>
      ),
    },
    {
      title: "Add a Review",
      link: "/dashboard/add_review",
      comp: (
        <RequireUser>
          <AddReview></AddReview>
        </RequireUser>
      ),
    },
    {
      title: "My Orders",
      link: "/dashboard/my_orders",
      comp: (
        <RequireUser>
          <MyOrders></MyOrders>
        </RequireUser>
      ),
    },
    {
      title: "My Profile",
      link: "/dashboard/profile",
      comp: (
        <RequireCommon>
          <MyProfile></MyProfile>
        </RequireCommon>
      ),
    },
    {
      title: "Add New Product",
      link: "/dashboard/add_new_product",
      comp: (
        <RequireAdmin>
          <AddNewProduct></AddNewProduct>
        </RequireAdmin>
      ),
    },
    {
      title: "Manage Orders",
      link: "/dashboard/manage_orders",
      comp: (
        <RequireAdmin>
          <ManageOrders></ManageOrders>
        </RequireAdmin>
      ),
    },
    {
      title: "Manage Products",
      link: "/dashboard/manage_products",
      comp: (
        <RequireAdmin>
          <ManageProducts></ManageProducts>
        </RequireAdmin>
      ),
    },
    {
      title: "Manage Members",
      link: "/dashboard/manage_members",
      comp: (
        <RequireAdmin>
          <ManageMembers></ManageMembers>
        </RequireAdmin>
      ),
    },
  ];

  let foundItem = items.find((item: any) => item.link === router.route);

  let currentItem = foundItem?.link ? foundItem : items[0];

  if (loading || isLoading) return <Loading></Loading>;

  return (
    <>
      <Navbar></Navbar>

      <div className="drawer">
        <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col">
          {/* Navbar */}
          <div className="w-11/12 navbar bg-white border-y-2 border-[#000944] my-5 mx-auto">
            <div className="flex-none lg:hidden">
              <label htmlFor="my-drawer-3" className="btn btn-square btn-ghost">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="inline-block w-6 h-6 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  ></path>
                </svg>
              </label>
            </div>
            <div className="flex-1 px-2 mx-2">{currentItem?.title}</div>
            <div className="flex-none hidden lg:block">
              {profileData?.role != "admin" ? (
                <ul className="menu menu-horizontal">
                  {/* Navbar menu content here */}
                  {items.slice(0, 3).map((item: any) => (
                    <li key={item.title}>
                      <Link
                        className={`${
                          item.link === router.route
                            ? "text-white bg-[#000944] px-3 py-2 rounded-sm"
                            : ""
                        }`}
                        href={item.link}
                      >
                        {item.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <ul className="menu menu-horizontal">
                  {/* Navbar menu content here */}
                  {items.slice(3, items.length).map((item: any) => (
                    <li key={item.link}>
                      <Link
                        className={`${
                          item.link === router.route
                            ? "text-white bg-[#000944] px-3 py-2 rounded-sm"
                            : ""
                        }`}
                        href={item.link}
                      >
                        {item.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
          {/* Page content here */}
          <div
            className={`mx-auto my-5 min-h-screen ${
              currentItem?.link == "/dashboard/profile"
                ? "w-10/12 lg:w-2/5 "
                : profileData?.role == "admin"
                ? "w-10/12"
                : "w-10/12 lg:w-2/5 "
            }`}
          >
            {currentItem?.comp}
          </div>
        </div>
        <div className="drawer-side">
          <label htmlFor="my-drawer-3" className="drawer-overlay"></label>
          {profileData?.role === "admin" ? (
            <ul className="menu p-4 w-full h-full bg-base-200">
              {items.slice(0, 3).map((item: any) => (
                <li key={item.link}>
                  <Link
                    className={`${
                      item.link === router.route
                        ? "text-white bg-[#000944] px-3 py-2 rounded-sm"
                        : ""
                    }`}
                    href={item.link}
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <ul className="menu p-4 w-full h-full bg-base-200">
              {items.slice(3, items?.length).map((item: any) => (
                <li key={item.link}>
                  <Link
                    className={`${
                      item.link === router.route
                        ? "text-white bg-[#000944] px-3 py-2 rounded-sm"
                        : ""
                    }`}
                    href={item.link}
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <Footer></Footer>
    </>
  );
};

export default DashboardIndex;
