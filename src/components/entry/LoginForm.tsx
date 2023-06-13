import Link from "next/link";
import React from "react";

const LoginForm = () => {
  return (
    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100 rounded-xl border-y-4 border-[#000944]">
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
          <button className="btn bg-[#000944] text-white uppercase hover:bg-[#000944]">
            Login
          </button>
        </div>
        <div className="divider">OR</div>
        <button className="btn bg-red-500 text-white uppercase hover:bg-red-600">
          Login with google
        </button>
      </div>
    </div>
  );
};

export default LoginForm;
