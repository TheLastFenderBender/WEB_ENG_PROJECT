import React, { useState, useEffect } from 'react';
// import UpdateUser from './UpdateUser';
import Modal from "react-modal";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState({});

  const [searchTerm, setSearchTerm] = useState('');
  const [updatedUser, setUpdatedUser] = useState({});
 
  useEffect(() => {
    // Fetch the list of users from the backend API
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:3000/getUsers');
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, [users]);

  const handleDeleteUser = async (userId) => {
    try {
      // deleteUser/:id
      const response = await fetch(`http://localhost:3000/deleteUser/${userId._id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // Handle successful deletion
        console.log('User deleted successfully');
        setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
      } else {
        console.error('Failed to delete user');
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleUpdateUserClick = async () => {
    try {
      console.log("Save button clicked!");
      closeModal(); // Close the modal after saving
      const response = await fetch(`http://localhost:3000/updateUser/${updatedUser._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedUser),
      });

      if (response.ok) {
        // Handle successful update
        console.log('User updated successfully');
      } else {
        console.error('Failed to update user');
      }
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleUpdateUser = (user) => {
    setUpdatedUser(user);
    setSelectedUser(user);
    setModalIsOpen(true);
  };

  
  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleSave = () => {
    console.log("Save button clicked!");
    closeModal(); // Close the modal after saving
  };
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h4>User List</h4>
      <div>
        <label>Search by Name/Username: </label>
        <input type="text" value={searchTerm} onChange={handleSearch} />
      </div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Username</th>
            <th>Email</th>
            <th>Blocked</th>
            <th>Gender</th>
            <th>Age</th>
            <th>Country Code</th>
            <th>Mobile Number</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.blocked ? 'Yes' : 'No'}</td>
              <td>{user.gender}</td>
              <td>{user.age}</td>
              <td>{user.countryCode}</td>
              <td>{user.mobileNumber}</td>
              <td>
                <button onClick={() => handleUpdateUser(user)}>Update</button>
                <button onClick={() => handleDeleteUser(user)}>Delete</button>
              </td>
            </tr>
          ))}
           <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
        style={{ zIndex: 1000 }}
      >

<div>
      <h4>Update User</h4>
      <form>
        <label>
          Name:
          <input type="text" name="name" value={updatedUser.name} onChange={handleInputChange} />
        </label>
        <br />
        <label>
          Username:
          <input type="text" name="username" value={updatedUser.username} onChange={handleInputChange} />
        </label>
        <br />
        <label>
          Email:
          <input type="text" name="email" value={updatedUser.email} onChange={handleInputChange} />
        </label>
        <br />
        <label>
          Gender:
          <input type="text" name="gender" value={updatedUser.gender} onChange={handleInputChange} />
        </label>
        <br />
        <label>
          Age:
          <input type="text" name="age" value={updatedUser.age} onChange={handleInputChange} />
        </label>
        <br />
        <label>
          Country Code:
          <input type="text" name="countryCode" value={updatedUser.countryCode} onChange={handleInputChange} />
        </label>
        <br />
        <label>
          Mobile Number:
          <input type="text" name="mobileNumber" value={updatedUser.mobileNumber} onChange={handleInputChange} />
        </label>
        <br />
        <button type="button" onClick={handleUpdateUserClick}>
          Update User
        </button>
      </form>
    </div>
        
       </Modal>
        </tbody>
      </table>
      {/* {selectedUser && <UpdateUser user={selectedUser} />} */}
    </div>
  );
};

export default UserList;
