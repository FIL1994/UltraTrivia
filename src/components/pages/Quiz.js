import React, {Component} from 'react';
import {Link, Redirect} from 'react-router-dom';
import _ from 'lodash';

import {Page, Divider, Parallax} from '../SpectreCSS';
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
        <br/>
        <div className="col-4">
          <Parallax
            topLeft={() => console.log("top left")} topRight={() => console.log("top right")}
            bottomLeft={() => console.log("bottom left")} bottomRight={() => console.log("bottom right")}
          >
            <button type="button" className="btn btn-lg col-12 p-2">Button 3</button>
          </Parallax>
        </div>
      </Page>
    );
  }
}

export default Quiz;