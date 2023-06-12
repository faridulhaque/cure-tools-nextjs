import React, { useEffect, useState } from "react";
import Item from "./Item";

const Inventories = () => {
  const [inventories, setInventories] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/tools")
      .then((res) => res.json())
      .then((data) => setInventories(data));
  }, [inventories]);

  return (
    <div className="bg-base-200 py-10">
      <h2 className="text-4xl text-center">Inventories</h2>
      <div className=" grid xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-5 justify-items-center mx-auto my-10">
        {inventories.map((item: any) => (
          <Item key={item._id} item={item}></Item>
        ))}
      </div>
    </div>
  );
};

export default Inventories;
