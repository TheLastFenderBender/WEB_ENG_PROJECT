import React, { useState, useEffect } from 'react';

const UpdateUser = ({ user }) => {
  const [updatedUser, setUpdatedUser] = useState({
    name: user.name,
    username: user.username,
    email: user.email,
    gender: user.gender || '',
    age: user.age || '',
    countryCode: user.countryCode || '',
    mobileNumber: user.mobileNumber || '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleUpdateUser = async () => {
    try {
      const response = await fetch(`YOUR_BACKEND_API_ENDPOINT/users/${user._id}`, {
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

  return (
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
        <button type="button" onClick={handleUpdateUser}>
          Update User
        </button>
      </form>
    </div>
  );
};

export default UpdateUser;
