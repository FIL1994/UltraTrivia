/**
 * App.js
 *
 * @author Philip Van Raalte
 * @date 2017-11-07
 */
import React, {Component} from 'react';
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';
import _ from 'lodash';
import {Page, Loading, Divider} from './components/SpectreCSS';
import localForage, {DATA_SCORES} from './data/localForage';

import Home from './components/pages/Home';
import Quiz from './components/pages/Quiz';
import Score from './data/Score';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      scores: [],
      getSave: false
    };
  }

  componentWillMount() {
    localForage.getItem(DATA_SCORES).then(
      (scores, error) => {
        let newState = {getSave: true};
        if(error) {
          // handle error
        } else {
          if(_.isArray(scores)) {
            scores = scores.map(s => new Score(s));
            newState = {...newState, scores};
          }
        }
        this.setState(newState);
      }
    );
  }

  componentDidUpdate(prevProps, prevState) {
    if(!_.isEqual(this.state.scores, prevState.scores)) {
      localForage.setItem(DATA_SCORES, this.state.scores);
    }
  }

  render() {
    // make this component's context available to other components
    const otherProps = {appContext: this};
    return(
      !this.state.getSave
        ?
        <Page>
          <br/>
          <h4>Loading Save Data</h4>
          <Divider size={8}/>
          <Loading large/>
        </Page>
        :
          <BrowserRouter>
            <div id="site" className="site">
              <Switch>
                <Route exact path="/"
                   render={(props) => (
                      <Home {...props} {...otherProps}/>
                    )}
                />
                <Route path="/quiz/:quizName?/"
                   render={(props) => (
                     <Quiz {...props} {...otherProps}/>
                   )}
                />
                <Redirect to="/"/>
              </Switch>
            </div>
          </BrowserRouter>
    );
  }
}

export default App;