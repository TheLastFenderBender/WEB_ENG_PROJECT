import React, { useState } from 'react';
import './Register.css';
import fbImage from './Images/fb.png';
import googleImage from './Images/google.png';
// import { useNavigate } from 'react-router-dom';
// import { Link } from 'react-router-dom';

const Register = () => {
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [retypePassword, setRetypePassword] = useState('');
    const [gender, setGender] = useState('male');
    const [age, setAge] = useState('');
    // const [countryCode, setCountryCode] = useState('+92'); // Default value for Pakistan
    const [mobileNumber, setMobileNumber] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();

        // Additional validation for password match
        if (password !== retypePassword) {
            console.error('Passwords do not match');
            return;
        }

        fetch('http://localhost:3000/register', {
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
                // countryCode,
                mobileNumber,
            }),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    return (
        <div>
            <form className='register-form' onSubmit={handleSubmit}>
                <h1>Sign Up</h1>
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
                {/* include country code */}
                {/* <div className="form-group">
        <label>Country Code:</label>
        <select value={countryCode} onChange={e => setCountryCode(e.target.value)}>
            <option value="+92">+92 (Pakistan)</option>
            {/* Add more options as needed */}
                {/* </select>
    </div> */}
                <div className="form-group">
                    <label>Mobile Number:</label>
                    <input type="text" value={mobileNumber} onChange={e => setMobileNumber(e.target.value)} />
                </div>
                <button type="submit">Register</button>
                <p style={{ marginTop: '10px' }}>Already have an account?<a href="./login">Login!</a></p>
                <div className="social-login">
                    <p>Create an Account using</p>
                    <a href="/login-with-facebook">
                        <img src={fbImage} alt="Facebook Icon" />
                    </a>
                    <a href="/login-with-google">
                        <img src={googleImage} alt="Google Icon" />
                    </a>
                </div>
            </form>

        </div>
    );
}

export default Register;
