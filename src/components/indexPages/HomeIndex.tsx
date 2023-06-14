import React from "react";
import Navbar from "../particles/shared/Navbar";
import Banner from "../particles/home/Banner";
import Features from "../particles/home/Features";
import Inventories from "../particles/home/Inventories";
import Reviews from "../particles/home/Reviews";
import Contact from "../particles/home/Contact";
import About from "../particles/home/About";
import Footer from "../particles/shared/Footer";


const HomeIndex = () => {
  return (
    <>
      <header className="">
        <Navbar></Navbar>
        <Banner></Banner>
      </header>
      <main>
        <Features></Features>
        <Inventories></Inventories>
        <Reviews></Reviews>
        <Contact></Contact>
        <About></About>
      </main>
      <footer>
        <Footer></Footer>
      </footer>
    </>
  );
};

export default HomeIndex;
