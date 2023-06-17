import { auth } from "@/services/firebase.init";
import { useGetUserProfileQuery } from "@/services/queries/profileApi";
import Image from "next/image";
import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import Loading from "../../shared/Loading";
import dynamic from "next/dynamic";
import {
  useAddReviewMutation,
  useGetReviewQuery,
} from "@/services/queries/userReviewApi";
const ReactStars = dynamic(import("react-rating-star-with-type"), {
  ssr: false,
});

const AddReview = () => {
  const [isEditing, setEditing] = useState(false);
  const [ratingChanged, setRatingChanged] = useState(false);

  const [ratingStar, setRatingStar] = useState(5);
  const [ratingText, setRatingText] = useState("");

  const [user, loading] = useAuthState(auth);

  const email: any = user?.email;

  const { data: profileData, isLoading: userLoading } =
    useGetUserProfileQuery<any>(email);

  const { data: review, isLoading: reviewLoading } =
    useGetReviewQuery<any>(email);

  const [addReview, others] = useAddReviewMutation<any>();

  if (loading) return <Loading></Loading>;
  if (userLoading) return <Loading></Loading>;
  if (reviewLoading) return <Loading></Loading>;

  const onChange = (nextValue: any) => {
    setRatingChanged(true);
    setRatingStar(nextValue);
  };

  const handleSubmit = async () => {
    if (isEditing) {
      const info = {
        email: user?.email,
        ratingStar: !ratingChanged ? review?.ratingStar : ratingStar,
        ratingText,
      };

      const result: any = await addReview(info);
      if (result?.data.acknowledged) {
        // alert('')
        setRatingChanged(false);
        setEditing(false);
        return window.location.reload();
      }
    }

    const info = {
      email: user?.email,
      ratingStar,
      ratingText,
    };
    const result: any = await addReview(info);
    if (result?.data.acknowledged) return window.location.reload();
  };

  let component: any = (
    <div className="w-full shadow-2xl bg-white pb-5">
      <div className="h-40 bg-[#000944] w-full relative">
        <Image
          className="absolute left-0 right-0 mx-auto rounded-full bottom-[-50%]"
          src="https://i.ibb.co/6YK1cXs/avatar.jpg"
          width={150}
          height={150}
          alt=""
        ></Image>
      </div>
      <div className="h-36 bg-white w-full"></div>
      <p className="text-center text-4xl text-[#000944] capitalize">
        {profileData?.displayName}
      </p>
      <div className="w-full flex items-center justify-center h-12">
        <ReactStars
          onChange={onChange}
          value={ratingStar}
          isEdit={true}
          activeColors={["yellow"]}
        />
      </div>
      <div className="w-full ">
        <textarea
          onBlur={(e: any) => setRatingText(e.target.value)}
          className="w-11/12 mx-auto block h-40 resize-none border-2 border-[#000944] rounded-sm"
        ></textarea>
      </div>
      <div className="w-full ">
        <button
          onClick={handleSubmit}
          className="mt-5 bg-[#000944] uppercase block w-20 h-12 text-white rounded-md hover:shadow-xl mx-auto text-xl"
        >
          done
        </button>
      </div>
    </div>
  );

  if (review?.email) {
    // this part is for when the user wants to update his review
    component = isEditing ? (
      <div className="w-full shadow-2xl bg-white pb-5">
        <div className="h-40 bg-[#000944] w-full relative">
          <Image
            className="absolute left-0 right-0 mx-auto rounded-full bottom-[-50%]"
            src="https://i.ibb.co/6YK1cXs/avatar.jpg"
            width={150}
            height={150}
            alt=""
          ></Image>
        </div>
        <div className="h-36 bg-white w-full"></div>
        <p className="text-center text-4xl text-[#000944] capitalize">
          {profileData?.displayName}
        </p>
        <div className="w-full flex items-center justify-center h-12">
          <ReactStars
            onChange={onChange}
            value={review?.ratingStar}
            isEdit={true}
            activeColors={["yellow"]}
          />
        </div>
        <div className="w-full ">
          <textarea
            onBlur={(e: any) => setRatingText(e.target.value)}
            className="w-11/12 mx-auto block h-40 resize-none border-2 border-[#000944] rounded-sm"
            defaultValue={review?.ratingText}
          ></textarea>
        </div>
        <div className="w-full ">
          <button
            onClick={handleSubmit}
            className="mt-5 bg-[#000944] uppercase block w-20 h-12 text-white rounded-md hover:shadow-xl mx-auto text-xl"
          >
            done
          </button>
        </div>
      </div>
    ) : (
      // this below part is when there is a review already.
      <div className="w-full shadow-2xl bg-white pb-5">
        <div className="h-40 bg-[#000944] w-full relative">
          <Image
            className="absolute left-0 right-0 mx-auto rounded-full bottom-[-50%]"
            src="https://i.ibb.co/6YK1cXs/avatar.jpg"
            width={150}
            height={150}
            alt=""
          ></Image>
        </div>
        <div className="h-36 bg-white w-full"></div>
        <p className="text-center text-4xl text-[#000944] capitalize">
          {profileData?.displayName}
        </p>
        <div className="w-full flex items-center justify-center h-12">
          <ReactStars
            value={review?.ratingStar}
            isEdit={false}
            activeColors={["yellow"]}
          />
        </div>
        <div className="w-full ">
          <p className="w-11/12 mx-auto text-2xl text-center">
            {review?.ratingText}
          </p>
        </div>
        <div className="w-full ">
          <button
            onClick={() => setEditing(true)}
            className="mt-5 bg-[#000944] uppercase block w-20 h-12 text-white rounded-md hover:shadow-xl mx-auto text-xl"
          >
            Edit
          </button>
        </div>
      </div>
    );
  }

  return component;
};

export default AddReview;
