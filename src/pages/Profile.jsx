import React, { useState } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { updateUser } from '../api/user';
// import { updateUser } from '../api/user'; // Ensure this is imported

const Profile = () => {
  const { user, setUser } = useAuthStore(); // Assuming setUser exists to update local state
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ name: user?.name || '', email: user?.email || '' });
  const [loading, setLoading] = useState(false);

  if (!user) return <div className="p-10 text-center">Loading user data...</div>;

  const handleUpdate = async () => {
    setLoading(true);
    try {
      // Logic: call your API function
      // const res = await updateUser(formData); 
      // setUser(res.data); // Update Zustand/Store with new data
      const res = await updateUser(formData)
      console.log(res)
      
      console.log("Updating user with:", formData);
      setIsEditing(false);
    } catch (err) {
        console.log(err)
      alert("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-white shadow-md rounded-lg p-8 mt-10 relative">
      {/* Edit/Save Button Toggle */}
      <button 
        onClick={isEditing ? handleUpdate : () => setIsEditing(true)}
        disabled={loading}
        className="absolute top-8 right-8 text-sm font-semibold px-4 py-2 rounded-lg transition-all bg-amber-50 text-amber-600 hover:bg-amber-100"
      >
        {loading ? 'Saving...' : isEditing ? 'Save Changes' : 'Edit Profile'}
      </button>

      <h1 className="text-3xl font-bold mb-6 text-gray-800">User Profile</h1>
      
      <div className="space-y-6">
        {/* Full Name Field */}
        <div className="border-b pb-4">
          <p className="text-sm text-gray-500 uppercase font-semibold mb-1">Full Name</p>
          {isEditing ? (
            <input 
              type="text"
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-amber-500 outline-none"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
          ) : (
            <p className="text-lg text-gray-800">{user.name}</p>
          )}
        </div>

        {/* Email Field */}
        <div className="border-b pb-4">
          <p className="text-sm text-gray-500 uppercase font-semibold mb-1">Email Address</p>
          {isEditing ? (
            <input 
              type="email"
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-amber-500 outline-none"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          ) : (
            <p className="text-lg text-gray-800">{user.email}</p>
          )}
        </div>

        {/* Account Created (Read-only) */}
        <div>
          <p className="text-sm text-gray-500 uppercase font-semibold">Account Created</p>
          <p className="text-lg text-gray-800">
            {new Date(user.createdAt).toLocaleDateString()}
          </p>
        </div>

        {isEditing && (
          <button 
            onClick={() => { setIsEditing(false); setFormData({ name: user.name, email: user.email }); }}
            className="text-sm text-gray-400 hover:text-gray-600 mt-2"
          >
            Cancel
          </button>
        )}
      </div>
    </div>
  );
};

export default Profile;