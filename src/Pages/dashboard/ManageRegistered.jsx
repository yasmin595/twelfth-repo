import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const ManageRegistered = () => {
  const axiosSecure = useAxiosSecure();

  const { data: registrations = [], refetch } = useQuery({
    queryKey: ["allRegistrations"],
    queryFn: async () => {
      const res = await axiosSecure.get("/all-registrations");
      return res.data;
    },
  });

  const handleConfirm = async (id) => {
    try {
      await axiosSecure.patch(`/confirm-registration/${id}`);
      Swal.fire("Confirmed!", "Participant confirmed successfully.", "success");
      refetch();
    } catch (error) {
      Swal.fire("Error", "Failed to confirm registration.", "error");
    }
  };

  const handleCancel = async (participantId, isPaid, isConfirmed, campId) => {
    if (isPaid && isConfirmed) return;

    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "You want to cancel this registration!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, cancel it!",
    });

    if (confirm.isConfirmed) {
      try {
        await axiosSecure.delete(`/cancel-camp/${participantId}`);
        await axiosSecure.patch(`/camps/${campId}/decrease`);
        Swal.fire("Cancelled!", "Registration has been removed.", "success");
        refetch();
      } catch (error) {
        console.error("Cancellation error:", error);
        Swal.fire("Error", "Something went wrong during cancellation.", "error");
      }
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-green-700">
        Manage Registered Camps
      </h2>
      <div className="overflow-x-auto">
        <table className="table">
          <thead className="bg-green-200">
            <tr>
              <th>#</th>
              <th>Camp</th>
              <th>Fees</th>
              <th>Participant</th>
              <th>Payment</th>
              <th>Confirmation</th>
              <th>Cancel</th>
            </tr>
          </thead>
          <tbody>
            {registrations.map((reg, index) => (
              <tr key={reg._id} className="hover">
                <td>{index + 1}</td>
                <td>{reg.campName}</td>
                <td>${reg.campFees}</td>
                <td>{reg.participantName}</td>
                <td>
                  {reg.paymentStatus === "paid" ? (
                    <span className="text-green-600 font-bold">Paid</span>
                  ) : (
                    <span className="text-red-600 font-bold">Unpaid</span>
                  )}
                </td>
                <td>
                  {reg.confirmationStatus === "confirmed" ? (
                    <span className="text-green-600">Confirmed</span>
                  ) : reg.paymentStatus === "paid" ? (
                    <button
                      className="btn btn-sm btn-success"
                      onClick={() => handleConfirm(reg._id)}
                    >
                      Confirm
                    </button>
                  ) : (
                    <span className="text-gray-500">Waiting</span>
                  )}
                </td>
                <td>
                  <button
                    className="btn btn-sm btn-error text-white"
                    disabled={reg.paymentStatus === "paid" && reg.confirmationStatus === "confirmed"}
                    onClick={() =>
                      handleCancel(
                        reg._id,
                        reg.paymentStatus === "paid",
                        reg.confirmationStatus === "confirmed",
                        reg.campId
                      )
                    }
                  >
                    Cancel
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {registrations.length === 0 && (
          <p className="text-center mt-4">No registrations found.</p>
        )}
      </div>
    </div>
  );
};

export default ManageRegistered;
