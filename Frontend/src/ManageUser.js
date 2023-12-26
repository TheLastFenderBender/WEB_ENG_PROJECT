import React, { useState } from 'react';
import UserList from './UserList';
import NewUser from './NewUser';
import { useNavigate } from 'react-router-dom';

const ManageUser = () => {
  const [activeSection, setActiveSection] = useState('');
  const navigate = useNavigate();

  const handleButtonClick = (section) => {
    setActiveSection(section);
  };

  const handleNewUserClick = () => {
    navigate('/addNewUser');

  }

  return (
    <div>
      <h3>Manage Users</h3>
      <div>
        <button onClick={() => handleButtonClick('userList')}>View Users</button>
        <button onClick={handleNewUserClick}>Add New User</button>
      </div>
      <div>
        {activeSection === 'userList' && <UserList />}
        {activeSection === 'newUser' && <NewUser />}
      </div>
    </div>
  );
};

export default ManageUser;
