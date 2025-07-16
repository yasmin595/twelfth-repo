import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import "react-datepicker/dist/react-datepicker.css";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import axios from "axios";

const imageHostKey = import.meta.env.VITE_image_upload_key;

const UpdateCamp = () => {
  const { campId } = useParams();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const [date, setDate] = useState(null);
  const [time, setTime] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [uploading, setUploading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { data: campData, isLoading, isError } = useQuery({
    queryKey: ["camp", campId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/camps/${campId}`);
      return res.data;
    },
    enabled: !!campId,
  });

  useEffect(() => {
    if (campData) {
      reset({
        name: campData.name || "",
        fees: campData.fees || "",
        location: campData.location || "",
        doctor: campData.doctor || "",
        description: campData.description || "",
      });
      setDate(campData.date ? new Date(campData.date) : null);
      setTime(campData.time || "");
      setImageUrl(campData.image || "");
    }
  }, [campData, reset]);

  const handleImageUpload = async (e) => {
    const imageFile = e.target.files[0];
    if (!imageFile) return;

    const formData = new FormData();
    formData.append("image", imageFile);

    try {
      setUploading(true);
      const res = await axios.post(
        `https://api.imgbb.com/1/upload?key=${imageHostKey}`,
        formData
      );
      const imgData = res.data;
      if (imgData.success) {
        setImageUrl(imgData.data.url);
        toast.success("✅ Image uploaded successfully!");
      } else {
        throw new Error("Image upload failed");
      }
    } catch (error) {
      console.error("Image Upload Error:", error);
      toast.error("❌ Image upload failed.");
    } finally {
      setUploading(false);
    }
  };

  const onSubmit = async (data) => {
    const updatedCamp = {
      ...data,
      image: imageUrl,
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
        toast.info("ℹ️ No changes were made.");
      }
    } catch (error) {
      console.error("Update failed:", error);
      toast.error("❌ Failed to update camp.", { position: "top-center" });
    }
  };

  if (isLoading) return <div className="text-center py-10 text-gray-500">Loading camp data...</div>;
  if (isError) return <div className="text-center py-10 text-red-600">Error loading camp data.</div>;

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg px-8 py-10 my-10">
      <h2 className="text-3xl font-bold text-center text-green-700 mb-6">
        Update Medical Camp
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Camp Name */}
        <div>
          <label className="block mb-1">Camp Name</label>
          <input {...register("name", { required: true })} className="input input-bordered w-full" />
          {errors.name && <p className="text-sm text-red-600">Required</p>}
        </div>

        {/* Image Upload */}
        <div>
          <label className="block mb-1">Upload New Image</label>
          <input type="file" accept="image/*" onChange={handleImageUpload} className="file-input file-input-bordered w-full" />
          {imageUrl && (
            <img src={imageUrl} alt="Uploaded" className="mt-2 w-24 h-24 object-cover rounded border mx-auto" />
          )}
        </div>

        {/* Fees */}
        <div>
          <label className="block mb-1">Camp Fees ($)</label>
          <input type="number" {...register("fees", { required: true })} className="input input-bordered w-full" />
        </div>

        {/* Date */}
        <div>
          <label className="block mb-1">Date</label>
          <DatePicker selected={date} onChange={setDate} className="input input-bordered w-full" />
        </div>

        {/* Time */}
        <div>
          <label className="block mb-1">Time</label>
          <input type="time" value={time} onChange={(e) => setTime(e.target.value)} className="input input-bordered w-full" />
        </div>

        {/* Location */}
        <div>
          <label className="block mb-1">Location</label>
          <input {...register("location", { required: true })} className="input input-bordered w-full" />
        </div>

        {/* Doctor */}
        <div className="md:col-span-2">
          <label className="block mb-1">Doctor/Health Expert</label>
          <input {...register("doctor", { required: true })} className="input input-bordered w-full" />
        </div>

        {/* Description */}
        <div className="md:col-span-2">
          <label className="block mb-1">Description</label>
          <textarea {...register("description", { required: true })} className="textarea textarea-bordered w-full" rows={4}></textarea>
        </div>

        {/* Submit */}
        <div className="md:col-span-2 text-center mt-4">
          <button type="submit" className="btn bg-green-700 hover:bg-green-800 text-white px-8" disabled={uploading}>
            {uploading ? "Uploading Image..." : "Update Camp"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateCamp;
