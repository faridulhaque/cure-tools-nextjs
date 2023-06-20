import React, { useState } from "react";
import Sidebar from "./Sidebar";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/services/firebase.init";
import Loading from "../shared/Loading";
import { useGetUserProfileQuery } from "@/services/queries/profileApi";
import Image from "next/image";
import { useRouter } from "next/router";
import UpdateProfile from "./UpdateProfile";

const MyProfile = () => {
  const [updateForm, setUpdateForm] = useState(false);

  const router = useRouter();

  const [user, loading] = useAuthState(auth);

  const email = user?.email;

  const { isLoading, data: profileData } = useGetUserProfileQuery<any>(email);


  if (loading || isLoading) return <Loading></Loading>;



  return (
    <>
      {!updateForm ? (
        <div className="w-full pb-5 shadow-2xl">
          <div className="w-full h-36 bg-[#000944] mb-20 relative">
            <Image
              className="w-36 h-36 absolute left-5 top-[40%]"
              src="https://i.ibb.co/6YK1cXs/avatar.jpg"
              width={150}
              height={150}
              alt="avatar"
            ></Image>
          </div>
          <div className="text-[#000944] flex items-center justify-between w-11/12 mx-auto">
            <ul className="flex flex-col">
              <li className="w-full h-10 font-bold text-lg">Name:</li>
              <li className="w-full h-10 font-bold text-lg">Email:</li>
              <li className="w-full h-10 font-bold text-lg">Phone:</li>
            </ul>

            <ul className="flex flex-col">
              <li className="w-full h-10 text-lg">
                {profileData?.displayName}
              </li>
              <li className="w-full h-10 text-lg">{profileData?.email}</li>
              <li className="w-full h-10 text-lg">{profileData?.phone}</li>
            </ul>
          </div>

          <div className="w-11/12 mx-auto">
            <h3 className="text-xl font-bold">Address</h3>
            <p className="text-xl mt-2">{profileData?.address}</p>
          </div>

          <div className="w-11/12 mx-auto">
            <button
              onClick={() => setUpdateForm(true)}
              className="w-full h-10 mt-5  bg-[#000944] hover:shadow-xl text-white"
            >
              Update Profile
            </button>
          </div>
        </div>
      ) : (
        <UpdateProfile profileData= {profileData} setUpdateForm={setUpdateForm}></UpdateProfile>
      )}
    </>
  );
};

export default MyProfile;
