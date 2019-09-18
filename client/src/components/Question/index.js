import React from "react";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

import './index.css'
export default props => {
    const createMarkup = () => {
        return { __html: props.questionHtml };
    }
    
    return (
        <Paper id="paper-question" style={{width: props.width}}>
            <Typography
                variant="h4"
                gutterBottom
                id="questionText"
            >
                QUESTION
            </Typography>
            <div
                dangerouslySetInnerHTML={createMarkup()}
                id="questionArea"
            ></div>
        </Paper>
    );
};
