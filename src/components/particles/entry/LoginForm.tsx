import { auth } from "@/services/firebase.init";
import Link from "next/link";
import React from "react";
import {
  useSignInWithEmailAndPassword,
  useSignInWithGoogle,
} from "react-firebase-hooks/auth";
import Loading from "../shared/Loading";
import { useRouter } from "next/router";
import RegisterWithGoogle from "./RegisterWithGoogle";
import PasswordViewIcon from "./PasswordViewIcon";

const LoginForm = () => {
  const router = useRouter();

  const [viewPassword, setViewPassword] = React.useState(false);

  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);

  const [signInWithGoogle, gUser, gLoading, gError] = useSignInWithGoogle(auth);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    signInWithEmailAndPassword(e.target.email.value, e.target.password.value);
  };

  if (loading) return <Loading></Loading>;

  if (user || gUser) {
    router.push("/");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100 rounded-xl border-y-4 border-[#000944]"
    >
      <h2 className="my-5 text-center text-4xl text-[#000944]">Login Now!</h2>
      <div className="card-body">
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
            required
          />
        </div>

        <div>
          <label className="label">
            <span className="label-text-alt link link-hover">
              Forgot password?
            </span>
          </label>
        </div>
        <div>
          <label className="label">
            <span className="label-text-alt ">
              Do not have an account?{" "}
              <Link href="/entry/register" className="link link-hover">
                Register Now
              </Link>{" "}
            </span>
          </label>
        </div>
        <div className="form-control mt-6">
          <button
            type="submit"
            className="btn bg-[#000944] text-white uppercase hover:bg-[#000944]"
          >
            Login
          </button>
        </div>
        <div className="divider">OR</div>
        <RegisterWithGoogle></RegisterWithGoogle>
      </div>
    </form>
  );
};

export default LoginForm;
