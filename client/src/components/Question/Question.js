import React from "react";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

import './question.css'
export default props => {
    let {questionData} = props
    
    return (
        <Paper id="paper-question" style={{width: props.width}}>
            <Typography
                variant="h4"
                gutterBottom
                id="questionText"
            >
                {questionData.title}
            </Typography>
            <div id="questionArea">
                <Typography variant="subtitle2">QUESTION</Typography>
                <pre style={{fontSize: 15}}>{questionData.main}</pre>
                <Typography variant="subtitle2">REQUIRED OUTPUT</Typography>
                <pre style={{fontSize: 15, backgroundColor:"#EAECEE", padding: 10}}>{questionData.exampleOp}</pre>
            </div>
        </Paper>
    );
};
