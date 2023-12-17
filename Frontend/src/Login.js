import React, { useState } from 'react';
import './Login.css';
import fbImage from './Images/fb.png';
import googleImage from './Images/google.png';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [selectedRole, setSelectedRole] = useState('user'); // Default role is 'user'


    const handleSubmit = (event) => {
        event.preventDefault();

        // Include selectedRole in the login request payload
        const loginData = {
            username,
            password,
            role: selectedRole,
        };

        fetch('http://localhost:3000/login',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(loginData),
            })
            .then(response => response.json())
            .then(data => {
                localStorage.removeItem('token');
                localStorage.setItem('token', data.token);
                console.log(data.token);
                localStorage.setItem('username', username);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    return (
        <div className='login-form'>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                {/* Dropdown for role selection */}
                <div className="role-dropdown">
                    <label>
                        Role:
                        <select value={selectedRole} onChange={(e) => setSelectedRole(e.target.value)}>
                            <option value="user">User</option>
                            <option value="admin">Admin</option>
                            <option value="superadmin">Super Admin</option>
                        </select>
                    </label>
                </div>

                <label>
                    Username:
                    <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
                </label>
                <label>
                    Password:
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
                </label>
                <a href="/forgot-password">Forgot Password?</a>
                <div className="login-options">
                    <div>
                        <input type="submit" value="Login" />

                    </div>
                    <div>
                        <p>Not a member yet? <a href="/register">Sign up</a></p>
                    </div>
                    <div className="social-login">
                        <p>Or login with:</p>
                        <a href="/login-with-facebook">
                            <img src={fbImage} alt="Facebook Icon" />
                        </a>
                        <a href="/login-with-google">
                            <img src={googleImage} alt="Facebook Icon" />
                        </a>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default Login;
