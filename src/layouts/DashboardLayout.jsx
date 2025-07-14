import React from 'react';
import { Outlet } from 'react-router';
import Sidebar from '../Pages/dashboard/Sidebar';


const DashboardLayout = () => {
    return (
        <div className='w-11/12 mx-auto grid grid-cols-4 my-8'>
            <div className='col-span-1'>
                <Sidebar></Sidebar>
            </div>

         <div className='col-span-3'>   <Outlet></Outlet></div>
        </div>
    );
};

export default DashboardLayout;