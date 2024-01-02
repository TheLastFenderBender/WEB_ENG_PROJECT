import React, { useEffect, useState } from 'react';
import NavBar from './SuperAdminNavbar';
import './SuperAdminStyles/Maintenance.css';
import './SuperAdminStyles/SuperAdminPage.css';
import Axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';

export default function MaintenanceCRUD() {

    const [maintenances, setMaintenances] = useState([]);
    const [maintID, setMaintID] = useState();
    const [formData, setFormData] = useState({
        aircraftID: "",
        scheduledDate: "",
        description: ""
    });
    const [refresh, setRefresh] = useState(0);
    const { aircraftID, scheduledDate, description } = formData;

    useEffect(() => {
        const fetchMaintenances = async () => {
            try {
                const maintResponse = await Axios.get('http://localhost:3000/maintenance');
                setMaintenances(maintResponse.data);
            } catch (error) {
                console.error('Error fetching maintenances: ', error);

            }
        }

        fetchMaintenances();
    }, [refresh]);

    const handleIdChange = (e) => {
        setMaintID(e.target.value);
    }

    const handleFormChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleAddMaintenance = async (e) => {
        e.preventDefault();
        try {
            await Axios.post('http://localhost:3000/maintenance', formData);
            setRefresh(refresh + 1);
        } catch (error) {
            console.error('Error adding maintenance: ', error);
        }
    }

    const handleUpdateMaintenance = async () => {
        try {
            await Axios.put(`http://localhost:3000/maintenance/${maintID}`, formData);
            setRefresh(refresh + 1);
        } catch (error) {
            console.error('Error updating maintenance: ', error);
        }
    }

    const handleDeleteMaintenance = async (id) => {
        try {
            await Axios.delete(`http://localhost:3000/maintenance/${id}`);
            setRefresh(refresh + 1);
        } catch (error) {
            console.error('Error deleting maintenance: ', error);
        }
    }

    return (
        <>
            <NavBar></NavBar>
            <div className='SATitle'>
                <h1>Maintenance Operations</h1>
                <h3>Create, Update or Delete</h3>
            </div>
            <div className='maintenanceContainer'>
                <form onSubmit={handleAddMaintenance}>
                    <div className='maintFormItem'>
                        <label htmlFor="maintID">Maintenance ID: </label>
                        <input type='text' name='maintID' value={maintID} onChange={handleIdChange}></input>
                    </div>
                    <div className='maintFormItem'>
                        <label htmlFor="aircraftID">Aircraft ID: </label>
                        <input type='text' name='aircraftID' value={aircraftID} onChange={handleFormChange}></input>
                    </div>
                    <div className='maintFormItem'>
                        <label htmlFor="scheduledDate">Schedule Date: </label>
                        <input type='date' name='scheduledDate' value={scheduledDate} onChange={handleFormChange}></input>
                    </div>
                    <div className='maintFormItem'>
                        <label htmlFor="description">Description: </label>
                        <input type='text' name='description' value={description} onChange={handleFormChange}></input>
                    </div>
                    <button type='submit' className='crewButton btn-primary'>Add</button>
                    <button type='button' className='crewButton' onClick={handleUpdateMaintenance}>Update</button>
                </form>
                <TableContainer component={Paper}>
                    <Table className='maintenanceTable' aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Aircraft ID</TableCell>
                                <TableCell>Schedule Date</TableCell>
                                <TableCell>Description</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                maintenances.map((maint) => {
                                    return (
                                        <TableRow key={maint._id}>
                                            <TableCell>{maint.aircraftID}</TableCell>
                                            <TableCell>{maint.scheduledDate}</TableCell>
                                            <TableCell>{maint.description}</TableCell>
                                            <TableCell>{maint.status}</TableCell>
                                            <TableCell>
                                                <Button variant="contained" color="secondary" onClick={() => handleDeleteMaintenance(maint.id)}>Delete</Button>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </>
    )
}