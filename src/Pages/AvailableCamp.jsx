import React, { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import useAxiosSecure from "../hooks/useAxiosSecure";
import SearchBar from "./shared/SearchBar";
import Pagination from "./shared/Pagination";
import {
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaUserMd,
  FaUsers,
} from "react-icons/fa";

const AvailablePage = () => {
  const axiosSecure = useAxiosSecure();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortType, setSortType] = useState("default");
  const [columns, setColumns] = useState(3);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const { data: camps = [], isLoading } = useQuery({
    queryKey: ["availableCamps"],
    queryFn: async () => {
      const res = await axiosSecure.get("/camp");
      return res.data;
    },
  });

  const filteredCamps = useMemo(() => {
    return camps
      .filter((camp) => {
        const keyword = searchTerm.toLowerCase();
        return (
          camp.name?.toLowerCase().includes(keyword) ||
          camp.location?.toLowerCase().includes(keyword) ||
          camp.doctor?.toLowerCase().includes(keyword) ||
          camp.description?.toLowerCase().includes(keyword) ||
          camp.date?.includes(searchTerm)
        );
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
  }, [camps, searchTerm, sortType]);

  const totalPages = Math.ceil(filteredCamps.length / itemsPerPage);
  const paginatedCamps = filteredCamps.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const toggleLayout = () => setColumns(columns === 3 ? 2 : 3);

  if (isLoading)
    return <p className="text-center mt-10 text-gray-500">Loading camps...</p>;

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
      <h1 className="text-4xl font-bold text-center text-green-700 mb-8">
        Explore Available Medical Camps
      </h1>

      {/* 🔍 Search & Controls */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <SearchBar
          value={searchTerm}
          onChange={setSearchTerm}
          placeholder="Search camp, doctor, location or date..."
        />

        <div className="flex items-center gap-3">
          <select
            className="select select-bordered text-sm"
            value={sortType}
            onChange={(e) => setSortType(e.target.value)}
          >
            <option value="default">Sort By</option>
            <option value="mostRegistered">Most Registered</option>
            <option value="feesAsc">Fees: Low to High</option>
            <option value="feesDesc">Fees: High to Low</option>
            <option value="alpha">A-Z (Camp Name)</option>
          </select>

          <button
            onClick={toggleLayout}
            className="btn btn-sm btn-outline hover:shadow-md"
          >
            {columns === 3 ? "2 Columns" : "3 Columns"}
          </button>
        </div>
      </div>

      {/* 🧱 Camp Grid */}
      <div
        className={`grid gap-6 ${
          columns === 3
            ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
            : "grid-cols-1 sm:grid-cols-2"
        }`}
      >
        {paginatedCamps.length === 0 ? (
          <p className="text-center col-span-full text-gray-500">
            No camps found.
          </p>
        ) : (
          paginatedCamps.map((camp) => (
            <div
              key={camp._id}
              className="rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-5 bg-white flex flex-col"
            >
              <img
                src={camp.image}
                alt={camp.name}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />

              <h2 className="text-xl font-bold text-green-700 mb-2">
                {camp.name}
              </h2>

              <div className="text-sm text-gray-600 space-y-1 mb-3">
                <p className="flex items-center gap-2">
                  <FaCalendarAlt className="text-green-600" />
                  {camp.date} at {camp.time}
                </p>
                <p className="flex items-center gap-2">
                  <FaMapMarkerAlt className="text-green-600" />
                  {camp.location}
                </p>
                <p className="flex items-center gap-2">
                  <FaUserMd className="text-green-600" />
                  {camp.doctor}
                </p>
                <p className="flex items-center gap-2">
                  <FaUsers className="text-green-600" />
                  Participants: {camp.participantCount || 0}
                </p>
              </div>

              <p className="text-gray-500 text-sm mb-4 line-clamp-3">
                {camp.description}
              </p>

              <Link
                to={`/dashboard/user/details-camp/${camp._id}`}
                className="btn btn-sm bg-green-700 text-white hover:bg-green-800 mt-auto"
              >
                View Details
              </Link>
            </div>
          ))
        )}
      </div>

      {/* 🔢 Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
};

export default AvailablePage;
