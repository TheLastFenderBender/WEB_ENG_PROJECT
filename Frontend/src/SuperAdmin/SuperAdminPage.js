import { React, useState, useEffect } from 'react';
import Navbar from './SuperAdminNavbar';
import './SuperAdminStyles/SuperAdminPage.css';

export default function SuperAdminPage() {

    return (
        <>
            <Navbar></Navbar>
            <div className='SAContainer'>
                <div className='SATitle'>
                    <h1>SuperAdmin Controls</h1>
                    <h3>Crew and Maintenance Management</h3>
                </div>
                <div className='cardContainer'>
                    <div className='SACard'>
                        <h3>Crew Management</h3>
                        <p>View all current crew members registered into the system. Add new crew members. Update exisiting crew members. Delete crew members</p>

                    </div>
                    <div className='SACard'>
                        <h3>Maintenance Management</h3>
                        <p>View all current maintenance registered into the system. Add new maintenance. Update exisiting maintenance. Delete unwanted maintenance</p>

                    </div>
                    <div className='SACard'>
                        <h3>History</h3>
                        <p>View History of previous flights made. View history of all successful payments made from users.</p>

                    </div>
                    <div className='SACard'>
                        <h3>Feedback</h3>
                        <p>View Feedback about the experience users have had with the application and with flights that they have travelled on.</p>

                    </div>
                </div>
            </div>
        </>
    )
}