import Link from "next/link";
import React from "react";
import {
  useCreateUserWithEmailAndPassword,
  useSignInWithGoogle,
  useUpdateProfile,
} from "react-firebase-hooks/auth";
import { auth } from "@/services/firebase.init";
import Loading from "../shared/Loading";

const RegisterForm = () => {
  const [signInWithGoogle, gUser, gLoading, gError] = useSignInWithGoogle(auth);
  const [createUserWithEmailAndPassword, user, userLoading, error] =
    useCreateUserWithEmailAndPassword(auth);

  if (gLoading || userLoading) {
    return <Loading></Loading>;
  }

  return (
    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100 rounded-xl border-y-4 border-[#000944]">
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
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input
            type="text"
            placeholder="password"
            className="input input-bordered"
            name="password"
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Re assign Password</span>
          </label>
          <input
            type="text"
            placeholder="password"
            className="input input-bordered"
            name="password_2"
          />
        </div>

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
            onClick={() => signInWithGoogle()}
            type="button"
            className="btn bg-red-500 text-white uppercase hover:bg-red-600"
          >
            Register with google
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
