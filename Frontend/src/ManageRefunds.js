import React, { useState } from 'react';
import RefundView from './RefundView';

const ManageRefunds = () => {
  const [activeSection, setActiveSection] = useState('RefundView');

  const handleButtonClick = (section) => {
    setActiveSection(section);
  };

  return (
    <div>
      <h3>Manage Refunds</h3>
      <div>
        <button onClick={() => handleButtonClick('RefundView')}>View Refund Records</button>
      </div>
      <div>
        {activeSection === 'RefundView' && <RefundView />}
      </div>
    </div>
  );
};

export default ManageRefunds;
