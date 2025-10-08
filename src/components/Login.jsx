import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();

    // State to store all users fetched from backend (json-server)
    const [users, setUsers] = useState([]);

    // State to track login input
    const [loginData, setLoginData] = useState({
        email: '',
        password: ''
    });

    // Fetch all registered users once on page load
    useEffect(() => {
        axios
            .get(`http://localhost:8000/users`)
            .then((response) => setUsers(response.data))
            .catch((error) => console.error('Error fetching user:', error));
    }, []);

    // Update login form input values
    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoginData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    // Handle login form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        // Check if user exists and password matches
        const isValidUser = users.find(
            (user) =>
                user.email === loginData.email &&
                user.password === loginData.password
        );

        if (isValidUser) {
            navigate('/home'); // Redirect to home page
        } else {
            alert('User email and password do not match!');
        }
    };

    return (
        <div className="p-5 border rounded-lg w-[400px] mx-auto absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="flex flex-col justify-center text-center gap-5">
                <h2 className="text-4xl font-bold">Login</h2>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    {/* Email */}
                    <div className="flex flex-col text-left">
                        <label htmlFor="email" className="mb-1">Email*</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Enter your email"
                            value={loginData.email}
                            onChange={handleChange}
                            className="border px-3 py-2 rounded"
                        />
                    </div>

                    {/* Password */}
                    <div className="flex flex-col text-left">
                        <label htmlFor="password" className="mb-1">Password*</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Enter your password"
                            value={loginData.password}
                            onChange={handleChange}
                            className="border px-3 py-2 rounded"
                        />
                    </div>

                    {/* Submit Button */}
                    <div>
                        <button
                            type="submit"
                            className="bg-sky-500 text-white px-4 py-2 rounded hover:bg-sky-600 w-full"
                        >
                            Login
                        </button>
                    </div>
                </form>

                {/* Link to Register */}
                <div className="text-sm">
                    Don't have an account?{' '}
                    <button
                        onClick={() => navigate('/addUser')}
                        className="text-sky-500 hover:underline"
                    >
                        Register here
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Login;