import React, { useState } from "react";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";

const CampDetails = () => {
  const { campId } = useParams();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [showModal, setShowModal] = useState(false);

  // ✅ Fetch camp data with TanStack Query
  const { data: camp = {}, isLoading, refetch } = useQuery({
    queryKey: ["camp-details", campId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/camps/${campId}`);
      return res.data;
    },
  });

  const handleJoin = async (e) => {
    e.preventDefault();
    const form = e.target;

    const participant = {
      campId,
      campName: camp.name,
      campFees: camp.fees,
      location: camp.location,
      doctor: camp.doctor,
      participantName: user?.displayName,
      participantEmail: user?.email,
      age: form.age.value,
      phone: form.phone.value,
      gender: form.gender.value,
      emergencyContact: form.emergencyContact.value,
      joinedAt: new Date(),
    };

    try {
      const res = await axiosSecure.post("/join-camp", participant);
      if (res.data.insertedId) {
        Swal.fire("✅ Success", "You have joined the camp!", "success");
        setShowModal(false);
        refetch(); // Refresh participant count
      }
    } catch (error) {
      console.error("Join failed:", error);
      Swal.fire("❌ Error", "Something went wrong!", "error");
    }
  };

  if (isLoading) return <p className="text-center">Loading camp details...</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <img src={camp.image} alt={camp.name} className="w-full h-72 object-cover rounded-xl mb-6" />
      <h2 className="text-3xl font-bold text-green-700 mb-2">{camp.name}</h2>
      <p><strong>Fees:</strong> ${camp.fees}</p>
      <p><strong>Date & Time:</strong> {camp.date} at {camp.time}</p>
      <p><strong>Location:</strong> {camp.location}</p>
      <p><strong>Doctor:</strong> {camp.doctor}</p>
      <p><strong>Participants:</strong> {camp.participantCount || 0}</p>
      <p className="mt-2 mb-4">{camp.description}</p>

      <button
        className="btn bg-green-700 text-white hover:bg-green-800"
        onClick={() => setShowModal(true)}
      >
        Join Camp
      </button>

      {/* ✅ Join Modal */}
    {showModal && (
  <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 overflow-y-auto">
    <div className="bg-white p-6 rounded-xl w-full max-w-xl relative max-h-screen overflow-y-auto">
      <button
        onClick={() => setShowModal(false)}
        className="absolute right-3 top-2 text-xl font-bold"
      >
        ✕
      </button>
      <h3 className="text-2xl font-bold mb-4 text-center text-green-600">Join Camp</h3>
      <form onSubmit={handleJoin} className="space-y-4">
        <input type="text" value={camp.name} readOnly className="input input-bordered w-full" />
        <input type="text" value={`$${camp.fees}`} readOnly className="input input-bordered w-full" />
        <input type="text" value={camp.location} readOnly className="input input-bordered w-full" />
        <input type="text" value={camp.doctor} readOnly className="input input-bordered w-full" />
        <input type="text" value={user?.displayName} readOnly className="input input-bordered w-full bg-green-100" />
        <input type="email" value={user?.email} readOnly className="input input-bordered w-full bg-green-100" />

        <input type="number" name="age" placeholder="Your Age" required className="input input-bordered w-full" />
        <input type="text" name="phone" placeholder="Phone Number" required className="input input-bordered w-full" />
        <select name="gender" required className="select select-bordered w-full">
          <option value="">Select Gender</option>
          <option value="female">Female</option>
          <option value="male">Male</option>
          <option value="other">Other</option>
        </select>
        <input type="text" name="emergencyContact" placeholder="Emergency Contact" required className="input input-bordered w-full" />

        <div className="text-center">
          <button type="submit" className="btn bg-green-700 hover:bg-green-800 text-white w-full">
            Confirm Join
          </button>
        </div>
      </form>
    </div>
  </div>
)}

    </div>
  );
};

export default CampDetails;
