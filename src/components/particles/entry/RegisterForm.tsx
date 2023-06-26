import Link from "next/link";
import React, { useState } from "react";
import {
  useCreateUserWithEmailAndPassword,
  useSignInWithGoogle,
  useUpdateProfile,
} from "react-firebase-hooks/auth";
import { auth } from "@/services/firebase.init";
import Loading from "../shared/Loading";
import { useRegisterUserMutation } from "@/services/queries/registerApi";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import RegisterWithGoogle from "./RegisterWithGoogle";
import PasswordViewIcon from "./PasswordViewIcon";

const RegisterForm = () => {

  const router = useRouter()

  // state declaration for form data
  const [formInfo, setFormInfo] = useState({
    displayName: "",
    email: "",
    password: "",
  });

  // state declaration for error handling in form
  const [passError, setPassError] = useState("");

  // state declaration to allow user to view their password while typing
  const [viewPassword, setViewPassword] = React.useState(false);

  // data submission using rtk query.
  const [register, { isLoading: registering }] = useRegisterUserMutation<any>();

  // user register with google. using email-pass and google sign-in

  const [createUserWithEmailAndPassword, emailUserLoading, isEmailUserError] =
    useCreateUserWithEmailAndPassword(auth);

  // function to get from the registration form

  const handleRegistryForm = async (e: any) => {
    e.preventDefault();

    if (e.target.password.value <= 7) {
      return setPassError("Password is too short!");
    }

    if (e.target.password.value != e.target.password_2.value) {
      return setPassError("Both password must be same!");
    }
    setFormInfo({
      email: e.target.email.value,
      displayName: e.target.displayName.value,
      password: e.target.password.value,
    });

    const newUser = await createUserWithEmailAndPassword(
      e.target.email.value,
      e.target.password.value
    );

    if (newUser?.user?.uid) {
      const displayName = e.target.displayName.value;
      const email = newUser?.user?.email;
      const photo = newUser?.user?.photoURL;
      const role = "member";

      const info = {
        displayName,
        email,
        photo,
        role,
      };

      const registered: any = await register(info);

      if (registered?.data?.acknowledged) {
        router.push("/home");
      } else if (registered?.data?.err) {
        toast.error("Email already in use!", {
          position: toast.POSITION.BOTTOM_CENTER,
          toastId: 1,
        });
      }
    }
  };

  if (emailUserLoading) {
    return <Loading></Loading>;
  }

  if (registering) return <Loading></Loading>;

  return (
    <form
      onSubmit={handleRegistryForm}
      className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100 rounded-xl border-y-4 border-[#000944]"
    >
      <h2 className="my-5 text-center text-4xl text-[#000944]">
        Register Now!
      </h2>
      <div className="card-body">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input
            type="text"
            placeholder="name"
            className="input input-bordered"
            name="displayName"
            required
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            type="text"
            placeholder="email"
            className="input input-bordered"
            name="email"
            required
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
            <PasswordViewIcon
              viewPassword={viewPassword}
              setViewPassword={setViewPassword}
            ></PasswordViewIcon>
          </label>
          <input
            type={viewPassword ? "text" : "password"}
            placeholder="password"
            className="input input-bordered"
            name="password"
            min={8}
            required
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Re assign Password</span>
           
          </label>
          <input
            type={viewPassword ? "text" : "password"}
            placeholder="password"
            className="input input-bordered"
            name="password_2"
            required
          />
        </div>
        {passError && (
          <div>
            <label className="label">
              <span className="label-text-alt text-red-500">{passError}</span>
            </label>
          </div>
        )}
        <div>
          <label className="label">
            <span className="label-text-alt ">
              Already have an account?{" "}
              <Link href="/entry/login" className="link link-hover">
                Login here
              </Link>{" "}
            </span>
          </label>
        </div>
        <div className="form-control mt-6">
          <button
            type="submit"
            className="btn bg-[#000944] text-white uppercase hover:bg-[#000944]"
          >
            Register
          </button>
          <div className="divider">OR</div>
          <RegisterWithGoogle></RegisterWithGoogle>
        </div>
      </div>

      <ToastContainer></ToastContainer>
    </form>
  );
};

export default RegisterForm;
