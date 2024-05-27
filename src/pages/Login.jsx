import React, {useEffect, useState} from 'react';
import {Link, useLocation, useNavigate} from "react-router-dom";
import {NotificationManager} from "react-notifications";
import NotificationContainer from "react-notifications/lib/NotificationContainer";
import api from "../api/axios";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const notificationShown = localStorage.getItem('notificationShown');
        if (location.state && !notificationShown && location.state.hasVisited === false) {
            NotificationManager.success(location.state.message, location.state.title, 3000);
            localStorage.setItem('notificationShown', true);
        }
    }, [location]);

    const handleClick = async (event) => {
        event.preventDefault();

        try {
            const response = await api.post('api/users/token/', {
                email,
                password
            });
            const {refresh, access} = response.data; // Ensure these names match the actual API response
            setEmail('');
            setPassword('');

            console.log('Tokens:', access, refresh); // Debugging log

            localStorage.setItem('access', access);
            localStorage.setItem('refresh', refresh);
            navigate('/');
        } catch (error) {
            if (error.response && error.response.status === 401) {
                setError("Invalid email or password. Please try again.");
            } else {
                setError("An error occurred. Please try again later.");
            }
        }
    }


    const handleNavigate = () => {
        localStorage.removeItem('notificationShown');
    }

    return (
        <div className="container">
            <NotificationContainer />
            <div className="auth-box">
                <div className="auth-header">SIGN IN</div>
                <div className="auth-body">
                    <form className="login-form" onSubmit={handleClick}>
                        <input type="email" placeholder="EMAIL" name="email"
                               className="phoneNumberInput" autoComplete="off" value={email}
                               onChange={(event) => setEmail(event.target.value)} />
                        <input type="password" placeholder="PASSWORD" name="password" className="passwordInput"
                               autoComplete="off" value={password}
                               onChange={(event) => setPassword(event.target.value)} />
                        <div style={{width: "100%", display: "flex", justifyContent: "left", alignItems: "flex-start"}}>
                            <Link to="/forgot-password" style={{color: "red"}}>Forgot password?</Link>
                        </div>
                        <input type="submit" value="SIGN IN" className="signInButton"/>
                    </form>

                    {error && <div className="error-message" style={{
                        display: "flex",
                        textAlign: "center",
                        justifyContent: "center",
                        top: "15px",
                        position: "relative"
                    }}><p style={{color: "red"}}>{error}</p></div>}
                    <div className="forgetText">
                        <p>If you don’t have an account &nbsp;</p>
                        <Link to="/auth" onClick={handleNavigate}>click here!</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
