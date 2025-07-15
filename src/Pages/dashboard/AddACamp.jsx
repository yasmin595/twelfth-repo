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
    <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-xl p-8 my-10">
      <h2 className="text-3xl font-bold text-green-700 mb-6 text-center">Add New Camp</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        <div>
          <label>Camp Name</label>
          <input
            {...register("name", { required: true })}
            className="input input-bordered w-full"
          />
          {errors.name && (
            <p className="text-red-600 text-sm">Required</p>
          )}
        </div>

        <div>
          <label>Upload Camp Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="file-input file-input-bordered w-full"
          />
          {imageUrl && (
            <img
              src={imageUrl}
              alt="Uploaded Preview"
              className="mt-2 w-24 h-24 object-cover rounded border mx-auto"
            />
          )}
        </div>

        <div>
          <label>Camp Fees</label>
          <input
            type="number"
            {...register("fees", { required: true })}
            className="input input-bordered w-full"
          />
        </div>

        <div>
          <label>Date</label>
          <DatePicker
            selected={date}
            onChange={(d) => setDate(d)}
            className="input input-bordered w-full"
          />
        </div>

        <div>
          <label>Time</label>
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="input input-bordered w-full"
          />
        </div>

        <div>
          <label>Location</label>
          <input
            {...register("location", { required: true })}
            className="input input-bordered w-full"
          />
        </div>

        <div className="md:col-span-2">
          <label>Healthcare Professional</label>
          <input
            {...register("doctor", { required: true })}
            className="input input-bordered w-full"
          />
        </div>

        <div className="md:col-span-2">
          <label>Description</label>
          <textarea
            {...register("description", { required: true })}
            className="textarea textarea-bordered w-full"
            rows={4}
          ></textarea>
        </div>

        <div className="md:col-span-2 text-center">
          <button
            type="submit"
            className="btn bg-green-700 text-white hover:bg-green-800 px-10"
            disabled={uploading}
          >
            {uploading ? "Uploading..." : "Add Camp"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddACamp;
