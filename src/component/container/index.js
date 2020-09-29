import React from 'react';
import {Switch, Route} from 'react-router-dom'
import PrivateRoute from "../privateRouter/Index";

import UserListComponent,{UserAddComponent} from "../user";

class ContainerComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <Switch>
                    <PrivateRoute component={UserListComponent} exact path='/index/user/list'></PrivateRoute>
                    <PrivateRoute component={UserAddComponent} exact path='/index/user/add'></PrivateRoute>
            </Switch>
        );
    }
}

export default ContainerComponent;
