import React, {useState} from 'react';
import {Link} from "react-router-dom";
import axios from "../api/axios";
import Alert from '@mui/material/Alert';
import api from "../api/axios";

function ForgotPassword(props) {
    const [email, setEmail] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const handleClick = async (event) => {
        event.preventDefault();
        try {
            const response = await api.post("api/users/verify/", {
                email: email,
                action: 'reset'
            });

            console.log(response.data.detail)
            setEmail('');
            setSuccess(true);
            setError(null);
        } catch (err) {
            setError(err.response.data || 'An error occurred');
            setSuccess(false);
        }
    }

    return (
        <div className="container">
            <div className="auth-box">
                <div className="auth-header" style={{position: "relative", bottom: "50px"}}>PASSWORD RESET</div>
                <div className="auth-body">
                    <form onSubmit={handleClick} className="login-form">
                        <input
                            type="email"
                            placeholder="EMAIL"
                            name="email"
                            className="phoneNumberInput"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            autoComplete="off"
                            style={{position: "relative", bottom: "50px"}}
                        />

                        <input type="submit" value="SEND CODE" className="signInButton"/>
                    </form>
                    <div style={{position: "relative", top: "20px"}}>
                        {error && <Alert variant="outlined" severity="error">
                            {error}
                        </Alert>}
                        {success && <Alert variant="outlined" severity="success">
                            Email sent successfully!
                        </Alert>}
                    </div>
                    <div className="forgetText">
                        <p>Go back &nbsp;</p>
                        <Link to="/login">click here!</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ForgotPassword;
