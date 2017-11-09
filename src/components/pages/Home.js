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
    let slides = quizes.map(({name, colour}) => {
      return(
        <Slide key={name} className="quiz-slide" style={{backgroundColor: colour}}>
          <span>
            <h3>{name}</h3>
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
          <Link to="/quiz" className="btn btn-lg col-8">Quiz</Link>
          <br/><br/>
          {this.renderSlides()}
        </div>
      </Page>
    );
  }
}

export default Home;