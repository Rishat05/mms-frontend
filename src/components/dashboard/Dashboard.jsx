import React, { useState } from 'react';
import Navbar from '../Shared/Navbar';
import { Link, NavLink, Outlet } from 'react-router-dom';

const Dashboard = () => {


    const menuItems = [
        {
            label: 'AddMansion',
            path: '/dashboard/add-mansion',
        },
        {
            label: 'Mansions',
            path: '/dashboard/mansions',
        },

    ];


    return (
        <div>
            <Navbar />
            <div className={`drawer lg:drawer-open`}>
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col">
                    {/* Page content here */}
                    <Outlet />

                </div>
                <div className="drawer-side">
                    <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                    <ul className={`menu p-4 lg:w-80 w-32 h-full bg-[#042955] text-base-content pt-5`} >
                        {/* Sidebar content here */}
                        {/* {menuItems} */}

                        {menuItems.map((item, index) => (
                            <li key={index} className='my-1 text-base-200'>
                                <NavLink
                                    to={item.path}
                                >
                                    {item.label}
                                </NavLink>
                            </li>
                        ))}
                    </ul>

                </div>
            </div>
        </div>
    );
};

export default Dashboard;