import RequireUser from "@/Requires/RequireUser";
import InventoryIndex from "@/components/indexPages/InventoryIndex";
import { useGetOneProductQuery } from "@/services/queries/homeApi";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React from "react";

const product = () => {
  return (
    <div className="">
      <RequireUser>
        <InventoryIndex></InventoryIndex>
      </RequireUser>
    </div>
  );
};

export default dynamic((): any => Promise.resolve(product), { ssr: false });
