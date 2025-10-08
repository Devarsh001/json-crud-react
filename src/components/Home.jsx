import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const Home = () => {
    const [users, setUsers] = useState([]);
    // const { id } = useParams();

    useEffect(() => {
        axios.get(`http://localhost:8000/users`).then(response => {
            setUsers(response.data);
        }).catch(error => {
            console.error("There was an error fetching the users!", error);
        });
    }, []);

    const handleClick = (id) => {
        axios
            .delete(`http://localhost:8000/users/${id}`)
            .then(response => {
                setUsers(prevUsers => prevUsers.filter(user => user.id !== id));
                console.log(response);
            })
            .catch(error => {
                console.error("Error deleting the user", error);
            });
    };


    return (
        <div className='flex flex-col gap-2 p-4'>
            <h1 className='text-2xl font-bold text-center my-4'>User List</h1>
            <div className="text-end py-3">
                <Link to='/addUser' className='border p-2 bg-sky-500 rounded-sm hover:bg-sky-800 mb-4'>Add User</Link>
            </div>
            <div className=''>
                <table className='w-full text-center'>
                    <thead className='w-full'>
                        <tr className='border'>
                            <th>Id</th>
                            <th>Full Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>City</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.id} className=''>
                                <td>
                                    {user.id || 'NA'}
                                </td>
                                <td>
                                    {user.name || 'NA'}
                                </td>
                                <td>
                                    {user.email || 'NA'}
                                </td>
                                <td>
                                    {user.phone || 'NA'}
                                </td>
                                <td>
                                    {user.city || 'NA'}
                                </td>
                                <td className='flex gap-2 py-2 justify-center'>
                                    <Link to={`/viewUser/${user.id}`}>
                                        <i className='fa fa-eye bg-sky-500 hover:bg-sky-700 p-2 rounded-full'></i>
                                    </Link>
                                    <Link to={`/editUser/${user.id}`}>
                                        <i className='fa fa-pencil-square-o bg-yellow-500 hover:bg-yellow-700 p-2 rounded-full'></i>
                                    </Link>
                                    <button
                                        onClick={() => {
                                            if (confirm("Are you sure you want to delete this user?"))
                                            { handleClick(user.id); }
                                        }}>
                                        <i className='fa fa-trash bg-red-500 hover:bg-red-700 p-2 rounded-full'></i>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

            </div>
        </div>
    )
}

export default Home 