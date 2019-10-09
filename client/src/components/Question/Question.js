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
                <pre style={{fontSize: 15, whiteSpace: "pre-wrap"}}>{questionData.main}</pre>
                <Typography variant="subtitle2">INPUT FORMAT</Typography>
                <pre style={{fontSize: 15, whiteSpace: "pre-wrap"}}>{questionData.input}</pre>
                <Typography variant="subtitle2">OUTPUT FORMAT</Typography>
                <pre style={{fontSize: 15, whiteSpace: "pre-wrap"}}>{questionData.output}</pre>
                <Typography variant="subtitle2">CONSTRAINTS</Typography>
                <pre style={{fontSize: 15, whiteSpace: "pre-wrap"}}>{questionData.constraints}</pre>
                <Typography variant="subtitle2">INPUT EXAMPLE</Typography>
                <pre style={{fontSize: 15, backgroundColor:"#EAECEE", padding: 10}}>{questionData.exampleIp}</pre>
                <Typography variant="subtitle2">OUTPUT EXAMPLE</Typography>
                <pre style={{fontSize: 15, backgroundColor:"#EAECEE", padding: 10}}>{questionData.exampleOp}</pre>
                <Typography variant="subtitle2">EXPLANATION</Typography>
                <pre style={{fontSize: 15, whiteSpace: "pre-wrap"}}>{questionData.explanation}</pre>
            </div>
        </Paper>
    );
};
