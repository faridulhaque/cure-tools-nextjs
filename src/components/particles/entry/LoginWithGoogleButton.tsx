import React from "react";
import {signIn} from "next-auth/react"

const LoginWithGoogleButton = () => {
  const handleRegistryButton = () => {
    signIn("google", {callbackUrl: "http://localhost:3000"});
  };

  return (
    <button
      onClick={() => handleRegistryButton()}
      type="button"
      className="btn bg-red-500 text-white uppercase hover:bg-red-600"
    >
      Login with google
    </button>
  );
};

export default LoginWithGoogleButton;
