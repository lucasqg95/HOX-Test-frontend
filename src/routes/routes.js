import React from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom'

import PrivateRoute from './privateRoutes'
import Login from '../container/login/login'
import Products from '../container/products/products'


const Routes = () => (
    <Router>
        <Switch>
            <Route exact path='/' component={() => <Redirect to ={{ pathname:'/login'}} /> }/>
            <Route exact path='/login' component={Login}/>
            <PrivateRoute path='/products' component={Products}/>
        </Switch>
    </Router>
)

export default Routes