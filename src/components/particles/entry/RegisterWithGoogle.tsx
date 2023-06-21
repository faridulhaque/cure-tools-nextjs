import { auth } from "@/services/firebase.init";
import { useRegisterUserMutation } from "@/services/queries/registerApi";
import { useRouter } from "next/router";
import React from "react";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";

const RegisterWithGoogle = () => {
  const router = useRouter();

  const [signInWithGoogle, gUser, gLoading, gError] = useSignInWithGoogle(auth);

  const [register, { isLoading: registering }] = useRegisterUserMutation<any>();

  // function to sign up with google button
  const handleRegistryButton = async () => {
    const newUser = await signInWithGoogle();
    const displayName = newUser?.user?.displayName;
    const email = newUser?.user?.email;
    const photo = newUser?.user?.photoURL;
    const role = "admin";

    const info = {
      displayName,
      email,
      photo,
      role,
    };

    if (newUser?.user?.uid) {
      const result = await register(info);
      if (result) {
        router.push("/");
      }
    }
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

export default RegisterWithGoogle;
