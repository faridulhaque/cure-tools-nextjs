import React from "react";

import Slider from "react-slick";
import ReviewBox from "./ReviewBox";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Reviews = () => {
  const tSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    delay: 5000,
    arrows: false,
  };

  const testimonials = [
    {
      name: "Farid haque",
      text: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Odio ad blanditiis natus deserunt laboriosam totam, fuga necessitatibus unde explicabo! Quod.",
      img: "https://res.cloudinary.com/dr2vztyib/image/upload/v1680510926/home-provider/worker-3-112x0-c-center_qclhuh.jpg",
    },
    {
      name: "Murshed haque",
      text: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Odio ad blanditiis natus deserunt laboriosam totam, fuga necessitatibus unde explicabo! Quod.",
      img: "https://res.cloudinary.com/dr2vztyib/image/upload/v1680510922/home-provider/04-1-112x0-c-center_osekmj.jpg",
    },
  ];

  return (
    <div className="w-full h-auto py-10">
      <h2 className="text-center text-4xl my-5 text-[#000944]">
        Our Clients&apos; Opinions
      </h2>
      <div className="w-full h-auto flex items-center justify-center">
        <div className="xl:w-2/4 lg:w-2/4 md:w-3/5 sm:w-11/12">
          <Slider {...tSettings}>
            {testimonials.map((test: any) => (
              <ReviewBox key={test.img} data={test}></ReviewBox>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default Reviews;
