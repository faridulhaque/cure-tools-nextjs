import React, { useEffect, useState } from "react";
import Item from "./Item";
import { useGetInventoriesQuery } from "@/services/queries/homeApi";
import Loading from "../shared/Loading";

const Inventories = () => {
 
  const { data:inventories, error, isError, isLoading } = useGetInventoriesQuery<any>('get_inventories')


  if(isLoading){
    return <Loading></Loading>
  }

  if(isError){
    console.log(error.message);
  }
  return (
    <div className="bg-base-200 py-10">
      <h2 className="text-4xl text-center">Inventories</h2>
      <div className=" grid xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-5 justify-items-center mx-auto my-10">
        {inventories?.map((item: any) => (
          <Item key={item._id} item={item}></Item>
        ))}
      </div>
    </div>
  );
};

export default Inventories;
