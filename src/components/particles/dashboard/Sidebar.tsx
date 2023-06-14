import Link from "next/link";
import React from "react";

const Sidebar = () => {
  return (
    <div className=" xl:w-1/5 lg:w-1/4 md:w-4/5 sm:w-4/5 h-auto xl:bg-violet-600 lg:bg-blue-400 md:bg-sky-200 sm:bg-green-600">
      <ul className="w-full flex flex-col h-full">
        <li className="w-full h-20 flex items-center justify-center">
            <Link className="text-2xl text-[#000944]" href="/dashboard">Profile</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
