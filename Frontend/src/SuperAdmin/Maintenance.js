import React, { useEffect, useState } from 'react';
import NavBar from './SuperAdminNavbar';
import './SuperAdminStyles/Maintenance.css';
import './SuperAdminStyles/SuperAdminPage.css';

export default function MaintenanceCRUD() {

    const [maintenances, setMaintenances] = useState([]);
    const [maintEditID, setEditID] = useState();
    // const { aircraftID, scheduledDate, description } = formData;


    useEffect(() => {
        const fetchMaintenances = async () => {
            try {
                const maintResponse = await fetch('/maintenance');
                const maintData = await maintResponse.json();
                setMaintenances(maintData);
            } catch (error) {
                console.error('Error fetching maintenances: ', error);
            }
        }

        fetchMaintenances();
    }, []);

    const handleFormChange = (e) => {

    }
    const handleAddMaintenance = (e) => {

    }
    const handleEditMaintenance = (index) => {

    }
    const handleDeleteMaintenance = (index) => {

    }

    return (
        <>

            <NavBar></NavBar>
            <div className='SATitle'>
                <h1>Maintenance Operations</h1>
                <h3>Create, Update or Delete</h3>
            </div>
            <div className='maintenanceContainer'>
                <table className='maintenanceTable'>
                    <th>
                        <td>Aircraft ID</td>
                        <td>Schedule Date</td>
                        <td>Description</td>
                        <td>Status</td>
                        <td>Actions</td>
                    </th>
                    {
                        maintenances.map((maint) => {
                            <tr>
                                <td>{maint.aircraftID}</td>
                                <td>{maint.scheduledDate}</td>
                                <td>{maint.description}</td>
                                <td>{maint.status}</td>
                                <td>
                                    <button className='edit-btn'>Edit</button>
                                    <button className='delete-btn'>Delete</button>
                                </td>
                            </tr>
                        })
                    }
                </table>
            </div>
        </>
    )
}