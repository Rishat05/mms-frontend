import React, { useEffect, useState } from 'react';
import api from '../../api';
import Loading from '../Shared/Loading';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import { RiDeleteBin5Line } from 'react-icons/ri';

const Mansions = () => {
    const [mansions, setMansion] = useState();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        const fetchData = async () => {
            try {
                const response = await api.get('/mansions');
                setMansion(response.data.data);
                setLoading(false);
            } catch (error) {
                console.error('Error:', error);
                setLoading(false);
            }
        };
        fetchData();
    }, [])

    if (loading) {
        return <Loading />;
    }


    const handleDelete = async (slug) => {
        try {
            const confirmResult = await Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this mansion!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!",
            });

            if (confirmResult.isConfirmed) {
                const response = await api.delete(`/mansions/${slug}`);
                // console.log('Response:', response.data);
                Swal.fire("Deleted!", "Mansion has been deleted.", "success");
                setMansion(prevMansions => prevMansions.filter(mansion => mansion.slug !== slug));
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }
    // { mansions && console.log(mansions.length) }

    return (
        <div className='m-4'>
            <h1 className='text-2xl text-center font-semibold my-5'>Our Mansions</h1>
            <div className="overflow-x-auto">
                <table className="table">
                    <thead className='bg-gray-200 text-lg '>
                        <tr>
                            <th></th>
                            <td>Name</td>
                            <td>location</td>
                            <td>Number Of Floor</td>
                            <th>Repair Cost</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            mansions?.map((mansion, index) => <tr key={mansion.id} className='mansion-row'>
                                <th>{index + 1}</th>
                                <td>{mansion.name}</td>
                                <td>{mansion.location}</td>
                                <td>{mansion.number_of_floor}</td>
                                <td><Link to={`/repair-cost/${mansion.slug}`}><button className='bg-green-400'>Show</button></Link></td>
                                <td><p className=' text-red-600 text-base-200 cursor-pointer ' onClick={() => handleDelete(mansion.slug)}><RiDeleteBin5Line className='h-12 w-8' /></p></td>
                            </tr>)
                        }
                    </tbody>

                </table>
            </div>
        </div>
    );
};

export default Mansions;