/**
 * Quiz.js
 *
 * @author Philip Van Raalte
 * @date 2017-11-08
 */
import React, {Component} from 'react';
import {Link, Redirect} from 'react-router-dom';
import _ from 'lodash';

import {Button, Page, Divider, Parallax} from '../SpectreCSS';
import quizes from '../../quizes';
import Timer from '../Timer';
import Score from '../../data/Score';

class Quiz extends Component {
  constructor(props) {
    super(props);

    this.state = {
      quiz: null,
      questionNum: 0,
      correct: 0,
      submittedScore: false
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
        let updateState = {questionNum: this.state.questionNum + 1};
        let {correct} = this.state.quiz.questions[this.state.questionNum];
        const rightAnswer = correct === index;
        if(rightAnswer) {
          updateState = {...updateState, correct: this.state.correct + 1}
        }
        this.setState(updateState);
      }} key={key}>
        <Parallax
          className="parallax-button"
          topLeft={() => console.log("top left")} topRight={() => console.log("top right")}
          bottomLeft={() => console.log("bottom left")} bottomRight={() => console.log("bottom right")}
        >
          <Button large block children={answer}/>
        </Parallax>
      </div>
    );
  }

  renderQuestions(quiz) {
    const {questionNum, correct} = this.state;
    if(questionNum >= quiz.questions.length) {
      return this.renderQuizDone();
    }
    let {question, answers} = quiz.questions[questionNum];

    return(
      <div className="col-11 centered">
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
          Question {questionNum+1} of {quiz.questions.length} <br/>
          Correct: {correct}
        </div>
      </div>
    );
  }

  renderQuizDone() {
    const {correct, quiz} = this.state;
    const time = this.myTimer.state.seconds;

    if(!this.state.submittedScore) {
      setTimeout(() => {
        const quizScore = new Score({time, correct, id: quiz.uniqueID});
        let scores = this.props.appContext.state.scores.slice();

        let oldScoreID = _.findIndex(scores, (s) => {return quiz.uniqueID === s.id});
        let updateScore = false;
        if(oldScoreID === -1){
          scores.push(quizScore);
          updateScore = true;
        } else if(scores[oldScoreID].getScore() < quizScore.getScore()) {
          scores[oldScoreID] = quizScore;
          updateScore = true;
        }

        if(updateScore) {
          setTimeout(() => {
            this.props.appContext.setState({scores});
          });
        }

        this.setState({submittedScore: true});
      });
      this.myTimer.stopCounting();
    }

    return (
      <div>
        Quiz is done! <br/>
        Correct: {correct} <br/>
        Time: {time}
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
        <Timer ref={(myTimer) => {this.myTimer = myTimer;}}/>
      </Page>
    );
  }
}

export default Quiz;