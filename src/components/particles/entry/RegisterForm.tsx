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

const RegisterForm = () => {
  const router = useRouter();

  // state declaration for form data
  const [formInfo, setFormInfo] = useState({
    displayName: "",
    email: "",
    password: "",
  });

  // state declaration for error handling in form
  const [passError, setPassError] = useState("");

  // data submission using rtk query.
  const [
    register,
    {
      isLoading: registering,
      isError: isRegError,
      error: regError,
      data: regData,
    },
  ] = useRegisterUserMutation<any>();

  // user register with google. using email-pass and google sign-in

  const [signInWithGoogle, gUser, gLoading, gError] = useSignInWithGoogle(auth);
  const [
    createUserWithEmailAndPassword,
    emailUser,
    emailUserLoading,
    emailUserError,
  ] = useCreateUserWithEmailAndPassword(auth);

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

    if (newUser?.user.uid) {
      const displayName = formInfo.displayName;
      const email = newUser?.user?.email;
      const photo = newUser?.user?.photoURL;

      const info = {
        displayName,
        email,
        photo,
      };

      const registered: any = await register(info);

      if (registered?.acknowledged) {
        router.push("/home");
      } else if(registered?.err) {
        alert("email already in use");
      }
    }
  };

  // function to sign up with google button
  const handleRegistryButton = async () => {
    const newUser = await signInWithGoogle();
    const displayName = newUser?.user?.displayName;
    const email = newUser?.user?.email;
    const photo = newUser?.user?.photoURL;
    const info = {
      displayName,
      email,
      photo,
    };

    if (newUser?.user?.uid) {
      const result = await register(info);
      if(result){
        router.push("/")
      }
    }
  };

  if (gLoading || emailUserLoading) {
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
          </label>
          <input
            type="password"
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
            type="password"
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
          <button
            onClick={() => handleRegistryButton()}
            type="button"
            className="btn bg-red-500 text-white uppercase hover:bg-red-600"
          >
            Register with google
          </button>
        </div>
      </div>
    </form>
  );
};

export default RegisterForm;
