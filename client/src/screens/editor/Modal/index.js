import React from "react";

import './index.css';

export default props => {
    return (
        <div id="modal">
            <div id="modal-content">
                <h1>{props.children}</h1>
            </div>
        </div>
    );
};
