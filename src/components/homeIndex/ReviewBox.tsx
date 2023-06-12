import Image from "next/image";
import React from "react";

const ReviewBox = ({ data }: any) => {
  return (
    <div className="flex flex-col items-center w-full">
      <div className="xl:w-3/5 lg:w-3/5 md:w-3/5 sm:11/12 items-center justify-center h-[250px]">
        <div className="w-full flex my-3 justify-center">
          <Image width={150} height={175} alt="avatar" src={data?.img}></Image>
        </div>

        <div className="">
          <h2 className="text-xl text-[#000944] text-center">{data.name}</h2>
        </div>
      </div>

      <p className="text-[#000944] text-center text-xl mb-10 xl:w-4/5 lg:w-4/5 md:w-11/12 sm:w-11/12">{data.text}</p>
    </div>
  );
};

export default ReviewBox;
