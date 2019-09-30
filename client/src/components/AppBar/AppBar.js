import React from 'react';
import {Link} from 'react-router-dom';

import './AppBar.css'

export default (props) => {
    let {currentActive} = props;
    
    return (
        <div id='appbar'>
            <Link className="appbar-content" id={currentActive === 0 ? "active": ""} to="/admin">START A ROOM</Link>
            <Link className="appbar-content" id={currentActive === 1 ? "active": ""} to="/admin/questions">MODIFY QUESTION</Link>
            <Link className="appbar-content" id={currentActive === 2 ? "active": ""} to="/admin/questions/add">ADD QUESTION</Link>
            <Link className="appbar-content" id={currentActive === 3 ? "active": ""} to="/logout">LOGOUT</Link>
        </div>
    )
}