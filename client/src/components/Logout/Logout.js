import React, {useEffect} from 'react';
import {Redirect} from 'react-router-dom';
import auth from '../../helper/Auth';

export default () => {
    useEffect(() => {
        auth.logout();
    })

    return (
        <Redirect to="/" />
    )
}