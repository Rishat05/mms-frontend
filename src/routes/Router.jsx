import {
    createBrowserRouter,
} from "react-router-dom";


import React from 'react';
import Main from "./Main";
import Home from "../components/Home/Home";
import Dashboard from "../components/dashboard/Dashboard";
import AddMansion from "../components/dashboard/AddMansion";
import RepairCost from "../components/dashboard/RepairCost";
import Mansions from "../components/dashboard/Mansions";

const Router = createBrowserRouter([
    {
        path: "/",
        element: <Main />,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: "/contact",
                element: <div>This is contact page</div>,
            },
            {
                path: "/about",
                element: <div>This is about page</div>,
            },

            {
                path: '/repair-cost/:id',
                element: <RepairCost />
            }

        ],
    },
    {
        path: '/dashboard',
        element: <Dashboard />,
        children: [
            {
                path: '/dashboard/add-mansion',
                element: <AddMansion />
            },
            {
                path: '/dashboard/mansions',
                element: <Mansions />
            }
        ]
    },
]);

export default Router;