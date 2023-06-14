import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

const menuItems = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/dashboard', label: 'Dashboard' },
];


const Navbar = () => {

    const [showMenus, setShowMenus] = useState(false);
    const handleShowMenu = () => {
        setShowMenus(!showMenus);
    }

    return (
        <div>
            {showMenus && console.log(showMenus)}

            <div className="navbar bg-green-400 text-base-200 z-10 font-semibold">
                <div className="navbar-start">
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost lg:hidden" onClick={handleShowMenu}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                        <ul tabIndex={0} className={`menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 z-10 ${showMenus ? 'block' : 'hidden'}`}>
                            {/* {menuItems} */}
                            {menuItems.map((item, index) => (
                                <li key={index}>
                                    <NavLink
                                        to={item.path}
                                        className={({ isActive }) => isActive ? "active" :
                                            ""}

                                        onClick={handleShowMenu}
                                    >
                                        {item.label}
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <a className="btn btn-ghost normal-case text-2xl">MMS</a>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1 text-lg ">
                        {/* {menuItems} */}
                        {menuItems.map((item, index) => (
                            <li key={index}>
                                <NavLink
                                    to={item.path}
                                    className={({ isActive }) => isActive ? "active" : ""}
                                >
                                    {item.label}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="navbar-end lg:hidden">
                    {window.location.pathname == '/dashboard' && <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden" >Dashboard</label>}
                </div>
            </div>
        </div>
    );
};

export default Navbar;