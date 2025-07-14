import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import { Link } from "react-router";

const RegisteredCamps = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  // Fetch registered camps for this participant
  const { data: camps = [], refetch, isLoading } = useQuery({
    queryKey: ["registeredCamps", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/registered-camps?email=${user.email}`);
      return res.data;
    },
  });

  // Cancel Registration
  const handleCancel = async (id, isPaid) => {
    if (isPaid) return;
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "You want to cancel your registration!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, cancel it!",
    });

    if (confirm.isConfirmed) {
      await axiosSecure.delete(`/cancel-camp/${id}`);
      Swal.fire("Cancelled!", "Registration has been removed.", "success");
      refetch();
    }
  };

  if (isLoading) return <p className="text-center">Loading registered camps...</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-green-700">Registered Camps</h2>
      <div className="overflow-x-auto">
        <table className="table">
          <thead className="bg-green-200">
            <tr>
              <th>#</th>
              <th>Camp</th>
              <th>Fees</th>
              <th>Status</th>
              <th>Confirmation</th>
              <th>Feedback</th>
              <th>Cancel</th>
            </tr>
          </thead>
          <tbody>
            {camps.map((camp, index) => (
              <tr key={camp._id} className="hover">
                <td>{index + 1}</td>
                <td>{camp.campName}</td>
                <td>${camp.campFees}</td>
                <td>
                  {camp.paymentStatus === "paid" ? (
                    <span className="text-green-600 font-bold">Paid</span>
                  ) : (
                    <Link
                      to={`/dashboard/payment/${camp._id}`}
                      className="btn btn-sm btn-outline"
                    >
                      Pay
                    </Link>
                  )}
                </td>
                <td>
                  {camp.confirmationStatus === "confirmed" ? (
                    <span className="text-green-600">Confirmed</span>
                  ) : (
                    <span className="text-yellow-600">Pending</span>
                  )}
                </td>
                <td>
                  {camp.paymentStatus === "paid" ? (
                    <Link
                      to={`/dashboard/feedback/${camp._id}`}
                      className="btn btn-sm btn-info text-white"
                    >
                      Feedback
                    </Link>
                  ) : (
                    <span className="text-gray-400">--</span>
                  )}
                </td>
                <td>
                  <button
                    className="btn btn-sm btn-error text-white"
                    disabled={camp.paymentStatus === "paid"}
                    onClick={() => handleCancel(camp._id, camp.paymentStatus === "paid")}
                  >
                    Cancel
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {camps.length === 0 && <p className="text-center mt-4">No camps registered yet.</p>}
      </div>
    </div>
  );
};

export default RegisteredCamps;
