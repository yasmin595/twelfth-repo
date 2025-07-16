import React, { useState, useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { FaEdit, FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import { Link } from "react-router";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import SearchBar from "../shared/SearchBar";
import Pagination from "../shared/Pagination";


const ManageCamps = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const campsPerPage = 10;

  const { data: camps = [], isLoading } = useQuery({
    queryKey: ["camps", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/camps?email=${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  const deleteMutation = useMutation({
    mutationFn: async (campId) => {
      return await axiosSecure.delete(`/delete-camp/${campId}`);
    },
    onSuccess: () => {
      Swal.fire("Deleted!", "The camp has been deleted.", "success");
      queryClient.invalidateQueries(["camps", user?.email]);
    },
    onError: () => {
      Swal.fire("Error!", "Something went wrong. Try again.", "error");
    },
  });

  const handleDelete = (campId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This camp will be deleted permanently!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#4ade80",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteMutation.mutate(campId);
      }
    });
  };

  const filteredCamps = useMemo(() => {
    return camps.filter((camp) =>
      `${camp.name} ${camp.location} ${camp.doctor}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );
  }, [camps, searchTerm]);

  const totalPages = Math.ceil(filteredCamps.length / campsPerPage);
  const paginatedCamps = filteredCamps.slice(
    (currentPage - 1) * campsPerPage,
    currentPage * campsPerPage
  );

  return (
    <div className="p-4 md:p-8">
      <h2 className="text-3xl font-bold text-green-700 mb-6 text-center">
        Manage My Camps
      </h2>

      <div className="max-w-md mx-auto mb-6">
        <SearchBar
          value={searchTerm}
          onChange={setSearchTerm}
          placeholder="Search by camp name, doctor, or location"
        />
      </div>

      {isLoading ? (
        <p className="text-center text-gray-500">Loading camps...</p>
      ) : (
        <div className="bg-white shadow-lg rounded-xl overflow-x-auto">
          <table className="table w-full text-sm">
            <thead className="bg-green-100 text-green-800 text-sm">
              <tr>
                <th>#</th>
                <th>Camp Name</th>
                <th>Date & Time</th>
                <th>Location</th>
                <th>Doctor</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedCamps.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center py-6 text-gray-500">
                    No camps found.
                  </td>
                </tr>
              ) : (
                paginatedCamps.map((camp, index) => (
                  <tr key={camp._id} className="hover:bg-gray-50 transition">
                    <td>{(currentPage - 1) * campsPerPage + index + 1}</td>
                    <td className="font-semibold text-gray-800">{camp.name}</td>
                    <td>{camp.date} at {camp.time}</td>
                    <td>{camp.location}</td>
                    <td>{camp.doctor}</td>
                    <td>
                      <div className="flex justify-center gap-2 flex-wrap">
                        <Link to={`/dashboard/organizer/update-camp/${camp._id}`}>
                          <button className="btn btn-sm bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-1">
                            <FaEdit /> Edit
                          </button>
                        </Link>
                        <button
                          onClick={() => handleDelete(camp._id)}
                          className="btn btn-sm bg-red-600 hover:bg-red-700 text-white flex items-center gap-1"
                        >
                          <FaTrash /> Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-6">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={(page) => setCurrentPage(page)}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ManageCamps;
