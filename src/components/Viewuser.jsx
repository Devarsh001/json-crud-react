import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const Viewuser = () => {
    const navigate = useNavigate();
    const { id } = useParams(); // 🆔 Get user ID from URL
    const [user, setUser] = useState(null); // 🔄 Store user details

    useEffect(() => {
        axios.get(`http://localhost:8000/users/${id}`)
            .then(response => setUser(response.data))
            .catch(error => console.error("Error fetching user:", error));
    }, [id]);

    if (!user) return <p className="text-center mt-10">Loading user...</p>;

    return (
        <div className="flex flex-col gap-2 p-4">
            <h1 className="text-2xl font-bold text-center my-4">User Details</h1>
            <div className="max-w-xl mx-auto w-full p-6 border rounded shadow-md">
                <button onClick={() => { navigate('/home') }} className='border py-1 px-3 bg-white text-black rounded-sm'>Back</button>

                <table className="w-full text-left border-separate border-spacing-y-2">
                    <tbody>
                        <tr>
                            <td className="font-medium">ID:</td>
                            <td className="text-end">{user.id || "NA"}</td>
                        </tr>
                        <tr>
                            <td className="font-medium">Name:</td>
                            <td className="text-end">{user.name || "NA"}</td>
                        </tr>
                        <tr>
                            <td className="font-medium">Username:</td>
                            <td className="text-end">{user.username || "NA"}</td>
                        </tr>
                        <tr>
                            <td className="font-medium">Email:</td>
                            <td className="text-end">{user.email || "NA"}</td>
                        </tr>
                        <tr>
                            <td className="font-medium">City:</td>
                            <td className="text-end">{user.city || "NA"}</td>
                        </tr>
                        <tr>
                            <td className="font-medium">Phone:</td>
                            <td className="text-end">{user.phone || "NA"}</td>
                        </tr>
                        <tr>
                            <td className="font-medium">Website:</td>
                            <td className="text-end">{user.website || "NA"}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Viewuser;
