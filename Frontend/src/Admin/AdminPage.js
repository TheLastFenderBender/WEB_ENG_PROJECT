import React, { useState } from 'react';
import ManageUsers from "./ManageUser"
import ManageRefunds from './ManageRefunds';
import ManageBookings from './ManageBookings';
import AuthNavBar from '../AuthNavBar'; 
import styles from "./AdminPage.module.css"

const AdminPage = () => {
  // State to manage the active option in the sidebar
  const [activeOption, setActiveOption] = useState(''); 

  // Function to render the selected option content
  const renderOption = () => {
    switch (activeOption) {
      case 'ManageUsers':
        return <ManageUsers />;
      case 'ManageRefunds':
        return <ManageRefunds />;
      case 'ManageBookings':
        return <ManageBookings />;
      default:
        return null;
    }
  };

  return (
    <div>
      {/* Navigation bar for authentication */}
      <AuthNavBar />

      {/* Main container for admin dashboard */}
      <div className={styles.mainContainer}>
        {/* Sidebar for admin options */}
        <div className={styles.sidebarAdmin}>
          <div className={styles.heading}>Admin Dashboard</div>  
          
          {/* Buttons to switch between admin options */}
          <div className={styles.buttonContainer}>
            <div className={styles.buttonDiv} onClick={() => setActiveOption('ManageUsers')}>Manage Users</div>
            <div className={styles.buttonDiv} onClick={() => setActiveOption('ManageRefunds')}>Manage Refunds</div>
            <div className={styles.buttonDiv} onClick={() => setActiveOption('ManageBookings')}>Manage Bookings</div>
          </div>
        </div>
          
        {/* Container for the selected admin option content */}
        <div className={styles.miniContainer}>
          {renderOption()}
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
