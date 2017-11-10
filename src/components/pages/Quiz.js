import React, {Component} from 'react';
import {Link, Redirect} from 'react-router-dom';
import _ from 'lodash';

import {Button, Page, Divider, Parallax} from '../SpectreCSS';
import quizes from '../../quizes';

class Quiz extends Component {
  constructor(props) {
    super(props);

    this.state = {
      quiz: null,
      questionNum: 0
    };

    this.fetchQuiz = this.fetchQuiz.bind(this);
    this.renderAnswer = this.renderAnswer.bind(this);
    this.renderQuizDone = this.renderQuizDone.bind(this);
  }

  fetchQuiz() {
    let newQuiz;
    const {quizName} = this.props.match.params;
    if (!_.isUndefined(quizName) && !_.isEmpty(quizName.toString())) {
      newQuiz = _.find(quizes, {uniqueID: quizName});
      if(_.isEmpty(newQuiz)) {
        return false;
      } else {
        setTimeout(() => {this.setState({quiz: newQuiz});});
      }
    }
    return true;
  }

  renderAnswer(answer, index, key) {
    return (
      <div className="column col-6 centered" onClick={() => {
        let {correct} = this.state.quiz.questions[this.state.questionNum];
        const rightAnswer = correct === index;
        console.log(`Right answer: ${rightAnswer}`);
        this.setState({questionNum: this.state.questionNum + 1});
      }} key={key}>
        <Parallax
          topLeft={() => console.log("top left")} topRight={() => console.log("top right")}
          bottomLeft={() => console.log("bottom left")} bottomRight={() => console.log("bottom right")}
        >
          <Button large block children={answer}/>
        </Parallax>
      </div>
    );
  }

  renderQuestions(quiz) {
    const {questionNum} = this.state;
    if(questionNum >= quiz.questions.length) {
      return this.renderQuizDone();
    }
    let {question, answers} = quiz.questions[questionNum];

    return(
      <div>
        <h5>{question}</h5>
        <div className="columns col-gapless">
          {
            _.shuffle(answers.map((answer, index) => {
              return this.renderAnswer(answer, index, `${questionNum}-${index}`);
            }))
          }
        </div>
        <br/>
        <div>
          Question {questionNum+1} of {quiz.questions.length}
        </div>
      </div>
    );
  }

  renderQuizDone() {
    return (
      <div>
        Quiz is done!
      </div>
    );
  }

  render() {
    const {quiz} = this.state;

    if(_.isEmpty(quiz)) {
      if(!this.fetchQuiz()) {
        return <Redirect to="/"/>;
      }
    }

    return(
      <Page>
        <h2>{_.isEmpty(quiz) ? "Loading..." : quiz.name}</h2>
        <Divider className="centered" size={10}/>
        <Link to="/" className="btn btn-lg btn-primary">Back to Main Menu</Link>
        <br/>
        <br/>
        {_.isEmpty(quiz) ? "Loading..." : this.renderQuestions(quiz)}
      </Page>
    );
  }
}

export default Quiz;