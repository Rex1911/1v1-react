import React from 'react';
import auth from './Auth';
import {Redirect, Route} from 'react-router-dom';

export default ({component: Component, ...rest}) => (
    <Route {...rest} render={() => (
        auth.isLoggedIn ? <Component /> : <Redirect to='/login'/>
    )} />
)