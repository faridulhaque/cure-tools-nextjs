import { auth } from "@/services/firebase.init";
import { useGetUserProfileQuery } from "@/services/queries/profileApi";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import Loading from "../shared/Loading";
import { useSaveOrderMutation } from "@/services/queries/userOrdersApi";

import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/router";

const OrderForm = ({ product }: any) => {
  const router = useRouter();

  const [user, loading] = useAuthState(auth);

  const email = user?.email;

  const { data: profileData, isLoading: profileLoading } =
    useGetUserProfileQuery<any>(email);

  const [saveOrder, others] = useSaveOrderMutation<any>();

  if (loading || profileLoading) return <Loading></Loading>;

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const { Alert } = await import("react-st-modal");
    console.log(e.target.quantity.value)
    console.log(product.minQuantity)

    if (
      e.target.quantity.value < product?.minQuantity ||
      e.target.quantity.value > product?.avlQuantity
    )
      return Alert(
        `Quantity must be between ${product.minQuantity} and ${product.avlQuantity}`,"Warning!"
      );

    const name = e.target.name.value;
    const productName = product.name;
    const price = product.price;
    const payment = false;
    const shipment = false;

    const phone = e.target.phone.value;
    const address = e.target.address.value;
    const email = e.target.email.value;
    const quantity = e.target.quantity.value;

    const result: any = await saveOrder({
      name,
      productName,
      price,
      payment,
      shipment,
      phone,
      address,
      email,
      quantity,
    });

    if (result?.data?.acknowledged) {
      const { Confirm } = await import("react-st-modal");
      const isConfirmed = await Confirm(
        "Would you like to visit the orders page to continue payment?",
        "Your order has been saved!"
      );
      if (isConfirmed) {
        router.push("/dashboard/my_orders");
      }

      e.target.reset();
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full lg:w-3/5 mx-auto bg-[#000944] py-10 px-10 shadow-xl"
    >
      <h2 className="text-center text-white text-4xl my-3">Order Form</h2>
      <div className="w-full grid lg:grid-cols-2 justify-items-center mx-auto gap-5">
        <div className="w-full">
          <label className="text-md uppercase text-white " htmlFor="">
            Your Name
          </label>
          <br />
          <input
            defaultValue={profileData?.displayName}
            className="w-full h-14 mt-2 outline-none border-none rounded-md bg-white"
            type="text"
            required
            id="name"
            name="name"
          />
        </div>

        <div className="w-full">
          <label className="text-md  text-white uppercase" htmlFor="">
            email
          </label>
          <br />
          <input
            className="w-full h-14 mt-2 outline-none border-none rounded-md bg-white"
            type="email"
            required
            id="email"
            name="email"
            disabled
            value={profileData?.email}
          />
        </div>

        <div className="w-full">
          <label className="text-md uppercase text-white " htmlFor="">
            Phone{" "}
          </label>
          <br />
          <input
            className="w-full h-14 mt-2 outline-none border-none rounded-md bg-white"
            type="text"
            required
            id="phone"
            name="phone"
            defaultValue={profileData?.phone}
          />
        </div>

        <div className="w-full">
          <label className="text-md text-white uppercase" htmlFor="">
            quantity
          </label>
          <br />
          <input
            className="w-full h-14 mt-2 outline-none border-none rounded-md bg-white"
            type="text"
            required
            id="quantity"
            name="quantity"
          />
        </div>
      </div>
      <div className="mt-5">
        <label className="text-md text-white uppercase" htmlFor="">
          Address
        </label>
        <textarea
          className="block mx-auto w-full h-40 mt-2 outline-none border-none rounded-md resize-none bg-white"
          name="address"
          id=""
          defaultValue={profileData?.address}
        ></textarea>
      </div>
      <button
        type="submit"
        className="btn bg-white uppercase w-full py-3 mt-5 text-[#000944] rounded-md "
      >
        Submit
      </button>

      <ToastContainer></ToastContainer>
    </form>
  );
};

export default OrderForm;
