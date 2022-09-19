/* eslint-disable */
import React, {useState} from 'react';
import Login from './Login';
import Home from './Home';
import Home2 from './Home2';
import Connect from './Connect';
import Match from './Match';
import Chat from './Chat';
import Board from './Board';
import styled from 'styled-components';
import {
    Route,
    Routes
} from 'react-router-dom';

function App() {
  return (
      <div>
          <Routes>
              <Route path="/" exact={true} element={<Login />}/>
              <Route path="/home" element={<Home />}/>
              <Route path="/connect" element={<Connect />}/>
              <Route path="/match" element={<Match />}/>
              <Route path="/home2" element={<Home2 />}/>
              <Route path="/chat" element={<Chat />}/>
              <Route path="/board" element={<Board />}/>
          </Routes>
      </div>
  );
}

export default App;
