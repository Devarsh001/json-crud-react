import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Adduser = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        city: '',
        phone: ''
    });

    const navigate = useNavigate();

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value
        }));
    };

    // Handle form submit
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validation
        const { confirmPassword, ...dataToSubmit } = formData;
        console.log(confirmPassword)

        const isEmpty = Object.values(formData).some(val => val.trim() === '');
        if (isEmpty) {
            alert('Please fill in all fields.');
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            alert('Passwords do not match!');
            return;
        }

        if (formData.password.length < 6) {
            alert('Password must be at least 6 characters long!');
            return;
        }

        // Phone validation (basic)
        const phoneRegex = /^\d{10}$/;
        if (!phoneRegex.test(formData.phone)) {
            alert('Please enter a valid 10-digit phone number!');
            return;
        }

        try {
            // Check if user already exists
            const checkUser = await axios.get(`http://localhost:8000/users?email=${formData.email}`);
            
            if (checkUser.data.length > 0) {
                alert('User with this email already exists!');
                return;
            }

            const response = await axios.post('http://localhost:8000/users', dataToSubmit);
            console.log('User added:', response.data);
            alert('User added successfully!');
            navigate('/home');
        } catch (error) {
            console.error('Error adding user:', error);
            alert('Something went wrong. Please try again.');
        }
    };

    return (
        <div className="flex flex-col gap-2 p-4">
            <h1 className="text-2xl font-bold text-center my-4">Add User</h1>
            
            <div className="max-w-2xl mx-auto w-full p-6 border rounded shadow-md">
                <button 
                    onClick={() => navigate('/home')} 
                    className="border py-1 px-3 bg-white text-black rounded-sm hover:bg-gray-100 mb-4"
                >
                    Back
                </button>

                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-x-4 space-y-4">
                    {/* Name */}
                    <div>
                        <label htmlFor="name" className="block font-medium">Name*</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
                            placeholder="Enter full name"
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label htmlFor="email" className="block font-medium">Email*</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
                            placeholder="Enter email"
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label htmlFor="password" className="block font-medium">Password*</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
                            placeholder="Min. 6 characters"
                        />
                    </div>

                    {/* Confirm Password */}
                    <div>
                        <label htmlFor="confirmPassword" className="block font-medium">Confirm Password*</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
                            placeholder="Re-enter password"
                        />
                    </div>

                    {/* City */}
                    <div>
                        <label htmlFor="city" className="block font-medium">City*</label>
                        <input
                            type="text"
                            id="city"
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
                            placeholder="Enter city"
                        />
                    </div>

                    {/* Phone */}
                    <div>
                        <label htmlFor="phone" className="block font-medium">Phone*</label>
                        <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            maxLength="10"
                            className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
                            placeholder="10-digit number"
                        />
                    </div>

                    <div className="hidden md:block"></div>

                    {/* Submit Button */}
                    <div className="text-right">
                        <button 
                            type="submit" 
                            className="border p-2 bg-sky-500 rounded-sm hover:bg-sky-800 mb-4"
                        >
                            Add User
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Adduser;