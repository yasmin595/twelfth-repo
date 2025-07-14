import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { FaEdit, FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
// import { useAuth } from "../../context/AuthContext";
// import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Link } from "react-router";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const ManageCamps = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  // 🔁 Get camps by organizer using TanStack React Query
  const { data: camps = [], isLoading } = useQuery({
    queryKey: ["camps", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/camps?email=${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  // ❌ Mutation to delete a camp
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

  // 🔘 Delete handler with confirm dialog
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

  return (
    <div className="p-4 md:p-8">
      <h2 className="text-3xl font-bold text-green-800 mb-6">Manage My Camps</h2>

      {isLoading ? (
        <p className="text-center text-gray-600">Loading camps...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full border">
            <thead className="bg-green-100 text-green-800 font-semibold">
              <tr>
                <th>#</th>
                <th>Camp Name</th>
                <th>Date & Time</th>
                <th>Location</th>
                <th>Doctor</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {camps.map((camp, index) => (
                <tr key={camp._id}>
                  <td>{index + 1}</td>
                  <td>{camp.name}</td>
                  <td>
                    {camp.date} at {camp.time}
                  </td>
                  <td>{camp.location}</td>
                  <td>{camp.doctor}</td>
                  <td className="flex gap-2">
                    {/* Edit Button */}
                   <Link to={`/dashboard/organizer/update-camp/${camp._id}`} >

                      <button className="btn btn-sm bg-blue-600 text-white hover:bg-blue-700">
                        <FaEdit /> Edit
                      </button>
                    </Link>

                    {/* Delete Button */}
                    <button
                      onClick={() => handleDelete(camp._id)}
                      className="btn btn-sm bg-red-600 text-white hover:bg-red-700"
                    >
                      <FaTrash /> Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {camps.length === 0 && (
            <p className="text-center text-gray-500 mt-6">
              No camps added yet.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default ManageCamps;
