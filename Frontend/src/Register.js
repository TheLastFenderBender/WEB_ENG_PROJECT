import React, { useState } from 'react';
import './Register.css';
import fbImage from './Images/fb.png';
import googleImage from './Images/google.png';

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
                <label>
                    Name:
                    <input type="text" value={name} onChange={e => setName(e.target.value)} />
                </label>
                <label>
                    Username:
                    <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
                </label>
                <label>
                    Email:
                    <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
                </label>
                <label>
                    Password:
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
                </label>
                <label>
                    Retype Password:
                    <input type="password" value={retypePassword} onChange={e => setRetypePassword(e.target.value)} />
                </label>
                <label>
                    Gender:
                    <div className="gender-options">
                        <label className="radio-label">
                            Male
                            <input type="radio" name="gender" value="male" checked={gender === 'male'} onChange={() => setGender('male')} />
                        </label>
                        <label className="radio-label">
                            Female
                            <input type="radio" name="gender" value="female" checked={gender === 'female'} onChange={() => setGender('female')} />
                        </label>
                    </div>
                </label>

                <label>
                    Age:
                    <input type="text" value={age} onChange={e => setAge(e.target.value)} />
                </label>
                {/* <label>
                    Country Code:
                    <select value={countryCode} onChange={e => setCountryCode(e.target.value)}>
                        <option value="+92">+92 (Pakistan)</option>
                      
                    </select>
                </label> */}
                <label>
                    Mobile Number:
                    <input type="text" value={mobileNumber} onChange={e => setMobileNumber(e.target.value)} />
                </label>
                <input type="submit" value="Register" />
                <p>Already have an account? <a href="/login">Login</a></p>
                <div className="social-login">
                    <p>Create an Account using</p>
                    <a href="/login-with-facebook">
                        <img src={fbImage} alt="Facebook Icon" />
                    </a>
                    <a href="/login-with-google">
                        <img src={googleImage} alt="Facebook Icon" />
                    </a>
                </div>
            </form>
        </div>
    );
}

export default Register;
