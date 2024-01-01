import React, { useEffect, useState } from 'react';
import NavBar from './SuperAdminNavbar';
import './SuperAdminStyles/Maintenance.css';
import './SuperAdminStyles/SuperAdminPage.css';
import Axios from 'axios';

export default function MaintenanceCRUD() {

    const [maintenances, setMaintenances] = useState([]);
    const [maintEditID, setEditID] = useState();
    // const { aircraftID, scheduledDate, description } = formData;


    useEffect(() => {
        const fetchMaintenances = async () => {
            try {
                const maintResponse = await fetch('http://localhost:3000/maintenance');
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
    const handleAddCrew = (e) => {

    }
    const handleUpdateCrew = () => {

    }
    const handleEditCrew = (index) => {

    }
    const handleDeleteCrew = (index) => {

    }

    return (
        <>

            <NavBar></NavBar>
            <div className='SATitle'>
                <h1>Maintenance Operations</h1>
                <h3>Create, Update or Delete</h3>
            </div>
            <div className='maintenanceContainer'>
            <form onSubmit={handleAddCrew}>
                    <div className='maintFormItem'>
                        <label>Aircraft ID: </label>
                        <input></input>
                    </div>
                    <div className='maintFormItem'>
                        <label>Schedule Date: </label>
                        <input></input>
                    </div>
                    <div className='maintFormItem'>
                        <label>Description: </label>
                        <input></input>
                    </div>
                    <button type='submit' className='crewButton btn-primary'>Add</button>
                    <button type='submit' className='crewButton' onClick={() => {handleUpdateCrew()}}>Update</button>
                </form>
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