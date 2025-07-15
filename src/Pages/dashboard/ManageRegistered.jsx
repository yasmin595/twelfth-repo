import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const ManageRegistered = () => {
  const axiosSecure = useAxiosSecure();

  const { data: registrations = [], refetch, isLoading } = useQuery({
    queryKey: ["allRegistrations"],
    queryFn: async () => {
      const res = await axiosSecure.get("/all-registrations");
      return res.data;
    },
  });

  const handleConfirm = async (registrationId, participantEmail) => {
    try {
      await axiosSecure.patch(`/confirm-registration/${registrationId}`);
      await axiosSecure.patch(`/users/participant/${participantEmail}`);

      Swal.fire("Confirmed!", "Participant confirmed successfully.", "success");
      refetch();
    } catch (error) {
      console.error("Confirmation error:", error);
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
    <div className="p-4 md:p-6">
      <h2 className="text-3xl font-bold text-green-700 mb-4 text-center">
        Manage Registered Camps
      </h2>

      <div className="overflow-x-auto bg-white shadow rounded-xl">
        <table className="table table-zebra w-full">
          <thead className="bg-green-200 text-green-900">
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
            {registrations.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center py-6 text-gray-500">
                  No registrations found.
                </td>
              </tr>
            ) : (
              registrations.map((reg, index) => (
                <tr key={reg._id} className="hover">
                  <td>{index + 1}</td>
                  <td className="font-semibold">{reg.campName}</td>
                  <td className="text-green-700 font-medium">${reg.campFees}</td>
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
                      <span className="badge badge-success text-white">Confirmed</span>
                    ) : reg.paymentStatus === "paid" ? (
                      <button
                        className="btn btn-xs md:btn-sm bg-green-600 hover:bg-green-700 text-white"
                        onClick={() => handleConfirm(reg._id, reg.participantEmail)}
                      >
                        Confirm
                      </button>
                    ) : (
                      <span className="text-gray-500">Waiting</span>
                    )}
                  </td>
                  <td>
                    <button
                      className="btn btn-xs md:btn-sm bg-red-500 hover:bg-red-600 text-white"
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
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageRegistered;
