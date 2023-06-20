import React from "react";

import Slider from "react-slick";
import ReviewBox from "./ReviewBox";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useGetAllReviewsQuery } from "@/services/queries/homeApi";
import Loading from "../shared/Loading";

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

  const { data: testimonials, isLoading } = useGetAllReviewsQuery<any>(null);

  if(isLoading) return <Loading></Loading>
  return (
    <div id="reviews" className="w-full h-auto py-10">
      <h2 className="text-center text-4xl my-5 text-[#000944]">
        Our Clients&apos; Opinions
      </h2>
      <div className="w-full h-auto flex items-center justify-center">
        <div className="xl:w-2/4 lg:w-2/4 md:w-3/5 sm:w-11/12">
          <Slider {...tSettings}>
            {testimonials?.map((test: any) => (
              <ReviewBox key={test?._id} data={test}></ReviewBox>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default Reviews;
