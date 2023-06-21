import { auth } from "@/services/firebase.init";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import Loading from "../../shared/Loading";
import { useAddProductMutation } from "@/services/queries/adminApi";
import { ToastContainer, toast } from "react-toastify";

const AddNewProduct = () => {
  const [error, setError] = React.useState("");
  const [user, loading] = useAuthState(auth);

  const email: any = user?.email;

  const [addProduct, { isLoading }] = useAddProductMutation();

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (e.target.img.value && !/^https?:\/\//i.test(e.target.img.value)) {
      return setError("Please add a valid URL");
    }
    const info = {
      email,
      name: e.target.name.value,
      price: parseInt(e.target.price.value),
      avlQuantity: parseInt(e.target.avlQuantity.value),
      minQuantity: parseInt(e.target.minQuantity.value),
      description: e.target.description.value,
      img: e.target.img.value,
    };

    const result: any = await addProduct(info);
    if (result.data.acknowledged) {
      toast.success("Item added successfully!", {
        position: toast.POSITION.BOTTOM_CENTER,
        toastId: 1,
      });
      e.target.reset();
    }
  };

  if (loading) return <Loading></Loading>;

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full bg-[#000944] grid grid-cols-1 lg:grid-cols-2 justify-items-center mx-auto gap-5 py-5"
    >
      <div className="w-11/12">
        <label className="text-md uppercase text-white" htmlFor="">
          Admin email
        </label>
        <br />
        <input
          className="w-full h-14 mt-2 outline-none border-none rounded-md bg-white"
          type="text"
          name="email"
          id="email"
          value={email}
          disabled
        />
      </div>
      <div className="w-11/12">
        <label className="text-md uppercase text-white" htmlFor="">
          Product Name
        </label>
        <br />
        <input
          className="w-full h-14 mt-2 outline-none border-none rounded-md bg-white"
          type="text"
          name="name"
          id="name"
          required
        />
      </div>

      <div className="w-11/12">
        <label className="text-md uppercase text-white" htmlFor="">
          Price
        </label>
        <br />
        <input
          className="w-full h-14 mt-2 outline-none border-none rounded-md bg-white"
          type="text"
          name="price"
          id="price"
          required
        />
      </div>

      <div className="w-11/12">
        <label className="text-md uppercase text-white" htmlFor="">
          Available Quantity
        </label>
        <br />
        <input
          className="w-full h-14 mt-2 outline-none border-none rounded-md bg-white"
          type="text"
          name="avlQuantity"
          id="avlQuantity"
          required
        />
      </div>

      <div className="w-11/12">
        <label className="text-md uppercase text-white" htmlFor="">
          Minimum Quantity
        </label>
        <br />
        <input
          className="w-full h-14 mt-2 outline-none border-none rounded-md bg-white"
          type="text"
          name="minQuantity"
          id="minQuantity"
          required
        />
      </div>

      <div className="w-11/12">
        <label className="text-md uppercase text-white" htmlFor="">
          Image Url
        </label>
        <br />
        <input
          className="w-full h-14 mt-2 outline-none border-none rounded-md bg-white"
          type="text"
          name="img"
          id="img"
          required
        />
      </div>

      <div className="w-11/12">
        <label className="text-md uppercase text-white" htmlFor="">
          Description
        </label>
        <br />
        <textarea
          className="w-full h-36 mt-2 outline-none border-none rounded-md bg-white resize-none"
          name="description"
          id="description"
          required
        />
      </div>
      <div className="w-11/12 lg:mt-20">
        <button
          className="w-full h-12 bg-white text-[#000944] border-md"
          type="submit"
        >
          Submit
        </button>
      </div>
      <ToastContainer></ToastContainer>
    </form>
  );
};

export default AddNewProduct;
