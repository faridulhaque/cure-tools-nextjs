import { useRouter } from "next/router";
import { useEffect } from "react";
import Loading from "@/components/particles/shared/Loading";
import { auth } from "@/services/firebase.init";
import { useAuthState } from "react-firebase-hooks/auth";

const RequireCommon = ({ children }: any) => {
  const [user, loading, error] = useAuthState(auth);
  const router = useRouter();

  if (loading) {
    return <Loading />;
  }

  if (!user) {
    router.replace("/entry");
  }

  return user ? children : null;
};

export default RequireCommon;
