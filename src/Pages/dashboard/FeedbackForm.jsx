// FeedbackForm.jsx
import React from "react";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router";

const FeedbackForm = () => {
  const { id } = useParams(); // campId or participantId
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const feedback = {
      ...data,
      campId: id,
      date: new Date(),
    };

    try {
      await axiosSecure.post("/feedback", feedback);
      toast.success("✅ Feedback submitted successfully!");
      reset();
      navigate("/dashboard/registered-camps");
    } catch (error) {
      toast.error("❌ Failed to submit feedback");
      console.error("Feedback error:", error);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">Leave Feedback</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <textarea
          {...register("comment", { required: true })}
          placeholder="Write your feedback..."
          className="textarea textarea-bordered w-full"
        ></textarea>
        {errors.comment && <p className="text-red-500">Comment is required</p>}

        <input
          type="number"
          {...register("rating", {
            required: true,
            min: 1,
            max: 5,
          })}
          placeholder="Rating (1 to 5)"
          className="input input-bordered w-full"
        />
        {errors.rating && <p className="text-red-500">Rating must be between 1 to 5</p>}

        <button type="submit" className="btn btn-success w-full">
          Submit Feedback
        </button>
      </form>
    </div>
  );
};

export default FeedbackForm;