import React, { useState } from 'react';
import BookingView from './BookingView';
import BookingReport from './BookingReport';
import { useNavigate } from 'react-router-dom';
import './ManageBooking.css'; // Import the CSS module

const ManageBookings = () => {
  // State to manage the active section in the booking management
  const [activeSection, setActiveSection] = useState('');
  const navigate = useNavigate();

  // Function to handle button clicks and switch between sections
  const handleButtonClick = (section) => {
    setActiveSection(section);
  };

  

  return (
    <div className='manage-bookings-container'>
      {/* Heading for the Manage Bookings section */}
      <h3 className='manage-bookings-heading'>Manage Bookings</h3>

      {/* Buttons to switch between different booking management sections */}
      <div className='manage-bookings-buttons'>
        <button onClick={() => handleButtonClick('viewBookings')}
className='manage-bookings-content-button'>
          View Bookings
        </button>
        {/* Uncomment and add more buttons for additional features */}
        {/* <button onClick={() =>
handleButtonClick('updateBookingInformation')}>Update Booking
Information</button> */}
        {/* <button onClick={() =>
handleButtonClick('cancelBooking')}>Cancel Booking</button> */}
       
        <button onClick={() =>
handleButtonClick('generateBookingReports')}
className='manage-bookings-content-button'>
          Booking Report
        </button>
      </div>

      {/* Container to display the content based on the active section */}
      <div>
        {activeSection === 'viewBookings' && <BookingView />}
        {activeSection === 'generateBookingReports' && <BookingReport />}
      </div>
    </div>
  );
};

export default ManageBookings;