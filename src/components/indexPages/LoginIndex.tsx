import React from "react";
import Navbar from "../particles/shared/Navbar";
import LoginForm from "../particles/entry/LoginForm";
import Footer from "../particles/shared/Footer";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/services/firebase.init";
import Loading from "../particles/shared/Loading";
import { useRouter } from "next/router";

const LoginIndex = () => {

  const router = useRouter()

  const [user, loading]  = useAuthState(auth)


  if(loading) return <Loading></Loading>

  if(user?.email){
    router.push('/')
  }

  return (
    <>
      <Navbar></Navbar>
      <div
        className="w-full min-h-screen hero flex items-center justify-center"
        style={{
          backgroundImage: "url(https://i.ibb.co/VxvZH7F/banner.png)",
        }}
      >
        <LoginForm></LoginForm>
      </div>
      <Footer></Footer>
    </>
  );
};

export default LoginIndex;
