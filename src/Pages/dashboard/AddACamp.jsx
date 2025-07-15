import React, { useState } from "react";
import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import "react-datepicker/dist/react-datepicker.css";

import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const imageHostKey = import.meta.env.VITE_image_upload_key;

const AddACamp = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState("10:00");
  const [imageUrl, setImageUrl] = useState("");
  const [uploading, setUploading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handleImageUpload = async (e) => {
    const imageFile = e.target.files[0];
    if (!imageFile) return;

    const formData = new FormData();
    formData.append("image", imageFile);

    try {
      setUploading(true);
      const res = await fetch(
        `https://api.imgbb.com/1/upload?key=${imageHostKey}`,
        {
          method: "POST",
          body: formData,
        }
      );
      const imgData = await res.json();

      if (imgData.success) {
        setImageUrl(imgData.data.url);
        toast.success("Image uploaded successfully!");
      } else {
        throw new Error("Image upload failed");
      }
    } catch (err) {
      console.error("Image Upload Error:", err);
      toast.error("Image upload failed. Try again.");
    } finally {
      setUploading(false);
    }
  };

  const onSubmit = async (data) => {
    if (!imageUrl) {
      toast.warning("Please upload an image first.");
      return;
    }

    const newCamp = {
      name: data.name,
      image: imageUrl,
      fees: parseFloat(data.fees),
      date: date.toISOString().split("T")[0],
      time,
      location: data.location,
      doctor: data.doctor,
      description: data.description,
      participantCount: 0,
      organizerEmail: user?.email,
    };

    try {
      const res = await axiosSecure.post("/camp", newCamp);
      if (res.data.insertedId || res.data._id) {
        Swal.fire({
          title: "✅ Camp Added Successfully!",
          icon: "success",
          confirmButtonColor: "#16a34a",
        });
        setImageUrl("");
        reset();
      }
    } catch (error) {
      console.error("Camp submission failed:", error);
      toast.error("Something went wrong! Try again.", {
        position: "top-center",
      });
    }
  };

  return (


<div className="max-w-4xl mx-auto bg-gradient-to-br from-green-50 via-yellow-50 to-blue-100 shadow-xl rounded-3xl p-10 my-12 border border-green-300 animate-fade-in">
  <h2 className="text-4xl font-extrabold text-green-800 mb-8 text-center tracking-wide uppercase">
    Add A New <span className="text-yellow-600">Medical Camp</span>
  </h2>

  <form
    onSubmit={handleSubmit(onSubmit)}
    className="grid grid-cols-1 md:grid-cols-2 gap-8"
  >
    {/* Camp Name */}
    <div className="form-group">
      <label className="text-green-900 font-semibold mb-1 block">Camp Name</label>
      <input
        {...register("name", { required: true })}
        className="input input-bordered w-full border-green-400 focus:border-green-600"
        placeholder="e.g., Free Eye Camp in Dhaka"
      />
      {errors.name && <p className="text-sm text-red-600 mt-1">Required</p>}
    </div>

    {/* Upload Image */}
    <div className="form-group">
      <label className="text-green-900 font-semibold mb-1 block">Upload Image</label>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="file-input file-input-bordered w-full border-green-400"
      />
      {imageUrl && (
        <img
          src={imageUrl}
          alt="Uploaded Preview"
          className="mt-2 w-24 h-24 rounded-md object-cover border mx-auto"
        />
      )}
    </div>

    {/* Fees */}
    <div className="form-group">
      <label className="text-green-900 font-semibold mb-1 block">Camp Fees</label>
      <input
        type="number"
        {...register("fees", { required: true })}
        className="input input-bordered w-full border-green-400"
        placeholder="e.g., 200"
      />
    </div>

    {/* Date */}
    <div className="form-group">
      <label className="text-green-900 font-semibold mb-1 block">Date</label>
      <DatePicker
        selected={date}
        onChange={(d) => setDate(d)}
        className="input input-bordered w-full border-green-400"
      />
    </div>

    {/* Time */}
    <div className="form-group">
      <label className="text-green-900 font-semibold mb-1 block">Time</label>
      <input
        type="time"
        value={time}
        onChange={(e) => setTime(e.target.value)}
        className="input input-bordered w-full border-green-400"
      />
    </div>

    {/* Location */}
    <div className="form-group">
      <label className="text-green-900 font-semibold mb-1 block">Location</label>
      <input
        {...register("location", { required: true })}
        className="input input-bordered w-full border-green-400"
        placeholder="e.g., Bashundhara, Dhaka"
      />
    </div>

    {/* Doctor */}
    <div className="md:col-span-2">
      <label className="text-green-900 font-semibold mb-1 block">Healthcare Professional</label>
      <input
        {...register("doctor", { required: true })}
        className="input input-bordered w-full border-green-400"
        placeholder="e.g., Dr. Salma Akter (MBBS)"
      />
    </div>

    {/* Description */}
    <div className="md:col-span-2">
      <label className="text-green-900 font-semibold mb-1 block">Description</label>
      <textarea
        {...register("description", { required: true })}
        className="textarea textarea-bordered w-full border-green-400"
        rows={4}
        placeholder="Write short details about this camp..."
      ></textarea>
    </div>

    {/* Submit Button */}
    <div className="md:col-span-2 text-center mt-4">
      <button
        type="submit"
        disabled={uploading}
        className={`btn px-10 py-2 rounded-full font-semibold text-white text-lg shadow-lg transition-all duration-300 ${
          uploading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-green-600 hover:bg-green-700"
        }`}
      >
        {uploading ? "Uploading..." : "Add Camp"}
      </button>
    </div>
  </form>
</div>

  );
};

export default AddACamp;
