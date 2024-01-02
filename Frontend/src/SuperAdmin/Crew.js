import React, { useState, useEffect } from 'react';
import NavBar from './SuperAdminNavbar';
import './SuperAdminStyles/Crew.css';
import './SuperAdminStyles/SuperAdminPage.css';
import Axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';

export default function CrewCRUD() {

    const [crewMembers, setCrewMembers] = useState([]);
    const [crewID, setCrewID] = useState();
    const [formData, setFormData] = useState({
        name: "",
        position: "",
        flightAssignment: ""
    });
    const [refresh, setRefresh] = useState(0);
    const { name, position, flightAssignment } = formData;

    useEffect(() => {
        const fetchCrewMembers = async () => {
            try {
                const crewResponse = await fetch('http://localhost:3000/crew');
                const crewMemberData = await crewResponse.json();
                setCrewMembers(crewMemberData);
            } catch (error) {
                console.error('Error fetching crew members: ', error);
            }
        }
        fetchCrewMembers();

    }, [refresh]);

    const handleIDChange = (e) => {
        setCrewID(e.target.value);
    }

    const handleFormChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleAddCrew = async (e) => {
        e.preventDefault();
        try {
            const response = await Axios.post('http://localhost:3000/crew', formData);
            setRefresh(refresh + 1);
        } catch (error) {
            console.error('Error adding crew member: ', error);
        }
    }

    const handleUpdateCrew = async () => {
        try {
            const response = await Axios.put(`http://localhost:3000/crew/${crewID}`, formData);
            setRefresh(refresh + 1);
        } catch (error) {
            console.error('Error updating crew member: ', error);
        }
    }

    const handleDeleteCrew = async (id) => {
        try {
            const response = await Axios.delete(`http://localhost:3000/crew/${id}`);
            setRefresh(refresh + 1);
        } catch (error) {
            console.error('Error deleting crew member: ', error);
        }
    }

    return (
        <>
            <NavBar></NavBar>
            <div className='SATitle'>
                <h1>Crew Operations</h1>
                <h3>Create, Update or Delete</h3>
            </div>
            <div className='crewContainer'>
                <form onSubmit={handleAddCrew}>
                    <div className='crewFormItem'>
                        <label htmlFor='id'>ID: </label>
                        <input type='text' name='id' value={crewID} onChange={handleIDChange}></input>
                    </div>
                    <div className='crewFormItem'>
                        <label htmlFor='name'>Crew Name: </label>
                        <input type='text' name='name' value={name} onChange={handleFormChange}></input>
                    </div>
                    <div className='crewFormItem'>
                        <label htmlFor='position'>Position: </label>
                        <input type='text' name='position' value={position} onChange={handleFormChange}></input>
                    </div>
                    <div className='crewFormItem'>
                        <label htmlFor='flightAssignment'>Flight Assignments: </label>
                        <input type='text' name='flightAssignment' value={flightAssignment} onChange={handleFormChange}></input>
                    </div>
                    <button type='submit' className='crewButton btn-primary'>Add</button>
                    <button type='button' className='crewButton' onClick={handleUpdateCrew}>Update</button>
                </form>
                <TableContainer component={Paper}>
                    <Table className='crewTable' aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>Position</TableCell>
                                <TableCell>Flight Assignment</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                crewMembers.map((crew) => {
                                    return (
                                        <TableRow key={crew.id}>
                                            <TableCell>{crew.name}</TableCell>
                                            <TableCell>{crew.position}</TableCell>
                                            <TableCell>{crew.flightAssignment}</TableCell>
                                            <TableCell>
                                                <Button variant="contained" color="secondary" onClick={() => handleDeleteCrew(crew.id)}>Delete</Button>
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