import React from "react";
import Navbar from "../shared/Navbar";
import LoginForm from "../entry/LoginForm";
import Footer from "../shared/Footer";

const LoginIndex = () => {
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
