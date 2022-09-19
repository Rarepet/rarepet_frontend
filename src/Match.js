import React from 'react';
import { Link } from 'react-router-dom';
import './Match.css'
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

function Match() {
    return (
        <div className="match">
            <Link className="back" to="/home2"> ←</Link>
            <div className="matchProfile">
                <p className="matchProfileText">Trainer01</p>
            </div>
            <div className="matchProfile">
                <p className="matchProfileText">Trainer02</p>
            </div>

            <Popup
                trigger={open => (
                    <div className="matchProfile">
                        <p className="matchProfileText">Trainer03</p>
                    </div>
                )}
                position="overlay"
                closeOnDocumentClick
            >
                <div className="header"> Category </div>
                <div className="content"> Lizard, Snake </div>
                <br />
                <div className="header"> Contact </div>
                <div className="content"> Chat, Video </div>
                <br />
                <div className="header"> Type </div>
                <div className="content"> Trainer </div>
                <br />
                <Link to = "/home2">
                    <button className="addButton" > +Add </button>
                </Link>
            </Popup>



            <div className="matchProfile">
                <p className="matchProfileText">Trainer04</p>
            </div>
        </div>
    )
}

export default Match;