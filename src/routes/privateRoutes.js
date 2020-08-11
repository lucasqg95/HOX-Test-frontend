import React from 'react'
import { connect } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'

//import { isAuthenticated } from '../services/authenticator'

const PrivateRoute = ({ component: Component, isLogged, ...rest }) => (
    <Route {...rest} render={ props => (
        isLogged ? (
            <Component {...props}/>
        ) : (
            <Redirect to ={{ pathname:'/login', state: { from: props.location }}} />
        )
    )}/>
)

const mapStateToProps = state => ({
    isLogged: state.user.isLogged
})

export default connect(mapStateToProps)(PrivateRoute)