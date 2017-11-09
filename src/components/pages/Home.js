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
    let slides = quizes.map(({name, questions}) => {
      return(
        <Slide key={name}>
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
          //mousewheelControl: true,
          //mousewheelForceToAxis: true
        }}
      >
        {slides}
      </Swiper>
    );
  }

  render() {
    return(
      <Page>
        <h1>Ultra Trivia</h1>
        <Divider className="col-10 centered"/>
        <div>
          <Link to="/quiz" className="btn btn-lg col-8">Quiz</Link>
          {this.renderSlides()}
        </div>
      </Page>
    );
  }
}

export default Home;