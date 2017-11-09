import React, {Component} from 'react';
import {Link, Redirect} from 'react-router-dom';
import _ from 'lodash';

import {Page, Divider} from '../SpectreCSS';
import quizes from '../../quizes';

class Quiz extends Component {
  render() {
    let quiz;
    const {quizName} = this.props.match.params;
    if(!_.isUndefined(quizName) && !_.isEmpty(quizName.toString())) {
      quiz = _.find(quizes, {uniqueID: quizName});
    }
    console.log("Quiz", quiz);

    return(
      <Page>
        <h1>{quizName}</h1>
        <Divider className="centered" size={10}/>
        <Link to="/" className="btn btn-lg">Home</Link>
        <br/>
        {_.isEmpty(quiz) ? <Redirect to="/"/> : null}
      </Page>
    );
  }
}

export default Quiz;