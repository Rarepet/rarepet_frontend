import React from 'react';
import { Link } from 'react-router-dom';
import './Board.css'
import post1 from './new_Mediterranean_house_gecko1.png'
import post2 from './02.JPG'

function Board () {
    return (
        <div className="board">
            <Link className="back" to="/home2"> ←</Link>
            <div className="chatProfile">
                <div className="chatAvatar" />
                <p className="chatID">liz.lover</p>
            </div>
            <img className="imgPost1" src={ post1 } />
            <p className="textPost">Cute</p>
            <div className="chatProfile">
                <div className="chatAvatar" />
                <p className="chatID">iamavet</p>
            </div>
            <img className="imgPost1"  src={ post2 } />
        </div>
    )
}

export default Board;
