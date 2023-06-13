import React from "react";
import Navbar from "../shared/Navbar";
import Footer from "../shared/Footer";
import RegisterForm from "../entry/RegisterForm";

const RegisterIndex = () => {
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
