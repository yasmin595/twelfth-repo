import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import "react-datepicker/dist/react-datepicker.css";

import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure"; // তোমার Axios instance

const UpdateCamp = () => {
  const { campId } = useParams();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const [date, setDate] = useState(null);
  const [time, setTime] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      image: "",
      fees: "",
      location: "",
      doctor: "",
      description: "",
    },
  });

  // Fetch camp data by ID with TanStack Query (v5 style)
  const { data: campData, isLoading, isError } = useQuery({
    queryKey: ["camp", campId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/camps/${campId}`);
      return res.data;
    },
    enabled: !!campId,
  });

  // যখন ডাটা আসবে তখন ফর্ম রিসেট করো + কন্ট্রোলড ফিল্ড সেট করো
  useEffect(() => {
    if (campData) {
      reset({
        name: campData.name || "",
        image: campData.image || "",
        fees: campData.fees || "",
        location: campData.location || "",
        doctor: campData.doctor || "",
        description: campData.description || "",
      });

      setDate(campData.date ? new Date(campData.date) : null);
      setTime(campData.time || "");
    }
  }, [campData, reset]);

  const onSubmit = async (data) => {
    // Prepare আপডেটেড ডাটা
    const updatedCamp = {
      ...data,
      fees: parseFloat(data.fees),
      date: date ? date.toISOString().split("T")[0] : "",
      time,
    };

    try {
      const res = await axiosSecure.put(`/update-camp/${campId}`, updatedCamp);
      if (res.data.modifiedCount > 0) {
        Swal.fire("✅ Updated!", "Camp updated successfully!", "success");
        navigate("/dashboard/organizer/manage-camps");
      } else {
        toast.info("No changes were made.");
      }
    } catch (error) {
      console.error("Update failed:", error);
      toast.error("Failed to update camp.", { position: "top-center" });
    }
  };

  if (isLoading) return <div>Loading camp data...</div>;
  if (isError) return <div>Error loading camp data.</div>;

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-xl p-8 my-10">
      <h2 className="text-3xl font-bold text-green-700 mb-6 text-center">Update Camp</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label>Camp Name</label>
          <input
            {...register("name", { required: "Camp name is required" })}
            className="input input-bordered w-full"
          />
          {errors.name && <p className="text-red-600 text-sm">{errors.name.message}</p>}
        </div>

        <div>
          <label>Image URL</label>
          <input
            {...register("image", { required: "Image URL is required" })}
            className="input input-bordered w-full"
          />
          {errors.image && <p className="text-red-600 text-sm">{errors.image.message}</p>}
        </div>

        <div>
          <label>Camp Fees</label>
          <input
            type="number"
            {...register("fees", { required: "Fees is required", min: 0 })}
            className="input input-bordered w-full"
          />
          {errors.fees && <p className="text-red-600 text-sm">{errors.fees.message}</p>}
        </div>

        <div>
          <label>Date</label>
          <DatePicker
            selected={date}
            onChange={setDate}
            className="input input-bordered w-full"
            placeholderText="Select a date"
            required
          />
        </div>

        <div>
          <label>Time</label>
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="input input-bordered w-full"
            required
          />
        </div>

        <div>
          <label>Location</label>
          <input
            {...register("location", { required: "Location is required" })}
            className="input input-bordered w-full"
          />
          {errors.location && <p className="text-red-600 text-sm">{errors.location.message}</p>}
        </div>

        <div className="md:col-span-2">
          <label>Healthcare Professional</label>
          <input
            {...register("doctor", { required: "Doctor name is required" })}
            className="input input-bordered w-full"
          />
          {errors.doctor && <p className="text-red-600 text-sm">{errors.doctor.message}</p>}
        </div>

        <div className="md:col-span-2">
          <label>Description</label>
          <textarea
            {...register("description", { required: "Description is required" })}
            className="textarea textarea-bordered w-full"
            rows={4}
          />
          {errors.description && <p className="text-red-600 text-sm">{errors.description.message}</p>}
        </div>

        <div className="md:col-span-2 text-center">
          <button
            type="submit"
            className="btn bg-green-700 text-white hover:bg-green-800 px-10"
          >
            Update Camp
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateCamp;
