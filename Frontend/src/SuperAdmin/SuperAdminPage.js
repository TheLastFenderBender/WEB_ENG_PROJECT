import { React, useState, useEffect } from 'react';
import Navbar from './SuperAdminNavbar';
import './SuperAdminStyles/SuperAdminPage.css';

export default function SuperAdminPage() {

    const [crewCount, setCrewCount] = useState(0);
    const [maintenanceCount, setMaintenanceCount] = useState(0);
    const [flightCount, setFlightCount] = useState(0);

    useEffect(() => {
        const fetchCounts = async () => {
            try {
                const crewResponse = await fetch('http://localhost:3000/crew/count');
                const crewData = await crewResponse.json();
                setCrewCount(crewData.count);

                const maintenanceResponse = await fetch('http://localhost:3000/maintenance/count');
                const maintenanceData = await maintenanceResponse.json();
                setMaintenanceCount(maintenanceData.count);

                const flightResponse = await fetch('http://localhost:3000/flights/count');
                const flightData = await flightResponse.json();
                setFlightCount(flightData.count);
            } catch (error) {
                console.error('Error fetching counts:', error);
            }
        };

        fetchCounts();
    }, []);


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
                        <h4>Crew: {crewCount}</h4>
                        
                    </div>
                    <div className='SACard'>
                        <h3>Maintenance Management</h3>
                        <p>View all current maintenance registered into the system. Add new maintenance. Update exisiting maintenance. Delete unwanted maintenance</p>
                        <h4>Maintenances: {maintenanceCount}</h4>

                    </div>
                    <div className='SACard'>
                        <h3>History</h3>
                        <p>View History of previous flights made. View history of all successful payments made from users.</p>
                        <h4>Flights: {flightCount}</h4>
                    </div>
                </div>
            </div>
        </>
    )
}