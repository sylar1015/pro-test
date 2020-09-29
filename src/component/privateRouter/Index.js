import React from "react";
import {Route, Redirect} from "react-router";

const PrivateRoute = ({component:Component,...rest}) => {
    return (
        <Route {...rest} render = {
            routeProps => (
                true ? <Component {...routeProps}/> : <Redirect to='/' />
            )
        }>
        </Route>
    )
};

export default PrivateRoute;