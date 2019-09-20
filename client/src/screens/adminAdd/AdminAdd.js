import React, { useState } from "react";
import FormControl from "@material-ui/core/FormControl";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

export default () => {
    const [title, setTitle] = useState('');
    const [mainQuestion, setMainQuestion] = useState('');
    const [inputFormat, setInputFormat] = useState('');
    const [outputFormat, setOutputFormat] = useState('');
    const [constraints, setConstraints] = useState('');
    const [exampleIp, setExampleIp] = useState('');
    const [exampleOp, setExampleOp] = useState('');
    const [explanation, setExplanation] = useState('');
    const [testCases, setTestCases] = useState('');
    const [testCasesAnswer, setTestCasesAnswer] = useState('');
    const [privateCases, setPrivateCases] = useState('');
    const [privateCasesAnswer, setPrivateCasesAnswers] = useState('');

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
        let res = await fetch('/api/question', {
            method: "POST",
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
