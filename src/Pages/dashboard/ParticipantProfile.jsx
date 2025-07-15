import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";

const ParticipantProfile = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // Load participant data from userCollection
  const { data: participant = {}, refetch } = useQuery({
    queryKey: ["participant-profile", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user.email}`);
      return res.data;
    },
    enabled: !!user?.email, // prevent running on undefined
  });

  useEffect(() => {
    if (participant) {
      reset({
        name: participant.name || user.displayName || "",
        image: participant.photoURL || user.photoURL || "",
        contact: participant.contact || "",
      });
    }
  }, [participant, user, reset]);

  const onSubmit = async (data) => {
    try {
      const update = {
        name: data.name,
        image: data.image,
        contact: data.contact,
      };

      const res = await axiosSecure.patch(`/update-profile/${user.email}`, update);

      if (res.data.modifiedCount > 0) {
        toast.success("Profile updated successfully");
        refetch();
      } else {
        toast.info("No changes were made");
      }
    } catch (error) {
      console.error("Profile update error:", error);
      toast.error("Failed to update profile");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white shadow-md p-6 rounded-lg">
      <h2 className="text-2xl font-bold text-center text-green-700 mb-6">
        Participant Profile
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Name */}
        <div>
          <label className="block mb-1 font-semibold text-green-800">Name</label>
          <input
            type="text"
            className="input input-bordered w-full"
            {...register("name", { required: "Name is required" })}
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}
        </div>

        {/* Image */}
        <div>
          <label className="block mb-1 font-semibold text-green-800">Photo URL</label>
          <input
            type="text"
            className="input input-bordered w-full"
            {...register("image", { required: "Photo URL is required" })}
          />
          {errors.image && (
            <p className="text-red-500 text-sm">{errors.image.message}</p>
          )}
          {participant?.photoURL && (
            <img
              src={participant.photoURL}
              alt="Profile"
              className="mt-3 w-24 h-24 rounded-full object-cover mx-auto border"
            />
          )}
        </div>

        {/* Contact */}
        <div>
          <label className="block mb-1 font-semibold text-green-800">Contact Number</label>
          <input
            type="text"
            className="input input-bordered w-full"
            {...register("contact", {
              required: "Contact is required",
              minLength: {
                value: 10,
                message: "Contact must be at least 10 digits",
              },
            })}
          />
          {errors.contact && (
            <p className="text-red-500 text-sm">{errors.contact.message}</p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="btn bg-green-600 text-white hover:bg-green-700 w-full"
        >
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default ParticipantProfile;
