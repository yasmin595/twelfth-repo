import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import useAxiosSecure from "../hooks/useAxiosSecure";
// import useAxiosSecure from "../../hooks/useAxiosSecure"; // adjust path

const AvailablePage = () => {
  const axiosSecure = useAxiosSecure();

  const [searchTerm, setSearchTerm] = useState("");
  const [sortType, setSortType] = useState("default");
  const [columns, setColumns] = useState(3);

  // ✅ React Query: Fetch camps
  const { data: camps = [], isLoading } = useQuery({
    queryKey: ["availableCamps"],
    queryFn: async () => {
      const res = await axiosSecure.get("/camp");
      return res.data;
    },
  });

  // 🔎 Search + Sort
  const filteredCamps = camps
    .filter((camp) => {
      const keywordMatch =
        camp.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        camp.location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        camp.doctor?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        camp.description?.toLowerCase().includes(searchTerm.toLowerCase());

      const dateMatch = camp.date?.includes(searchTerm);
      return keywordMatch || dateMatch;
    })
    .sort((a, b) => {
      if (sortType === "mostRegistered") {
        return (b.participantCount || 0) - (a.participantCount || 0);
      } else if (sortType === "feesAsc") {
        return (a.fees || 0) - (b.fees || 0);
      } else if (sortType === "feesDesc") {
        return (b.fees || 0) - (a.fees || 0);
      } else if (sortType === "alpha") {
        return a.name?.localeCompare(b.name);
      }
      return 0;
    });

  // 🔁 Toggle layout columns
  const toggleLayout = () => setColumns(columns === 3 ? 2 : 3);

  if (isLoading) return <p className="text-center mt-10">Loading camps...</p>;

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-6 text-center text-green-700">Available Camps</h1>

      {/* Search & Controls */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by keyword, location, doctor, or date"
          className="input input-bordered w-full md:max-w-md"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <div className="flex items-center gap-3">
          <select
            className="select select-bordered"
            value={sortType}
            onChange={(e) => setSortType(e.target.value)}
          >
            <option value="default">Sort By</option>
            <option value="mostRegistered">Most Registered</option>
            <option value="feesAsc">Camp Fees: Low to High</option>
            <option value="feesDesc">Camp Fees: High to Low</option>
            <option value="alpha">Alphabetical (Camp Name)</option>
          </select>

          <button
            onClick={toggleLayout}
            className="btn btn-outline btn-sm"
          >
            {columns === 3 ? "2 Columns" : "3 Columns"}
          </button>
        </div>
      </div>

      {/* Grid */}
      <div
        className={`grid gap-6 ${
          columns === 3 ? "grid-cols-1 md:grid-cols-3" : "grid-cols-1 md:grid-cols-2"
        }`}
      >
        {filteredCamps.length === 0 && (
          <p className="text-center text-gray-500 col-span-full">No camps found.</p>
        )}

        {filteredCamps.map((camp) => (
          <div key={camp._id} className="border rounded-lg shadow-lg p-4 bg-white flex flex-col">
            <img
              src={camp.image}
              alt={camp.name}
              className="w-full h-48 object-cover rounded-md mb-3"
            />
            <h2 className="text-xl font-semibold text-green-700 mb-1">{camp.name}</h2>

            <p className="text-sm text-gray-700 mb-1"><strong>Date & Time:</strong> {camp.date} at {camp.time}</p>
            <p className="text-sm text-gray-700 mb-1"><strong>Location:</strong> {camp.location}</p>
            <p className="text-sm text-gray-700 mb-1"><strong>Doctor:</strong> {camp.doctor}</p>
            <p className="text-sm text-gray-700 mb-1"><strong>Participants:</strong> {camp.participantCount || 0}</p>
            <p className="text-gray-600 mb-3 line-clamp-3">{camp.description}</p>

            <Link
              to={`/dashboard/user/details-camp/${camp._id}`}
              className="btn btn-outline btn-sm mt-auto"
            >
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AvailablePage;
