import React from 'react';
import api from '../../api';
import { toast } from 'react-toastify';

const AddMansion = () => {

    const handleSubmit = async (e) => {
        e.preventDefault();
        const name = e.target.name.value;
        const location = e.target.location.value;
        const number_of_floor = e.target.floor.value;
        const mansion = { name, location, number_of_floor };

        try {
            const response = await api.post('/new-mansion', mansion);
            console.log('Response:', response.data.message);
            toast(response.data.message);
        } catch (error) {
            console.error('Error:', error);
        }

        e.target.name.value = '';
        e.target.location.value = '';
        e.target.floor.value = '';

    }
    return (
        <div className=' rounded-xl p-4 w-full lg:w-1/2 mt-16 mx-auto shadow-xl bg-base-100'>
            <h1 className='text-xl text-center font-semibold'>Create Your Mansion</h1>

            <div className="form-control w-full">
                <form onSubmit={handleSubmit}>
                    <label className="label font-semibold">
                        <span className="label-text">Mansion Name</span>
                    </label>
                    <input type="text" placeholder="mansion name" name='name' className="input input-bordered w-full" />

                    <label className="label mt-2 font-semibold">
                        <span className="label-text">Location</span>
                    </label>
                    <input type="text" placeholder="Location" name='location' className="input input-bordered w-full" />

                    <label className="label mt-2 font-semibold">
                        <span className="label-text">Number of Floor</span>
                    </label>
                    <input type="text" placeholder="Number of Floor" name='floor' className="input input-bordered w-full" />
                    <br /><br />
                    <div className="flex justify-center">
                        <button type='submit' className='btn bg-green-400 font-semibold'>Submit</button>
                    </div>
                </form>
            </div>

        </div >
    );
};

export default AddMansion;