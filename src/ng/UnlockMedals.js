/**
 * @author Philip Van Raalte
 * @date 2017-11-20
 */
import {unlockMedal, getMedals, getUser} from './NG_Connect';
import _ from 'lodash';

const medalTimeoutShort = 350;
const medalTimeoutLong = 2000;

export class NG {
  static fetchedUser = false;
  static unlockQueue = [];
  static executeQueue() {
    Promise.all(NG.unlockQueue.map((uq) => new Promise(uq)))
      .then(() => console.log("UnlockMedal Queue Executed"));
  }
}

async function forceUnlockMedal(medalName) {
  if(!NG.fetchedUser) {
    NG.unlockQueue.push(() => forceUnlockMedal(medalName));
    return;
  }

  if(!_.isString(medalName)) {
    return;
  }
  unlockThisMedal();

  function unlockThisMedal() {
    console.log("unlock", medalName);
    getMedals((result) => {
      if(result.success) {
        let medal = result.medals.find((m) => {
          return m.name === medalName;
        });
        const isUser = !_ .isEmpty(getUser());
        if(isUser) {
          if (!medal.unlocked) {
            unlockMedal(medalName, true);
            setTimeout(unlockThisMedal, medalTimeoutShort);
          }
          else {
            // An error occurred wait longer before making another network request
            setTimeout(unlockThisMedal, medalTimeoutLong);
          }
        }
      }
    });
  }
}

export function unlockStartGame() {
  unlockMedal("Start Game", true);
}

export function unlockCapcom() {
  forceUnlockMedal("Capcom Trivia");
}

export function unlockKonami() {
  forceUnlockMedal("Konami Trivia");
}

export function unlockNintendo() {
  forceUnlockMedal("Nintendo Trivia");
}

export function unlockSega() {
  forceUnlockMedal("Sega Trivia");
}

export function unlockSNK() {
  forceUnlockMedal("SNK Trivia");
}

export function unlockSquareSoft() {
  forceUnlockMedal("SquareSoft Trivia");
}

export function unlockBottomLeft() {
  forceUnlockMedal("Bottom Left");
}

export function unlockBottomRight() {
  forceUnlockMedal("Bottom Right");
}

export function unlockTopLeft() {
  forceUnlockMedal("Top Left");
}

export function unlockTopRight() {
  forceUnlockMedal("Top Right");
}

export function unlockScore5000() {
  forceUnlockMedal("5000");
}

export function unlockScore10000() {
  forceUnlockMedal("10000");
}

export function unlockScore20000() {
  forceUnlockMedal("20000");
}

export function unlockScore30000() {
  forceUnlockMedal("30000");
}

export function unlockScore40000() {
  forceUnlockMedal("40000");
}