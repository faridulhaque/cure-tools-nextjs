import React from "react";
import Navbar from "../particles/shared/Navbar";
import Footer from "../particles/shared/Footer";
import RegisterForm from "../particles/entry/RegisterForm";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/services/firebase.init";
import Loading from "../particles/shared/Loading";
import { useRouter } from "next/router";

const RegisterIndex = () => {
  const router = useRouter()
  const [user, loading] = useAuthState(auth)

  if(loading) return <Loading></Loading>

  if(user) {
    router.push("/");
  }
  return (
    <>
      <Navbar></Navbar>

      <div
        className="w-full min-h-screen hero flex items-center justify-center py-20"
        style={{
          backgroundImage: "url(https://i.ibb.co/VxvZH7F/banner.png)",
        }}
      >
        <RegisterForm></RegisterForm>
      </div>

      <Footer></Footer>
    </>
  );
};

export default RegisterIndex;
