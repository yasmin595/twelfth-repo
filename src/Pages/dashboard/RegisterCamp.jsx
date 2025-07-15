import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import { Link } from "react-router";
import Pagination from "../shared/Pagination";
import SearchBar from "../shared/SearchBar";


const RegisteredCamps = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data: camps = [], refetch, isLoading } = useQuery({
    queryKey: ["registeredCamps", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/registered-camps?email=${user.email}`);
      return res.data;
    },
  });

  // Pagination and Search states
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  const filteredCamps = camps.filter((camp) =>
    `${camp.campName} ${camp.date} ${camp.doctor}`.toLowerCase().includes(searchText.toLowerCase())
  );

  const totalPages = Math.ceil(filteredCamps.length / rowsPerPage);
  const paginatedCamps = filteredCamps.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const handleCancel = async (participantId, campId, isPaid) => {
    if (isPaid) return;

    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "You want to cancel your registration!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, cancel it!",
    });

    if (confirm.isConfirmed) {
      try {
        await axiosSecure.delete(`/registered-camp/${participantId}`);
        await axiosSecure.patch(`/camps/${campId}/decrease`);

        Swal.fire("Cancelled!", "Your registration has been removed.", "success");
        refetch();
      } catch (error) {
        console.error("Error during cancel:", error);
        Swal.fire("Error", "Something went wrong. Please try again.", "error");
      }
    }
  };

  if (isLoading) return <p className="text-center">Loading registered camps...</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-green-700">Registered Camps</h2>

      <SearchBar value={searchText} onChange={setSearchText} />

      <div className="overflow-x-auto">
        <table className="table">
          <thead className="bg-green-200">
            <tr>
              <th>#</th>
              <th>Camp</th>
              <th>Fees</th>
              <th>Payment</th>
              <th>Confirmation</th>
              <th>Feedback</th>
              <th>Cancel</th>
            </tr>
          </thead>
          <tbody>
            {paginatedCamps.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center text-gray-500 py-4">
                  No matching camps found.
                </td>
              </tr>
            ) : (
              paginatedCamps.map((camp, index) => (
                <tr key={camp._id} className="hover">
                  <td>{(currentPage - 1) * rowsPerPage + index + 1}</td>
                  <td>{camp.campName}</td>
                  <td>${camp.campFees}</td>

                  <td>
                    {camp.paymentStatus === "paid" ? (
                      <span className="text-green-600 font-semibold">Paid</span>
                    ) : (
                      <Link
                        to={`/dashboard/payment/${camp._id}`}
                        className="btn btn-sm btn-outline btn-success"
                      >
                        Pay
                      </Link>
                    )}
                  </td>

                  <td>
                    {camp.confirmationStatus === "confirmed" ? (
                      <span className="text-green-500">Confirmed</span>
                    ) : (
                      <span className="text-yellow-500">Pending</span>
                    )}
                  </td>

                  <td>
                    {camp.paymentStatus === "paid" ? (
                      <Link
                        to={`/dashboard/participant/feedback/${camp._id}`}
                        className="btn btn-sm btn-info text-white"
                      >
                        Feedback
                      </Link>
                    ) : (
                      <span className="text-gray-400">N/A</span>
                    )}
                  </td>

                  <td>
                    <button
                      className="btn btn-sm btn-error text-white"
                      disabled={camp.paymentStatus === "paid"}
                      onClick={() =>
                        handleCancel(camp._id, camp.campId, camp.paymentStatus === "paid")
                      }
                    >
                      Cancel
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default RegisteredCamps;
