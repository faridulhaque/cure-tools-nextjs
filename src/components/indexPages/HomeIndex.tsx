import React from "react";
import Navbar from "../shared/Navbar";
import Banner from "../homeIndex/Banner";
import Inventories from "../homeIndex/Inventories";
import Features from "../homeIndex/Features";
import Contact from "../homeIndex/Contact";
import About from "../homeIndex/About";
import Footer from "../shared/Footer";
import Reviews from "../homeIndex/Reviews";

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
