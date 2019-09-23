import React, { useState } from "react";
import FormControl from "@material-ui/core/FormControl";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

export default (props) => {
    const [title, setTitle] = useState(props.question.title || '');
    const [mainQuestion, setMainQuestion] = useState(props.question.question.main || '');
    const [inputFormat, setInputFormat] = useState(props.question.question.input ||'');
    const [outputFormat, setOutputFormat] = useState(props.question.question.output || '');
    const [constraints, setConstraints] = useState(props.question.question.constraints || '');
    const [exampleIp, setExampleIp] = useState(props.question.question.exampleIp || '');
    const [exampleOp, setExampleOp] = useState(props.question.question.exampleOp || '');
    const [explanation, setExplanation] = useState(props.question.question.explanation || '');
    const [testCases, setTestCases] = useState(props.question.testCases || '');
    const [testCasesAnswer, setTestCasesAnswer] = useState(props.question.testCasesAnswer || '');
    const [privateCases, setPrivateCases] = useState(props.question.privateCases || '');
    const [privateCasesAnswer, setPrivateCasesAnswers] = useState(props.question.privateCasesAnswer || '');

    const handleSubmit = async (e) => {
        e.preventDefault();
        let formattedTestCases = [testCases];
        let formattedTestCasesAns = testCasesAnswer.split('\n');
        if(formattedTestCasesAns[formattedTestCasesAns.length - 1] === "") formattedTestCasesAns.pop();
        let noOfTestCases = formattedTestCasesAns.length;

        let formattedPrivateCases = [privateCases];
        let formattedPrivateCasesAns = privateCasesAnswer.split('\n');
        if(formattedPrivateCasesAns[formattedPrivateCasesAns.length - 1] === "") formattedPrivateCasesAns.pop();
        let noOfPrivateCases = formattedPrivateCasesAns.length;
        let data = {
            day: 1,
            question: {
                main: mainQuestion,
                input: inputFormat,
                output: outputFormat,
                constraints: constraints,
                exampleIp: exampleIp,
                exampleOp: exampleOp,
                explanation: explanation
            },
            title: title,
            noOfTestCases: noOfTestCases,
            testCases: formattedTestCases,
            testCasesAnswer: formattedTestCasesAns,
            noOfPrivateCases: noOfPrivateCases,
            privateCases: formattedPrivateCases,
            privateCasesAnswer: formattedPrivateCasesAns
        };

        console.log(data);
        let method
        if(props.mode === 'edit') {
            method = 'PUT';
            data = {...data, _id: props.question._id}
        } else {
            method = "POST"
        }

        let res = await fetch('/api/question', {
            method: method,
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            },
            body: JSON.stringify(data)
        })
        let json = await res.json()
        console.log(json)
    };

    return (
        <Paper style={{ width: "70vw", margin: "20px auto" }}>
            <Typography
                variant="h4"
                style={{
                    textAlign: "center",
                    fontFamily: "Montserrat",
                    marginTop: 10
                }}
            >
                ADD A QUESTION
            </Typography>
            <form
                style={{ width: "80%", margin: "0 auto" }}
                onSubmit={handleSubmit}
            >
                <FormControl fullWidth>
                    <TextField
                        variant="outlined"
                        required
                        label="Title"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        style={{ marginTop: 20 }}
                    ></TextField>
                </FormControl>
                <FormControl fullWidth>
                    <TextField
                        variant="outlined"
                        multiline
                        required
                        label="Main Body"
                        value={mainQuestion}
                        onChange={e => setMainQuestion(e.target.value)}
                        style={{ marginTop: 20 }}
                    ></TextField>
                </FormControl>
                <FormControl fullWidth>
                    <TextField
                        variant="outlined"
                        multiline
                        required
                        label="Input Format"
                        value={inputFormat}
                        onChange={e => setInputFormat(e.target.value)}
                        style={{ marginTop: 20 }}
                    ></TextField>
                </FormControl>
                <FormControl fullWidth>
                    <TextField
                        variant="outlined"
                        multiline
                        required
                        label="Output Format"
                        value={outputFormat}
                        onChange={e => setOutputFormat(e.target.value)}
                        style={{ marginTop: 20 }}
                    ></TextField>
                </FormControl>
                <FormControl fullWidth>
                    <TextField
                        variant="outlined"
                        multiline
                        required
                        label="Constraints"
                        value={constraints}
                        onChange={e => setConstraints(e.target.value)}
                        style={{ marginTop: 20 }}
                    ></TextField>
                </FormControl>
                <FormControl fullWidth>
                    <TextField
                        variant="outlined"
                        multiline
                        required
                        label="Example Input"
                        value={exampleIp}
                        onChange={e => setExampleIp(e.target.value)}
                        style={{ marginTop: 20 }}
                    ></TextField>
                </FormControl>
                <FormControl fullWidth>
                    <TextField
                        variant="outlined"
                        multiline
                        required
                        label="Example Output"
                        value={exampleOp}
                        onChange={e => setExampleOp(e.target.value)}
                        style={{ marginTop: 20 }}
                    ></TextField>
                </FormControl>
                <FormControl fullWidth>
                    <TextField
                        variant="outlined"
                        multiline
                        label="Explanation"
                        value={explanation}
                        onChange={e => setExplanation(e.target.value)}
                        style={{ marginTop: 20 }}
                    ></TextField>
                </FormControl>
                <FormControl fullWidth>
                    <TextField
                        variant="outlined"
                        multiline
                        required
                        label="Test Cases"
                        value={testCases}
                        onChange={e => setTestCases(e.target.value)}
                        style={{ marginTop: 20 }}
                    ></TextField>
                </FormControl>
                <FormControl fullWidth>
                    <TextField
                        variant="outlined"
                        multiline
                        required
                        label="Test Cases Answers"
                        value={testCasesAnswer}
                        onChange={e => setTestCasesAnswer(e.target.value)}
                        style={{ marginTop: 20 }}
                    ></TextField>
                </FormControl>
                <FormControl fullWidth>
                    <TextField
                        variant="outlined"
                        multiline
                        required
                        label="Private Cases"
                        value={privateCases}
                        onChange={e => setPrivateCases(e.target.value)}
                        style={{ marginTop: 20 }}
                    ></TextField>
                </FormControl>
                <FormControl fullWidth>
                    <TextField
                        variant="outlined"
                        multiline
                        required
                        label="Private Cases Answers"
                        value={privateCasesAnswer}
                        onChange={e => setPrivateCasesAnswers(e.target.value)}
                        style={{ marginTop: 20 }}
                    ></TextField>
                </FormControl>
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    style={{ margin: "20px auto" }}
                >
                    Submit
                </Button>
            </form>
        </Paper>
    );
};
