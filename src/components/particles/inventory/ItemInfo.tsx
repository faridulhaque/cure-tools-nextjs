import Image from 'next/image';
import React from 'react';

const ItemInfo = ({product}:any) => {
    return (
        <div className="w-full lg:w-3/4 lg:flex shadow-md mx-auto mt-10 flex justify-between">
        {/* information container */}
        <div className="w-full lg:w-7/12">
          <h2 className="mx-3 text-4xl my-5 text-[#000944]">
            {product?.name}
          </h2>
          <p className="mx-3 text-xl mb-5">{product?.description}</p>

          <div className="mx-3 flex flex-row items-center w-full justify-between h-40">
            <div className="flex flex-col items-center">
              <span className="text-md uppercase text-[#000944] font-bold">
                Price
              </span>
              <span className="text-xl  mt-3 bg-[#000944] px-3 py-2 text-white">
                ${product?.price} (Per Unit)
              </span>
            </div>

            <div className="flex flex-col items-center">
              <span className="text-md uppercase text-[#000944] font-bold">
                Available Quantity
              </span>
              <span className="text-xl mt-3 bg-[#000944] px-3 py-2 text-white">
                {product?.avlQuantity} (Unit)
              </span>
            </div>

            <div className="flex flex-col items-center">
              <span className="text-md uppercase text-[#000944] font-bold">
                Minimum Order Quantity
              </span>
              <span className="text-xl  mt-3 bg-[#000944] px-3 py-2 text-white">
                {product?.minQuantity} (Unit)
              </span>
            </div>
          </div>
        </div>
        {/* image container */}
        <div className="w-full lg:w-4/12 flex items-center justify-center bg-[#000944]">
          <Image
            className="rounded-md"
            src={product?.img}
            width={200}
            height={200}
            alt=""
          ></Image>
        </div>
      </div>
    );
};

export default ItemInfo;