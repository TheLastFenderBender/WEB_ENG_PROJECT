import React, { useState } from 'react';
import BookingView from './BookingView';
import CreateBooking from './CreateBooking';
import BookingReport from './BookingReport';

const ManageBookings = () => {
  const [activeSection, setActiveSection] = useState('viewBookings');

  const handleButtonClick = (section) => {
    setActiveSection(section);
  };

  return (
    <div>
      <h3>Manage Bookings</h3>
      <div>
        <button onClick={() => handleButtonClick('viewBookings')}>View Bookings</button>
        {/* <button onClick={() => handleButtonClick('updateBookingInformation')}>Update Booking Information</button> */}
        {/* <button onClick={() => handleButtonClick('cancelBooking')}>Cancel Booking</button> */}
        <button onClick={() => handleButtonClick('createBooking')}>Create Booking</button>
        <button onClick={() => handleButtonClick('generateBookingReports')}>Generate Booking Reports</button>
      </div>
    <div>
        {activeSection === 'viewBookings' && <BookingView />}
        {/* {activeSection === 'updateBookingInformation' && <BookingUpdate />} */}
        {/* {activeSection === 'cancelBooking' && <BookingCancel />} */}
        {activeSection === 'createBooking' && <CreateBooking />}
        {activeSection === 'generateBookingReports' && <BookingReport />}
      </div>
    </div>
  );
};

export default ManageBookings;
