import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css'
import match from './icon_match.jpg'
import board from './icon_board.jpg'
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

function Home2() {
    return (
        <div className="home">
            <div className="notifications">
                <div className="group-1">
                    <div className="ellipse-1">
                        <div className="ellipse-5">
                            <p className="msgNum"></p>
                        </div>
                    </div>
                </div>
                <Link className="group-1" to="/chat">
                    <div className="ellipse-1">
                        <div className="ellipse-4">
                            <p className="msgNum">!</p>
                        </div>
                    </div>
                </Link>
            </div>

            <Link to="/match">
                <button className="button-_match">
                    <img className="img-5" src={ match } />
                    <p className="bigButtonName">Match</p>
                </button>
            </Link>

            <Link to="/Board">
                <button className="button-_posts">
                    <img className="img-6" src={ board } />
                    <p className="bigButtonName">Posts</p>
                </button>
            </Link>


            <Popup
                trigger={open => (
                    <button className="button">Username</button>
                )}
                position="top center"
                closeOnDocumentClick
            >
                <div className="header"> Category </div>
                <div className="content"> Lizard </div>
                <br />
                <div className="header"> Contact </div>
                <div className="content"> Chat, Video </div>
                <br />
                <div className="header"> Type </div>
                <div className="content"> User </div>
            </Popup>

        </div>
    )
}

export default Home2;
