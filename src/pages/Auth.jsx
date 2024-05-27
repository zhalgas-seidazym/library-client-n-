import React, {useEffect, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import api from '../api/axios';
import {NotificationManager} from "react-notifications";
import NotificationContainer from "react-notifications/lib/NotificationContainer";


function Auth() {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const handleClick = async (event) => {
        event.preventDefault();

        try {
            const response = await api.post('api/users/auth/', {
                name: name,
                email: email,
                password: password
            });
            setEmail('');
            setName('');
            setPassword('');
            navigate('/login', {
                state: {
                    message: 'User created successfully',
                    title: 'Success',
                    hasVisited: false
                }
            });
        } catch (error) {
            NotificationManager.error('Click to show error!', 'Error Message', 5000, () => {
                alert(error)
            });
        }
    };

    return (
        <div className="container">
            <NotificationContainer/>
            <div className="auth-box">
                <div className="auth-header">SIGN UP</div>
                <div className="auth-body">
                    <form onSubmit={handleClick} className="login-form">
                        <input
                            type="email"
                            placeholder="EMAIL"
                            name="email"
                            required
                            className="phoneNumberInput"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            autoComplete="off"

                        />
                        <input
                            type="text"
                            placeholder="NAME"
                            name="name"
                            required
                            className="usernameInput"
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                            autoComplete="off"
                        />
                        <input
                            type="password"
                            placeholder="PASSWORD"
                            name="password"
                            required
                            className="passwordInput"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            autoComplete="off"
                        />
                        <input type="submit" value="SIGN UP" className="signInButton"/>
                    </form>
                    <div className="forgetText">
                        <p>if already have any accounts &nbsp;</p>
                        <Link to="/login">click here!</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Auth;
