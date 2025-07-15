import React, { useState } from "react";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import {
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaUserMd,
  FaUsers,
  FaDollarSign,
  FaPhoneAlt,
} from "react-icons/fa";
import { MdEmergency } from "react-icons/md";
import { BsGenderAmbiguous } from "react-icons/bs";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";

const CampDetails = () => {
  const { campId } = useParams();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [showModal, setShowModal] = useState(false);

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
        refetch();
      }
    } catch (error) {
      console.error("Join failed:", error);
      Swal.fire("❌ Error", "Something went wrong!", "error");
    }
  };

  if (isLoading) return <p className="text-center mt-10">Loading camp details...</p>;

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="rounded-xl shadow-md bg-white p-6 md:flex md:gap-6">
        <img
          src={camp.image}
          alt={camp.name}
          className="w-full md:w-1/2 h-64 object-cover rounded-lg mb-6 md:mb-0"
        />
        <div className="flex-1 space-y-2">
          <h2 className="text-3xl font-bold text-green-700">{camp.name}</h2>
          <p className="flex items-center gap-2 text-gray-700">
            <FaDollarSign className="text-green-600" /> <strong>Fees:</strong> ${camp.fees}
          </p>
          <p className="flex items-center gap-2 text-gray-700">
            <FaCalendarAlt className="text-green-600" /> <strong>Date & Time:</strong> {camp.date} at {camp.time}
          </p>
          <p className="flex items-center gap-2 text-gray-700">
            <FaMapMarkerAlt className="text-green-600" /> <strong>Location:</strong> {camp.location}
          </p>
          <p className="flex items-center gap-2 text-gray-700">
            <FaUserMd className="text-green-600" /> <strong>Doctor:</strong> {camp.doctor}
          </p>
          <p className="flex items-center gap-2 text-gray-700">
            <FaUsers className="text-green-600" /> <strong>Participants:</strong> {camp.participantCount || 0}
          </p>
          <p className="text-gray-600 mt-4">{camp.description}</p>

          <button
            onClick={() => setShowModal(true)}
            className="btn bg-green-700 text-white hover:bg-green-800 mt-4"
          >
            Join Camp
          </button>
        </div>
      </div>

      {/* ✅ Join Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 overflow-y-auto px-4">
          <div className="bg-white p-6 rounded-xl w-full max-w-xl relative max-h-screen overflow-y-auto shadow-lg">
            <button
              onClick={() => setShowModal(false)}
              className="absolute right-4 top-3 text-xl font-bold text-gray-600 hover:text-red-600"
            >
              ✕
            </button>
            <h3 className="text-2xl font-bold mb-4 text-center text-green-600">
              Join Camp
            </h3>
            <form onSubmit={handleJoin} className="space-y-4">
              <input type="text" value={camp.name} readOnly className="input input-bordered w-full" />
              <input type="text" value={`$${camp.fees}`} readOnly className="input input-bordered w-full" />
              <input type="text" value={camp.location} readOnly className="input input-bordered w-full" />
              <input type="text" value={camp.doctor} readOnly className="input input-bordered w-full" />
              <input type="text" value={user?.displayName} readOnly className="input input-bordered w-full bg-green-100" />
              <input type="email" value={user?.email} readOnly className="input input-bordered w-full bg-green-100" />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input type="number" name="age" placeholder="Your Age" required className="input input-bordered w-full" />
                <div className="relative">
                  <FaPhoneAlt className="absolute left-3 top-3 text-gray-400" />
                  <input
                    type="text"
                    name="phone"
                    placeholder="Phone Number"
                    required
                    className="input input-bordered w-full pl-10"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="relative">
                  <BsGenderAmbiguous className="absolute left-3 top-3 text-gray-400" />
                  <select name="gender" required className="select select-bordered w-full pl-10">
                    <option value="">Select Gender</option>
                    <option value="female">Female</option>
                    <option value="male">Male</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div className="relative">
                  <MdEmergency className="absolute left-3 top-3 text-gray-400" />
                  <input
                    type="text"
                    name="emergencyContact"
                    placeholder="Emergency Contact"
                    required
                    className="input input-bordered w-full pl-10"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="btn bg-green-700 hover:bg-green-800 text-white w-full"
              >
                Confirm Join
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CampDetails;
