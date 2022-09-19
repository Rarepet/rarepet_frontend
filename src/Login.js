import React from 'react';
import { Link } from 'react-router-dom';
import './Login.css'
import logo from './logo_icon.jpg'

function Login() {

    return(
        <div className="logged-out">
            <div className="logo-_icon">
                <span className={"helper"}></span>
                <img src={logo} className='rarepetLogo' />
            </div>
            <div className="logo-_name">
                <p className="text-1">RAREPET</p>
            </div>
            <div className="frame-_auth">
                <div className="group-_username">
                    <div className="rectangle-1">
                        <p className="text-3">Username</p>
                    </div>
                </div>
                <div className="group-_password">
                    <div className="rectangle-1">
                        <p className="text-3">************</p>
                    </div>
                </div>
                <Link to="/home">
                    <button className="button-_start">
                        <p className="startText">Get Started</p>
                    </button>
                </Link>
            </div>
        </div>
    )
}

export default Login;


