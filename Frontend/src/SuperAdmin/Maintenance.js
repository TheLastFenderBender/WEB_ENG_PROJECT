import React, { useEffect, useState } from 'react';
import NavBar from './SuperAdminNavbar';
import './SuperAdminStyles/Maintenance.css';
import './SuperAdminStyles/SuperAdminPage.css';
import Axios from 'axios';

export default function MaintenanceCRUD() {

    const [maintenances, setMaintenances] = useState([]);
    const [editMaintID, setEditMaintID] = useState();
    const [formData, setFormData] = useState({
        aircraftID: "",
        scheduledDate: "",
        description: ""
    });
    const [refresh, setRefresh] = useState(0);
    const [data, setData] = useState([]);
    const { aircraftID, scheduledDate, description } = formData;


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
        setFormData({ ...formData, [e.target.name]: e.target.value });
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
                        <label htmlFor="aircraftID">Aircraft ID: </label>
                        <input type='text' name='aircraftID'></input>
                    </div>
                    <div className='maintFormItem'>
                        <label htmlFor="scheduleDate">Schedule Date: </label>
                        <input type='date' name='scheduleDate'></input>
                    </div>
                    <div className='maintFormItem'>
                        <label htmlFor="desc">Description: </label>
                        <input type='text' name='desc'></input>
                    </div>
                    <button type='submit' className='crewButton btn-primary'>Add</button>
                    <button type='submit' className='crewButton' onClick={() => { handleUpdateCrew() }}>Update</button>
                </form>
                <table className='maintenanceTable'>

                    <th>Aircraft ID</th>
                    <th>Schedule Date</th>
                    <th>Description</th>
                    <th>Status</th>
                    <th>Actions</th>

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