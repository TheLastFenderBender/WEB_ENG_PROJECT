import React, { useState } from 'react';
import RefundView from './RefundView';
import './ManageRefunds.css'; // Import the CSS module

const ManageRefunds = () => {
  // State to manage the active section in the refunds management
  const [activeSection, setActiveSection] = useState('RefundView');

  // Function to handle button clicks and switch between sections
  const handleButtonClick = (section) => {
    setActiveSection(section);
  };

  return (
    <div className="manage-refunds-container">
      {/* Heading for the Manage Refunds section */}
      <h3 className="manage-refunds-heading">Manage Refunds</h3>
      
      {/* Buttons to switch between different refunds management sections */}
      <div className="manage-refunds-buttons">
        <button onClick={() => handleButtonClick('RefundView')} className={activeSection === 'RefundView' ? 'active' : ''}>
          View Refund Records
        </button>
      </div>
      
      {/* Container to display the content based on the active section */}
      <div className="manage-refunds-content">
        {activeSection === 'RefundView' && <RefundView />}
      </div>
    </div>
  );
};

export default ManageRefunds;
