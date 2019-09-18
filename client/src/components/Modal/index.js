import React from "react";
import Paper from "@material-ui/core/Paper";
import './index.css';

export default props => {
    return (
        <div id="modal">
            <Paper id="modal-content">
                <h1>{props.children}</h1>
            </Paper>
        </div>
    );
};
