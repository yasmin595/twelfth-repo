import React from "react";
import { useQuery } from "@tanstack/react-query";

import { FaStar } from "react-icons/fa";
import useAxiosSecure from "../hooks/useAxiosSecure";

const LatestFeedbacks = () => {
  const axiosSecure = useAxiosSecure();

  const { data: feedbacks = [], isLoading, isError } = useQuery({
    queryKey: ["latest-feedbacks"],
    queryFn: async () => {
      const res = await axiosSecure.get("/feedbacks/latest");
      return res.data;
    },
  });

  if (isLoading) return <p>Loading feedback...</p>;
  if (isError) return <p>Failed to load feedback.</p>;
  if (feedbacks.length === 0) return <p>No feedback available yet.</p>;

  return (
    <section className="max-w-full mx-auto mt-10 px-4 grid grid-cols-1">
      <h3 className="text-2xl font-semibold mb-6 text-green-700">What People Say</h3>
      <div className="space-y-6">
        {feedbacks.map(({ _id, comment, rating, campName, date }) => (
          <div
            key={_id}
            className="border border-green-200 rounded-lg p-4 shadow-sm bg-white"
          >
            <h4 className="font-semibold text-green-700 mb-1">{campName}</h4>
            <div className="flex items-center mb-2">
              {[...Array(5)].map((_, i) => (
                <FaStar
                  key={i}
                  className={`mr-1 ${
                    i < Number(rating) ? "text-yellow-400" : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <p className="mb-2 whitespace-pre-line">{comment}</p>
            <p className="text-xs text-gray-500">
              {new Date(date).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default LatestFeedbacks;
