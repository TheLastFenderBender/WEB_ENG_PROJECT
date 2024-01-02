import React, { useState } from 'react';
import './Login.css';
import fbImage from '../Images/fb.png';
import googleImage from '../Images/google.png';
import { useNavigate } from 'react-router-dom';
import AuthNavBar from './AuthNavBar';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [selectedRole, setSelectedRole] = useState('user'); // Default role is 'user'

    const emailInputStyle = { marginLeft: '38px' };
    const passwordInputStyle = { marginLeft: '12px' };
    const roleInputStyle = { marginLeft: '45px', Width: '250px' };
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        // Check if username and password are provided
        if (!email || !password) {
            alert('Please enter both email and password.');
            return;
        }

        const loginData = {
            email,
            password,
            role: selectedRole,
        };

        fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(loginData),
        })
            .then(response => {
                if (!response.ok) {
                    if (response.status === 401) {
                        alert('Invalid email or password.'); // Alert for wrong credentials
                    } else {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }
                }
                return response.json();
            })
            .then(data => {
                if (!data.token) {
                    alert('User does not exist or invalid credentials.');
                    return;
                }

                // Redirect based on the selected role
                if (selectedRole === 'user') {
                    navigate('/UserDashBoard');
                } else if (selectedRole === 'admin') {
                    navigate('/AdminPage');
                } else if (selectedRole === 'superadmin') {
                    navigate('/superadmin');
                } else if (selectedRole === 'flight manager') {
                    navigate('/flightmanager');
                }

                // navigate('/UserDashBoard');
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    return (
        <>
            <AuthNavBar />
            <div className='login-form'>
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="label-input-group">
                        <label>Role:</label>
                        <select
                            value={selectedRole}
                            onChange={(e) => setSelectedRole(e.target.value)}
                            style={roleInputStyle}
                        >
                            <option value="user">User</option>
                            <option value="admin">Admin</option>
                            <option value="superadmin">Super Admin</option>
                            <option value="flight manager">Flight Manager</option>
                        </select>
                    </div>

                    <div className="label-input-group">
                        <label>Email:</label>
                        <input
                            type="text"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            style={emailInputStyle}
                        />
                    </div>

                    <div className="label-input-group">
                        <label>Password:</label>
                        <input
                            type="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            style={passwordInputStyle}
                        />
                    </div>

                    <a href="/forgot-password" className="forgot-password">Forgot Password?</a>

                    <div className="login-options gap-between-options">
                        <div>
                            <button type="submit">Login</button>
                        </div>
                        <div>
                            <p>Not a member yet? <a href="/">Sign up</a></p>
                        </div>
                        <div className="social-login">
                            <p>Or login with</p>
                            <a href="/login-with-facebook">
                                <img src={fbImage} alt="Facebook Icon" />
                            </a>
                            <a href="/login-with-google">
                                <img src={googleImage} alt="Google Icon" />
                            </a>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
}

export default Login;

