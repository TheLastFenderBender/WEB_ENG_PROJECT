import React, { useState } from 'react';
import './Login.css';
import fbImage from './Images/fb.png';
import googleImage from './Images/google.png';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [selectedRole, setSelectedRole] = useState('user'); // Default role is 'user'

    const usernameInputStyle = { marginLeft: '7px' };
    const passwordInputStyle = { marginLeft: '12px' };
    const roleInputStyle = { marginLeft: '45px' , Width: '250px'};

    const handleSubmit = (event) => {
        event.preventDefault();

        const loginData = {
            username,
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
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
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
                    </select>
                </div>

                <div className="label-input-group">
                    <label>Username:</label>
                    <input
                        type="text"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        style={usernameInputStyle}
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
                        <p>Not a member yet? <a href="./register">Sign up</a></p>
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
    );
}

export default Login;
