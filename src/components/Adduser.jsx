import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Adduser = () => {
    // Step 1: Simple form state for each field
    const [formData, setFormData] = useState({
        name: '',
        username: '',
        email: '',
        password: '',
        city: '',
        phone: '',
        website: ''
    });

    const navigate = useNavigate();

    // Step 2: Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value
        }));
    };

    // Step 3: Handle form submit
    const handleSubmit = async (e) => {
        e.preventDefault();

        const isEmpty = Object.values(formData).some(val => val.trim() === '');
        if (isEmpty) {
            alert('Please fill in all fields.');
            return;
        }

        try {
            const response = await axios.post('http://localhost:8000/users', formData);
            console.log('User added:', response.data);
            alert('User added successfully!');
            navigate('/home');
        } catch (error) {
            console.error('Error adding user:', error);
            alert('Something went wrong. Please try again.');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="w-full max-w-2xl p-6 border rounded-lg shadow-lg">
                <h2 className="text-3xl font-bold text-center mb-6">Add User</h2>

                <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">

                    {/* Name */}
                    <div className="flex flex-col">
                        <label htmlFor="name">Name*</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="border p-2 rounded"
                        />
                    </div>

                    {/* Username */}
                    <div className="flex flex-col">
                        <label htmlFor="username">Username*</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            className="border p-2 rounded"
                        />
                    </div>

                    {/* Email */}
                    <div className="flex flex-col">
                        <label htmlFor="email">Email*</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="border p-2 rounded"
                        />
                    </div>

                    {/* Password (full width) */}
                    <div className="flex flex-col">
                        <label htmlFor="password">Password*</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="border p-2 rounded"
                        />
                    </div>

                    {/* City */}
                    <div className="flex flex-col">
                        <label htmlFor="city">City*</label>
                        <input
                            type="text"
                            id="city"
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                            className="border p-2 rounded"
                        />
                    </div>

                    {/* Phone */}
                    <div className="flex flex-col">
                        <label htmlFor="phone">Phone*</label>
                        <input
                            type="text"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="border p-2 rounded"
                        />
                    </div>

                    {/* Website */}
                    <div className="flex flex-col col-span-2">
                        <label htmlFor="website">Website*</label>
                        <input
                            type="text"
                            id="website"
                            name="website"
                            value={formData.website}
                            onChange={handleChange}
                            className="border p-2 rounded"
                        />
                    </div>

                    {/* Empty for spacing + Submit Button */}
                    <div></div>
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            className="bg-sky-500 text-white px-4 py-2 rounded hover:bg-sky-600"
                        >
                            Submit
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default Adduser;
