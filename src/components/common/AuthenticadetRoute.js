import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'

class AuthenticatedRoute extends Component {

    render() {
        if(this.props.isAuthenticated) {
            return <Route {...this.props} />
        } else {
            console.log("please, authenticate");
            return <Redirect to="/login" />
        }
    }
}

export default AuthenticatedRoute;