import React from "react";
import Navbar from "../particles/shared/Navbar";
import Footer from "../particles/shared/Footer";
import { useRouter } from "next/router";
import { useGetOneProductQuery } from "@/services/queries/homeApi";
import Loading from "../particles/shared/Loading";
import Image from "next/image";
import ItemInfo from "../particles/inventory/ItemInfo";
import OrderForm from "../particles/inventory/OrderForm";

const InventoryIndex = () => {
  const router = useRouter();

  const param = router.asPath.split("/")[2];

  const { data: product, isLoading } = useGetOneProductQuery<any>(param);

  if (isLoading) return <Loading></Loading>;

  return (
    <>
      <Navbar></Navbar>
      <div className="min-h-screen">
        <ItemInfo product={product}></ItemInfo>
        <OrderForm product={product}></OrderForm>
      </div>
      <Footer></Footer>
    </>
  );
};

export default InventoryIndex;
