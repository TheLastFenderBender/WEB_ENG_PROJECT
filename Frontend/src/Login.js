import React, { useState } from 'react';
import './Login.css';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();

        fetch('http://localhost:3000/login',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
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
            <form onSubmit={handleSubmit}>
                <label>
                    Username:
                    <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
                </label>
                <label>
                    Password:
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
                </label>
                <input type="submit" value="Login" onClick={() => window.location.href = '/landingPage'} />
            </form>
            <button onClick={() => window.location.href = '/register'}>Or Click Here To Register</button>
        </div>
    );
}

export default Login;