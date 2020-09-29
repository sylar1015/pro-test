import React from 'react';
import LoginComponent from "./views/login/Login";
import {HashRouter, Switch, Route} from 'react-router-dom'
import PrivateRoute from "./component/privateRouter/Index";
import IndexComponent from "./views/index/Index";

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
                <PrivateRoute component={IndexComponent} path='/index'></PrivateRoute>
            </Switch>
        </HashRouter>
    );
  }
}

export default App;
