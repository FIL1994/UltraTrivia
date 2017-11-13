/**
 * App.js
 *
 * @author Philip Van Raalte
 * @date 2017-11-07
 */
import React, {Component} from 'react';
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';
import _ from 'lodash';
import localForage, {DATA_SCORES} from './data/localForage';

import Home from './components/pages/Home';
import Quiz from './components/pages/Quiz';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      scores: []
    };
  }

  componentWillUpdate(nextProps, nextState) {
    if(!_.isEqual(this.state.scores, nextState.scores)) {
      localForage.setItem(DATA_SCORES, nextState.scores);
    }
  }

  render() {
    // make this component's context available to other components
    const otherProps = {appContext: this};
    return(
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