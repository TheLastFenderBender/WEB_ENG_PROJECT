import React, { useState } from 'react';
import NavBar from './SuperAdminNavbar';

export default function MaintenanceCRUD() {

    return (
        <>

            <NavBar></NavBar>
            <div className='SATitle'>
                <h1>Maintenance Operations</h1>
                <h3>Create, Update or Delete</h3>
            </div>
            <div className='maintenanceContainer'>

            </div>
        </>
    )
}