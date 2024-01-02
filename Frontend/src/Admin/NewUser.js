// NewUser.js
import React, { useState } from 'react';
import './NewUser.css';
import { useNavigate } from 'react-router-dom';
import AuthNavBar from '../User/AuthNavBar'; 

const NewUser = () => {
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [retypePassword, setRetypePassword] = useState('');
    const [gender, setGender] = useState('male');
    const [age, setAge] = useState('');
    // const [countryCode, setCountryCode] = useState('+92'); 
    const [mobileNumber, setMobileNumber] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Additional validation for password match
        if (password !== retypePassword) {
            console.error('Passwords do not match');
            alert('Passwords do not match');
            return;
        }

        // Validate other fields
        if (!name || !username || !email || !gender || !age || !mobileNumber) {
            console.error('All fields are required');
            alert('All fields are required');
            return;
        }

        try {

            const firstLetter = name.charAt(0);
            const response = await fetch('http://localhost:3000/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name,
                    username,
                    email,
                    password,
                    gender,
                    age,
                    mobileNumber,
                    retypePassword,
                    firstLetter,
                }),
            });

            await response.json();

            if (response.status === 409) {
                alert('User already exists with this username or email');
                return;
            }

            navigate('/AdminPage');
        } catch (error) {
            console.error('Error:', error);
        }

    };

    return (
        <div>
            <AuthNavBar />
            <form className='register-form' onSubmit={handleSubmit}>
                <h1>Add New User</h1>
                <div className="form-group">
                    <label>Name:</label>
                    <input type="text" value={name} onChange={e => setName(e.target.value)} />
                </div>
                <div className="form-group">
                    <label>Username:</label>
                    <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
                </div>
                <div className="form-group">
                    <label>Email:</label>
                    <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
                </div>
                <div className="form-group">
                    <label>Password:</label>
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
                </div>
                <div className="form-group">
                    <label>Retype Password:</label>
                    <input type="password" value={retypePassword} onChange={e => setRetypePassword(e.target.value)} />
                </div>
                <div className="form-group">
                    <label>Gender:</label>
                    <div className="gender-options">
                        <label className="radio-label">
                            <input type="radio" name="gender" value="male" checked={gender === 'male'} onChange={() => setGender('male')} />
                            Male
                        </label>
                        <label className="radio-label">

                            <input type="radio" name="gender" value="female" checked={gender === 'female'} onChange={() => setGender('female')} />
                            Female
                        </label>
                    </div>
                </div>
                <div className="form-group">
                    <label>Age:</label>
                    <input type="text" value={age} onChange={e => setAge(e.target.value)} />
                </div>
                <div className="form-group">
                    <label>Mobile Number:</label>
                    <input type="text" value={mobileNumber} onChange={e => setMobileNumber(e.target.value)} />
                </div>
                <button type="submit">Register User</button>
                </form>

        </div>
    );
}

export default NewUser;

