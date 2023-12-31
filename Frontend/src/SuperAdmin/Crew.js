import React, { useState, useEffect } from 'react';
import NavBar from './SuperAdminNavbar';
import './SuperAdminStyles/Crew.css';
import './SuperAdminStyles/SuperAdminPage.css';

export default function CrewCRUD() {

    const [crewMembers, setCrewMembers] = useState([]);
    const [editCrewID, setEditCrewID] = useState();

    useEffect(() => {
        const fetchCrewMembers = async () => {
            try {
                const crewResponse = await fetch('/crew');
                const crewMemberData = await crewResponse.json();
                setCrewMembers(crewMemberData);
            } catch (error) {
                console.error('Error fetching crew members: ', error);
            }
        }
        fetchCrewMembers();

    }, []);


    const handleFormChange = (e) => {

    }
    const handleAddCrew = (e) => {

    }
    const handleEditCrew = (index) => {

    }
    const handleDeleteCrew = (index) => {

    }

    return (
        <>
            <NavBar></NavBar>
            <div className='SATitle'>
                <h1>Crew Operations</h1>
                <h3>Create, Update or Delete</h3>
            </div>
            <div className='crewContainer'>
                <table>
                    <th>
                        <td>Name</td>
                        <td>Position</td>
                        <td>Flight Assignment</td>
                        <td>Actions</td>
                    </th>
                    {
                        crewMembers.map((crew) => {
                            <tr>
                                <td>{crew.name}</td>
                                <td>{crew.position}</td>
                                <td>{crew.flightAssignments}</td>
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