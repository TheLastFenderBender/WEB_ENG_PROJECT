import React, { useState } from 'react';
import UserList from './UserList';
import NewUser from './NewUser';
import { useNavigate } from 'react-router-dom';
import './ManageUser.css';

const ManageUser = () => {
  const [activeSection, setActiveSection] = useState('');
  const navigate = useNavigate();

  const handleButtonClick = (section) => {
    setActiveSection(section);
  };

  const handleNewUserClick = () => {
    navigate('/NewUser');
  }

  return (
    <div className="manage-user-container">
      <h3 className="manage-user-heading">Manage Users</h3>
      <div className="manage-user-buttons">
        <button
          onClick={() => handleButtonClick('userList')}
          className={activeSection === 'userList' ? 'active' : ''}
        >
          View Users
        </button>
        <button
          onClick={handleNewUserClick}
          className={activeSection === 'NewUser' ? 'active' : ''}
        >
          Add New User
        </button>
      </div>
      <div className="manage-user-content">
        {activeSection === 'userList' && <UserList />}
        {activeSection === 'NewUser' && <NewUser />}
      </div>
    </div>
  );
};

export default ManageUser;
