import React from 'react';
import { Link } from 'react-router-dom';
import './Chat.css'
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import purchaseResult from './Purchase.jpg';

function Chat() {
    return (
        <div className="intro">
            <Link to="/home2">
                <div className="back"> ←</div>
            </Link>

            <Link className="chatProfile" to="/connect">
                <div className="chatAvatar" />
                <div className="chatID">Trainer02</div>
            </Link>
            <div className="chatBox">
                <div className="chatBackground">
                    <p className="chatText">Real-time guide to handle & tame your lizards!

                        Total 4 lessons, takes an hour for each lesson. The plan costs $40.</p>

                    <Popup className="purchasePopup"
                        trigger={open => (
                            <div className="chatButton">
                                <p className="chatButtonText">Purchase Now</p>
                            </div>
                        )}
                        position="overlay"
                        closeOnDocumentClick
                    >
                        <img className="imgPurchase" src={ purchaseResult } />
                    </Popup>
                </div>
            </div>

            <div className="chatBar">
                <div className="chatInput" />
                <div className="chatPost" />
            </div>

        </div>
    )
}

export default Chat;
