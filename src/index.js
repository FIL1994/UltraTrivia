/**
 * index.js
 *
 * @author Philip Van Raalte
 * @date 2017-11-08
 */

import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import {startSession, initSession, getMedals, getUser} from './ng/NG_Connect';
import {unlockStartGame, NG} from './ng/UnlockMedals';

import App from './App';
import setupSoundJS from './soundjs/setupSoundJS';

setupSoundJS();

ReactDOM.render(
  <App/>,
  document.getElementById('root')
);

// NG Start Session
initSession();
startSession(() => {
  NG.fetchedUser = true;
  NG.executeQueue();
});

// Unlock start medal
let times = 0; // Times attempted to unlock medal. This allows time to connect to the NG servers
function goUnlockStartGame() {
  times++;
  getMedals((result) => {
    if(result.success) {
      let medal = result.medals.find((m) => {
        return m.name === "Start Game";
      });
      if( !medal.unlocked && (times < 5 || !_.isEmpty(getUser())) ) {
        unlockStartGame();
        setTimeout(goUnlockStartGame, 350);
      }
    }
    else {
      // An error occurred wait longer before making another network request
      setTimeout(goUnlockStartGame, 2000);
    }
  });
}

goUnlockStartGame();