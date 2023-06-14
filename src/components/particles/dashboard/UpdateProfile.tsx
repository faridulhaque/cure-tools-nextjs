import { useUpdateUserProfileMutation } from "@/services/queries/profileApi";
import React, { useState } from "react";
import Loading from "../shared/Loading";
import { profile } from "console";

const UpdateProfile = ({ profileData, setUpdateForm }: any) => {
  const [error, setError] = useState("");

  const [update, { isLoading, isError }] = useUpdateUserProfileMutation();


  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (e.target.photo.value && !/^https?:\/\//i.test(e.target.photo.value)) {
      return setError("Please add a valid URL");
    }

    const info = {
      displayName: e.target.displayName.value,
      email: profileData?.email,
      phone: e.target?.phone.value,
      photo: e.target.photo.value,
      address: e.target.address.value,
    };



    const res: any = await update(info);


    if (res?.data?.acknowledged) {
        alert('profile successfully updated')
        setUpdateForm(false)
    }
  };


  if (isLoading) return <Loading></Loading>;

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full pb-5 shadow-2xl bg-white border-[#000944] border-y-2"
    >
      <h2 className="mt-3 text-center text-4xl">Update Profile</h2>
      <div className="form-control mt-2 mx-auto w-11/12">
        <label className="label">
          <span className="label-text">Name</span>
        </label>
        <input
          required
          type="text"
          defaultValue={profileData?.displayName}
          className="input input-bordered"
          name="displayName"
        />
      </div>
      <div className="form-control mt-2 mx-auto w-11/12">
        <label className="label">
          <span className="label-text">Email</span>
        </label>
        <input
          type="text"
          defaultValue={profileData?.email}
          disabled
          className="input input-bordered"
          name="email"
        />
      </div>
      <div className="form-control mt-2 mx-auto w-11/12">
        <label className="label">
          <span className="label-text">Phone</span>
        </label>
        <input
          type="text"
          defaultValue={profileData?.phone}
          className="input input-bordered"
          name="phone"
        />
      </div>

      <div className="form-control mt-2 mx-auto w-11/12">
        <label className="label">
          <span className="label-text">Add photo URL</span>
        </label>
        <input type="text" className="input input-bordered" name="photo" />
      </div>

      <div className="form-control mt-2 mx-auto w-11/12">
        <label className="label">
          <span className="label-text">Full Address</span>
        </label>
        <textarea defaultValue={profileData.address} className="input input-bordered" name="address" />
      </div>



      {error && (
        <div className="w-11/12 mx-auto">
          <label className="label">
            <span className="label-text-alt text-red-500">{error}</span>
          </label>
        </div>
      )}

      <div className="w-11/12 mx-auto">
        <button
          type="submit"
          className="w-full h-10 mt-5  bg-[#000944] hover:shadow-xl text-white"
        >
          Save
        </button>
      </div>
    </form>
  );
};

export default UpdateProfile;
