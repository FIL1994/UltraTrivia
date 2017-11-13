/**
 * Time.js
 *
 * @author Philip Van Raalte
 * @date 2017-11-13
 */
import React, {Component} from 'react';

class Timer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      seconds: 0
    };

    this.updateTime = this.updateTime.bind(this);
  }

  componentWillMount() {
    this.timeInterval = setInterval(this.updateTime, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timeInterval);
  }

  updateTime() {
    this.setState({seconds: this.state.seconds+1});
  }

  render() {
    const {seconds} = this.state;

    return(
      <div>
        {seconds} {seconds === 1 ? 'second' : 'seconds'}
      </div>
    );
  }
}

export default Timer;