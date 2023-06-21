import Link from "next/link";
import React from "react";

const denied = () => {
  return (
    <div className="h-screen bg-[#f8f8f8] w-full flex flex-col items-center justify-center">
      <p className="uppercase text-4xl text-red-500">
        You don&apos;t have permission to view this page.
      </p>
      <Link
        className="mt-5 btn bg-black text-white uppercase text-xl hover:bg-black"
        href="/"
      >
        Go Home
      </Link>
    </div>
  );
};

export default denied;
