/**
 * Home.js
 *
 * @author Philip Van Raalte
 * @date 2017-11-08
 */
import React, {Component} from 'react';
import _ from 'lodash';
import {Link} from 'react-router-dom';
import {Swiper, Slide} from 'react-dynamic-swiper';

import {Page, Divider} from '../SpectreCSS';
import quizes from '../../quizes';
import Songs from '../../data/Songs';
import {playSong} from '../../soundjs/setupSoundJS';
import {unlockScore5000, unlockScore10000, unlockScore20000, unlockScore30000, unlockScore40000}
  from '../../ng/UnlockMedals';
import {postScore} from '../../ng/NG_Connect';
import {totalScoreScoreboardID} from '../../config/keys';

class Home extends Component {
  constructor(props) {
    super(props);

    this.renderSwiper = this.renderSwiper.bind(this);
    this.renderSlides = this.renderSlides.bind(this);
  }

  renderSlides() {
    return quizes.map(({name, colour, uniqueID}) => {
      return(
        <Slide key={name} className="quiz-slide" style={{backgroundColor: colour}}>
          <span>
            <h3>{name}</h3>
            <div className="btn-group btn-group-block centered col-6">
              <Link to={`/quiz/${uniqueID}`} className="btn btn-lg">Go to Quiz</Link>
            </div>
          </span>
        </Slide>
      );
    });
  }

  renderSwiper() {
    const {appContext} = this.props;
    console.log("App", appContext.state);

    return(
      <Swiper
        swiperOptions={{
          loop: false,
          slidesPerView: 1,
          centeredSlides: true,
          grabCursor: true,
          keyboardControl: true
        }}
        className="text-light col-11 centered"
      >
        {this.renderSlides()}
      </Swiper>
    );
  }

  getTotalScore() {
    let totalScore = 0;
    this.props.appContext.state.scores.forEach((s) => {
      totalScore += s.getScore();
    });

    postScore(totalScore, totalScoreScoreboardID);

    // check total score medals
    if(totalScore >= 5000) {
      unlockScore5000();
      if(totalScore >= 10000) {
        unlockScore10000();
        if(totalScore >= 20000) {
          unlockScore20000();
          if(totalScore >= 30000) {
            unlockScore30000();
            if(totalScore >= 40000) {
              unlockScore40000();
            }
          }
        }
      }
    }

    return totalScore;
  }

  checkSongPlaying() {
   const {songPlaying} = window;

   if(!_.isEmpty(songPlaying) && !songPlaying.src.toUpperCase().includes(Songs.Chip1.id)) {
     console.log("false");
     playSong(Songs.Chip1.id);
   }
  }


  render() {
    this.checkSongPlaying();

    return(
      <Page className="centered text-center">
        <h1>Ultra Trivia</h1>
        <Divider className="centered" size={10}/>
        Total Score: {this.getTotalScore()}
        <br/>
        <div>
          <div className="btn-group btn-group-block centered col-8">
            <Link to="/quiz" className="btn btn-primary btn-lg">Quiz</Link>
          </div>
          <br/><br/>
          {this.renderSwiper()}
        </div>
      </Page>
    );
  }
}

export default Home;