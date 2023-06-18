import Image from "next/image";
import { Router, useRouter } from "next/router";
import React from "react";

const Item = ({ item }: any) => {

  const router = useRouter()
  return (
    <div className="w-80 h-[650px] bg-[#000944] shadow-xl rounded-br-3xl rounded-tl-3xl">
      <div className="w-full h-20 flex items-center justify-center">
        <h2 className="text-xl text-center text-white font-bold">
          {item?.name}
        </h2>
      </div>

      <div className="w-full h-2/4 relative">
        <Image
          className="w-full h-full"
          src={item?.img}
          alt=""
          width={300}
          height={300}
        ></Image>
        <button onClick={()=>router.push(`/home/${item?._id}`)} className=" text-white flex justify-center items-center text-3xl absolute right-3 bottom-3 bg-[#000944] rounded-full shadow-xl px-3 py-2">
          +
        </button>
      </div>

      <div className="text-white mx-auto w-11/12">
        <p className="w-full text-justify mt-5 text-xl">{item?.description}</p>
      </div>
    </div>
  );
};

export default Item;
