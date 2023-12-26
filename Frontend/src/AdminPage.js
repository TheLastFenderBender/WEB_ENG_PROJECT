import React, { useState } from 'react';
import ManageUsers from "./ManageUser"
import ManageRefunds from './ManageRefunds';
import ManageBookings from './ManageBookings';
import AuthNavBar from './AuthNavBar'; 
import styles from "./AdminPage.module.css"

const AdminPage = () => {
  const [activeOption, setActiveOption] = useState(''); 

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
      <AuthNavBar />
    <div className={styles.mainContainer}>
        <div className={styles.sidebarAdmin}>
          <div className={styles.heading}>Admin Dashboard</div>  
            <div className={styles.buttonContainer}>
              <div  className={styles.buttonDiv} onClick={() => setActiveOption('ManageUsers')}>Manage Users</div>
              <div  className={styles.buttonDiv} onClick={() => setActiveOption('ManageRefunds')}>Manage Refunds</div>
              <div  className={styles.buttonDiv} onClick={() => setActiveOption('ManageBookings')}>Manage Bookings</div>
            </div>
        </div>
          
        <div className={styles.miniContiner}>
          {renderOption()}
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
