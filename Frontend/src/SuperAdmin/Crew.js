import React, { useState, useEffect } from 'react';
import NavBar from './SuperAdminNavbar';
import './SuperAdminStyles/Crew.css';
import './SuperAdminStyles/SuperAdminPage.css';
import Axios from 'axios';

export default function CrewCRUD() {

    const [crewMembers, setCrewMembers] = useState([]);
    const [editCrewID, setEditCrewID] = useState();
    const [formData, setFormData] = useState({
        name: "",
        position: "",
        flightAssignments: ""
    });
    const [refresh, setRefresh] = useState(0);
    const [data, setData] = useState([]);
    const { name, position, flightAssignments } = formData;

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
                <h1>Crew Operations</h1>
                <h3>Create, Update or Delete</h3>
            </div>
            <div className='crewContainer'>
                <form onSubmit={handleAddCrew}>
                    <div className='crewFormItem'>
                        <label>Crew Name: </label>
                        <input></input>
                    </div>
                    <div className='crewFormItem'>
                        <label>Position: </label>
                        <input></input>
                    </div>
                    <div className='crewFormItem'>
                        <label>Flight Assignments: </label>
                        <input></input>
                    </div>
                    <button type='submit' className='crewButton btn-primary'>Add</button>
                    <button type='submit' className='crewButton' onClick={() => { handleUpdateCrew() }}>Update</button>
                </form>
                <table className='crewTable'>

                    <th>Name</th>
                    <th>Position</th>
                    <th>Flight Assignment</th>
                    <th>Actions</th>

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