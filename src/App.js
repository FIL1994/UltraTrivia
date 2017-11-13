import React, {Component} from 'react';
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';

import Home from './components/pages/Home';
import Quiz from './components/pages/Quiz';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      scores: []
    };
  }

  render() {

    return(
      <BrowserRouter>
        <div id="site" className="site">
          <Switch>
            <Route exact path="/">
              <Home appContext={this}/>
            </Route>
            <Route path="/quiz/:quizName?/" render={(props) => (
              <Quiz {...props} appContext={this}/>
            )}/>
            <Redirect to="/"/>
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;