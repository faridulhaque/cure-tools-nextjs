import Image from "next/image";
import React from "react";
import dynamic from "next/dynamic";
import { useGetUserProfileQuery } from "@/services/queries/profileApi";
import Loading from "../shared/Loading";

const ReactStars = dynamic(import("react-rating-star-with-type"), {
  ssr: false,
});

const ReviewBox = ({ data }: any) => {

  const email:any = data.email;
  const {data:userData, isLoading} = useGetUserProfileQuery<any>(email)

  if(isLoading) {
    return <Loading></Loading>
  }

  return (
    <div className="flex flex-col items-center w-full ">
      <div className="xl:w-3/5 lg:w-3/5 md:w-3/5 sm:11/12 items-center justify-center h-[250px] md:h-[200px] lg:h-[200px]">
        <div className="w-full flex my-3 justify-center">
          <Image
            width={150}
            height={175}
            alt="avatar"
            src={userData?.photo ? userData?.photo : "https://i.ibb.co/6YK1cXs/avatar.jpg"}
          ></Image>
        </div>

        <div className="">
          <h2 className="text-xl text-[#000944] text-center">{userData?.displayName}</h2>
        </div>
      </div>
      <p className="flex items-center justify-center h-20">
        <ReactStars
          value={data?.ratingStar}
          isEdit={false}
          activeColors={["yellow"]}
        />
      </p>
      <p className="text-[#000944] text-center text-xl mb-10 xl:w-4/5 lg:w-4/5 md:w-11/12 sm:w-11/12">
        {data?.ratingText}
      </p>
    </div>
  );
};

export default ReviewBox;
