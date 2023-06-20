import { auth } from "@/services/firebase.init";
import Link from "next/link";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import Loading from "../shared/Loading";

const Banner = () => {
  const [user, loading] = useAuthState(auth);

  if (loading) return <Loading></Loading>;

  return (
    <div
      id="home"
      className="h-[calc(100vh-80px)] hero"
      style={{
        backgroundImage: "url(https://i.ibb.co/VxvZH7F/banner.png)",
      }}
    >
      <div className="hero-content text-center z-1 ">
        <div className="max-w-xxl">
          <h1 className="mb-5 text-5xl font-bold text-[#000944]">Cure Tools</h1>
          <p className="mb-5 text-2xl text-[#333333]">
            Your trusted wholesale supplier of premium dental tools, offering
            exceptional quality and competitive prices for dental professionals.
            Elevate your practice with us.
          </p>
          {!user?.uid && (
            <Link
              href="/entry/register"
              className="btn bg-[#000944] text-white hover:bg-[#000944] hover:shadow-lg"
            >
              Get Started
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Banner;
