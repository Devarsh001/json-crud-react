import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const Edituser = () => {
    const { id } = useParams(); // Get user ID from URL
    const navigate = useNavigate(); // Navigation hook

    // State to hold form data
    const [userData, setUserData] = useState({
        name: '',
        username: '',
        email: '',
        city: '',
        phone: '',
        website: ''
    });

    // Fetch user data when component mounts
    useEffect(() => {
        axios.get(`http://localhost:8000/users/${id}`)
            .then((response) => setUserData(response.data))
            .catch((error) => console.error("Error fetching user:", error));
    }, [id]);

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData((prevData) => ({ ...prevData, [name]: value }));
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:8000/users/${id}`, userData)
            .then(() => navigate('/home')) // Redirect after successful update
            .catch((error) => console.error("Error updating user:", error));
    };

    return (
        <div className="flex flex-col gap-2 p-4">
            <h1 className="text-2xl font-bold text-center my-4">Edit User</h1>
            
            <div className="max-w-2xl mx-auto w-full p-6 border rounded shadow-md">
                <button onClick={() => { navigate('/home') }} className='border py-1 px-3 bg-white text-black rounded-sm hover:bg-gray-100 mb-4'>Back</button>

                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-x-4 space-y-4">

                    {/* Name Field */}
                    <div>
                        <label htmlFor="name" className="block font-medium">Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={userData.name}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
                            required
                        />
                    </div>

                    {/* Username Field */}
                    <div>
                        <label htmlFor="username" className="block font-medium">Username</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={userData.username}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
                            required
                        />
                    </div>

                    {/* Email Field */}
                    <div>
                        <label htmlFor="email" className="block font-medium">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={userData.email}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
                            required
                        />
                    </div>

                    {/* City Field */}
                    <div>
                        <label htmlFor="city" className="block font-medium">City</label>
                        <input
                            type="text"
                            id="city"
                            name="city"
                            value={userData.city}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
                            required
                        />
                    </div>

                    {/* Phone Field */}
                    <div>
                        <label htmlFor="phone" className="block font-medium">Phone</label>
                        <input
                            type="text"
                            id="phone"
                            name="phone"
                            value={userData.phone}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
                            required
                        />
                    </div>

                    {/* Website Field */}
                    <div>
                        <label htmlFor="website" className="block font-medium">Website</label>
                        <input
                            type="text"
                            id="website"
                            name="website"
                            value={userData.website}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
                            required
                        />
                    </div>

                    <div className="hidden md:block"></div>

                    {/* Submit Button */}
                    <div className="text-right">
                        <button type="submit" className="bg-sky-500 text-white px-4 py-2 rounded">
                            Update
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default Edituser;
