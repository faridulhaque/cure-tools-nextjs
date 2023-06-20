import { useMakeContactMutation } from "@/services/queries/homeApi";
import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Contact = () => {
  const [makeContact, { isLoading }] = useMakeContactMutation<any>();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const message = e.target.message.value;
    const result: any = await makeContact({ name, email, message });
    if (result?.data?.acknowledged) {
      toast.success("Your message has been sent!", {
        position: toast.POSITION.BOTTOM_CENTER,
        toastId: 1,
      });
    }
    e.target.reset();
  };

  return (
    <div
      id="contact"
      className="text-white h-auto w-full m-auto bg-[#000944] py-20"
    >
      <h2 className="text-4xl mb-5 text-center">Contact Us</h2>
      <p className="text-xl text-center">
        Get in touch with me by filling out this form regarding any inquiry you
        have.
      </p>
      <div className="mx-auto w-11/12 xl:flex lg:flex md:flex sm:block items-center">
        <form
          onSubmit={handleSubmit}
          className="xl:w-2/4 lg:w-2/4 md:w-2/4 sm:w-11/12  flex flex-col mx-auto sm:mt-10"
        >
          {/* input fields wrapper started*/}
          <div className="w-full grid xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-4 mb-3">
            <div>
              <label className="text-md uppercase" htmlFor="">
                name
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
            <div>
              <label className="text-md uppercase" htmlFor="">
                email
              </label>
              <br />
              <input
                className="w-full h-14 mt-2 outline-none border-none rounded-md bg-white"
                type="email"
                required
                id="email"
                name="email"
              />
            </div>
          </div>
          {/* input fields wrapper ended*/}

          <div>
            <label htmlFor="" className="text-md uppercase">
              message
            </label>
            <br />
            <textarea
              required
              id="message"
              name="message"
              className="w-full resize-none h-[150px] mt-2 outline-none border-none rounded-md bg-white text-black"
            />
          </div>
          <button
            type="submit"
            className="btn bg-white uppercase w-full py-3 mt-2 text-[#000944] rounded-md "
          >
            send
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Contact;
