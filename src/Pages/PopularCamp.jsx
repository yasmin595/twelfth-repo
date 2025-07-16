import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import { motion } from "framer-motion";


import { MdLocationOn, MdDateRange, MdAccessTime, MdAttachMoney } from "react-icons/md";
import { FaUserDoctor, FaUsers } from "react-icons/fa6";
import useAxiosSecure from "../hooks/useAxiosSecure";

const PopularCamps = () => {
  const axiosSecure = useAxiosSecure();

  const { data: camps = [], isLoading, isError } = useQuery({
    queryKey: ["popularCamps"],
    queryFn: async () => {
      const res = await axiosSecure.get("/camp/popular-camps");
      return res.data;
    },
  });

  if (isLoading)
    return <div className="text-center py-10 text-gray-500">Loading...</div>;
  if (isError)
    return <div className="text-center py-10 text-red-500">Failed to load camps.</div>;

  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      <motion.h2
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl font-bold text-center text-green-700 mb-10"
      >
        🌟 Popular Medical Camps
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {camps.map((camp, idx) => (
          <motion.div
            key={camp._id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: idx * 0.1 }}
            className="bg-white shadow-md  rounded-2xl overflow-hidden hover:shadow-xl transition duration-300"
          >
            <img
              src={camp.image}
              alt={camp.name}
              className="w-full h-56 object-cover"
            />
            <div className="p-5 space-y-2">
              <h3 className="text-xl font-bold text-green-800">{camp.name}</h3>

              <p className="flex items-center text-sm text-gray-600 gap-1">
                <MdLocationOn className="text-green-600" /> {camp.location}
              </p>

              <p className="flex items-center text-sm text-gray-600 gap-1">
                <FaUserDoctor className="text-green-600" /> {camp.doctor}
              </p>

              <div className="flex items-center gap-4 text-sm text-gray-600">
                <p className="flex items-center gap-1">
                  <MdDateRange className="text-green-600" /> {camp.date}
                </p>
                <p className="flex items-center gap-1">
                  <MdAccessTime className="text-green-600" /> {camp.time}
                </p>
              </div>

              <div className="flex items-center gap-4 text-sm text-gray-600">
                <p className="flex items-center gap-1">
                  <MdAttachMoney className="text-green-600" /> {camp.fees}
                </p>
                <p className="flex items-center gap-1">
                  <FaUsers className="text-green-600" /> {camp.participantCount} joined
                </p>
              </div>

              <Link to={`/user/details-camp/${camp._id}`}>
                <button className="btn btn-sm btn-outline text-green-700 hover:bg-green-700 hover:text-white mt-2 w-full">
                  View Details
                </button>
              </Link>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="text-center mt-10"
      >
        <Link to="/available-camps">
          <button className="btn bg-green-700 hover:bg-green-800 text-white text-lg px-8">
            See All Camps
          </button>
        </Link>
      </motion.div>
    </section>
  );
};

export default PopularCamps;
