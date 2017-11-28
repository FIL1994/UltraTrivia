/**
 * @author Philip Van Raalte
 * @date 2017-11-28
 */
import _ from 'lodash';
import SONGS from './data/Songs';

if(_.isEmpty(window.songPlaying)) {
  window.VOLUME = 1;

  const assetPath = "/assets/";
  const sounds = [
    {id: SONGS.Spur.id, src: SONGS.Spur.src},
    {id: SONGS.Chip1.id, src: SONGS.Chip1.src},
    {id: SONGS.Chip2.id, src: SONGS.Chip2.src}
  ];

  let songStarted = false;
  createjs.Sound.on("fileload", () => {
    try {
      songStarted = window.songPlaying.playState === "playSucceeded";
    } catch(e) {}
    if(!songStarted) {
      try{
        window.songPlaying.destroy();
      } catch(e) {}

      try {
        window.songPlaying = createjs.Sound.play(SONGS.Chip1.id, {loop: -1, volume: window.VOLUME});
      } catch(e) {}
    }
  });

  createjs.Sound.registerSounds(sounds, assetPath);
}