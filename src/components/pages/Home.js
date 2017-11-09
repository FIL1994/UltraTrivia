import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Swiper, Slide} from 'react-dynamic-swiper';

import {Page, Divider} from '../SpectreCSS';
import quizes from '../../quizes';

class Home extends Component {
  constructor(props) {
    super(props);

    this.renderSlides = this.renderSlides.bind(this);
  }

  renderSlides() {
    let slides = quizes.map(({name, colour, uniqueID}) => {
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

    return(
      <Swiper
        swiperOptions={{
          loop: true,
          slidesPerView: 1,
          centeredSlides: true,
          grabCursor: true,
          keyboardControl: true
        }}
        className="text-light"
      >
        {slides}
      </Swiper>
    );
  }

  render() {
    return(
      <Page>
        <h1>Ultra Trivia</h1>
        <Divider className="centered" size={10}/>
        <div>
          <div className="btn-group btn-group-block centered col-8">
            <Link to="/quiz" className="btn btn-primary btn-lg">Quiz</Link>
          </div>
          <br/><br/>
          {this.renderSlides()}
        </div>
      </Page>
    );
  }
}

export default Home;