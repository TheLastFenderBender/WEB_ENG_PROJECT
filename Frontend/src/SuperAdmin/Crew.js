import React, { useState, useEffect } from 'react';
import NavBar from './SuperAdminNavbar';
import './SuperAdminStyles/Crew.css';

export default function CrewCRUD() {

    const [crewMembers, setCrewMembers] = useState([]);

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


    }, []);

    return (
        <>
            <NavBar></NavBar>
            <div className='crewTitle'>
                <h1>Crew Operations</h1>
                <h3>Create, Update or Delete</h3>
            </div>
            <div className='crewContainer'>
                <div className='tableContainer'>
                    <table className='crewTable'>
                        <thead className='tableHeaders'>
                            <tr>
                                <td>ID</td>
                                <td>Name</td>
                                <td>Position</td>
                                <td>Assignments</td>
                                <td>Actions</td>
                            </tr>
                        </thead>
                    </table>
                </div>
            </div>
        </>
    )
}