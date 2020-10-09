import React from 'react';
import {Switch} from 'react-router-dom'
import PrivateRoute from "../privateRouter/Index";

import UserListComponent,{UserAddComponent} from "../user";
import DepartmentListComponent, {DepartmentAddComponent} from "../department";

const files = require.context('../../views', true, /\.js$/);


class ContainerComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {
    }

    render() {
        return (
            <Switch>
                <PrivateRoute component={UserListComponent} exact path='/index/user/list'></PrivateRoute>
                <PrivateRoute component={UserAddComponent} exact path='/index/user/add'></PrivateRoute>
                <PrivateRoute component={DepartmentListComponent} exact path='/index/department/list'></PrivateRoute>
                <PrivateRoute component={DepartmentAddComponent} exact path='/index/department/add'></PrivateRoute>
            </Switch>
        );
    }
}

export default ContainerComponent;
