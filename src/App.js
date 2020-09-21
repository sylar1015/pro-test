import React from 'react';
import LoginComponent from "./views/login/Login";
import {HashRouter, Switch, Route} from 'react-router-dom'

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    return (
        <HashRouter>
            <Switch>
                <Route component={LoginComponent} exact path='/'></Route>
            </Switch>
        </HashRouter>
    );
  }
}

export default App;
