import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { updateProfile } from "firebase/auth";

const ParticipantProfile = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [userInfo, setUserInfo] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState("");
  const [photoURL, setPhotoURL] = useState("");

  useEffect(() => {
    if (user?.email) {
      axiosSecure.get(`/users/${user.email}`).then((res) => {
        setUserInfo(res.data);
        setName(res.data.name || user.displayName);
        setPhotoURL(res.data.photoURL || user.photoURL);
      });
    }
  }, [user, axiosSecure]);

  const handleImageUpload = async (e) => {
    const image = e.target.files[0];
    const formData = new FormData();
    formData.append("image", image);
    const url = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_upload_key}`;

    try {
      const res = await axios.post(url, formData);
      setPhotoURL(res.data.data.url);
    } catch (err) {
      console.error("Image upload error:", err);
    }
  };

  const handleUpdate = async () => {
    try {
      await updateProfile(user, {
        displayName: name,
        photoURL: photoURL,
      });

      await axiosSecure.patch(`/users/${user.email}`, {
        name,
        photoURL,
      });

      Swal.fire("✅ Updated!", "Your profile has been updated.", "success");
      setEditMode(false);
    } catch (error) {
      Swal.fire("Error", "Failed to update profile.", "error");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
      <h2 className="text-3xl font-bold text-green-700 mb-6 text-center">
        Participant Profile
      </h2>

      <div className="flex flex-col items-center gap-4">
        <img
          src={photoURL || "https://i.ibb.co/5GzXkwq/user.png"}
          alt="Profile"
          className="w-32 h-32 rounded-full border-4 border-green-500 object-cover"
        />

        {editMode ? (
          <div className="text-center space-y-2">
            <input
              type="text"
              className="input input-bordered w-full"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="file-input file-input-bordered w-full"
            />
            <button
              onClick={handleUpdate}
              className="btn btn-success btn-sm mt-2"
            >
              Save Changes
            </button>
          </div>
        ) : (
          <div className="text-center">
            <h3 className="text-2xl font-semibold text-green-800">{name}</h3>
            <p className="text-gray-600">{user?.email}</p>
            <button
              onClick={() => setEditMode(true)}
              className="btn btn-sm btn-outline btn-success mt-3"
            >
              Edit Profile
            </button>
          </div>
        )}
      </div>

      <div className="mt-8 text-sm text-gray-700 space-y-2 text-center">
        <p>
          <span className="font-semibold">Role:</span>{" "}
          {userInfo?.role || "Participant"}
        </p>
        <p>
          <span className="font-semibold">Account Created:</span>{" "}
          {userInfo?.created_at
            ? new Date(userInfo.created_at).toLocaleString()
            : "N/A"}
        </p>
        <p>
          <span className="font-semibold">Last Login:</span>{" "}
          {userInfo?.last_log_in
            ? new Date(userInfo.last_log_in).toLocaleString()
            : "N/A"}
        </p>
      </div>
    </div>
  );
};

export default ParticipantProfile;
