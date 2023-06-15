import { useRouter } from "next/router";
import { useEffect } from "react";
import Loading from "@/components/particles/shared/Loading";
import { auth } from "@/services/firebase.init";
import { useAuthState } from "react-firebase-hooks/auth";
import { useGetUserProfileQuery } from "@/services/queries/profileApi";

const RequireUser = ({ children }: any): any => {
  const router = useRouter();

  const [user, loading, error] = useAuthState(auth);

  const { isLoading, data: profileData } = useGetUserProfileQuery<any>(
    user?.email
  );

  if (loading) {
    return <Loading />;
  }

  if (!user) {
    router.replace("/entry");
  }

  if (profileData?.role == "admin") {
    router.replace("/denied");
  }

  return children;
};

export default RequireUser;
