import React, { useState } from "react";
import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import "react-datepicker/dist/react-datepicker.css";


import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";


const AddACamp = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState("10:00");

  const { register, handleSubmit, reset, formState: { errors } } = useForm();

 const onSubmit = async (data) => {
  const newCamp = {
    name: data.name,
    image: data.image,
    fees: parseFloat(data.fees),
    date: date.toISOString().split("T")[0], // formatted as YYYY-MM-DD
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
      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        <div>
          <label>Camp Name</label>
          <input {...register("name", { required: true })} className="input input-bordered w-full" />
          {errors.name && <p className="text-red-600 text-sm">Required</p>}
        </div>

        <div>
          <label>Image URL</label>
          <input {...register("image", { required: true })} className="input input-bordered w-full" />
        </div>

        <div>
          <label>Camp Fees</label>
          <input type="number" {...register("fees", { required: true })} className="input input-bordered w-full" />
        </div>

        <div>
          <label>Date</label>
          <DatePicker selected={date} onChange={(d) => setDate(d)} className="input input-bordered w-full" />
        </div>

        <div>
          <label>Time</label>
          <input type="time" value={time} onChange={(e) => setTime(e.target.value)} className="input input-bordered w-full" />
        </div>

        <div>
          <label>Location</label>
          <input {...register("location", { required: true })} className="input input-bordered w-full" />
        </div>

        <div className="md:col-span-2">
          <label>Healthcare Professional</label>
          <input {...register("doctor", { required: true })} className="input input-bordered w-full" />
        </div>

        <div className="md:col-span-2">
          <label>Description</label>
          <textarea {...register("description", { required: true })} className="textarea textarea-bordered w-full" rows={4}></textarea>
        </div>

        <div className="md:col-span-2 text-center">
          <button type="submit" className="btn bg-green-700 text-white hover:bg-green-800 px-10">Add Camp</button>
        </div>
      </form>
    </div>
  );
};

export default AddACamp;
