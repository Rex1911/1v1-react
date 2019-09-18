import React, { useState, useEffect, useRef } from "react";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import _find from "lodash/find";
import TextField from "@material-ui/core/TextField";
import Question from "../../components/Question";
import io from 'socket.io-client';

import "./index.css";

export default () => {
    const [selectValue, setSelectValue] = useState();
    const [selectedRoom, setSelectedRoom] = useState(1);
    const [totalTime, setTotalTime] = useState(20);
    const [questions, setQuestions] = useState([]);
    const [questionHtml, setQuestionHtml] = useState(null);

    let socket = useRef();
    useEffect(() => {
        async function fetchData() {
            let res = await fetch("http://localhost:5000/api/admin");
            let data = await res.json();
            setQuestions(data);
        }
        fetchData();
        socket.current = io('http://localhost:5000');

        return () => {
            socket.current.disconnect();
        }
    }, []);

    const handleSelectChange = e => {
        setSelectValue(e.target.value);
        if(e.target.value === '') {setQuestionHtml(null); return}
        let question = _find(questions, { _id: e.target.value });
        setQuestionHtml(question.question);
    };

    const handleRoomChange = e => {
        if (parseInt(e.target.value) <= 0) {
            setSelectedRoom(1);
            return;
        }
        setSelectedRoom(e.target.value);
    };

    const handleSubmit = e => {
        e.preventDefault();
        socket.current.emit('startContest', {questionID: selectValue, roomID: selectedRoom, totalTime: totalTime})
    };

    const handleTimeChange = (e) => {
        if (parseInt(e.target.value) <= 0) {
            setTotalTime(20);
            return;
        }
        setTotalTime(e.target.value);
    } 

    return (
        <div id="rootDiv">
            <form autoComplete="off" onSubmit={handleSubmit}>
                <Paper id="paper">
                    <Typography
                        variant="h4"
                        gutterBottom
                        style={{ fontFamily: "Montserrat" }}
                    >
                        START A ROOM
                    </Typography>
                    <FormControl variant="filled" id="select-button">
                        <InputLabel htmlFor="select-question">
                            Question
                        </InputLabel>
                        <Select
                            native
                            value={selectValue}
                            onChange={handleSelectChange}
                            name="select-question"
                            required
                        >
                            <option value=""></option>
                            {questions.map(question => (
                                <option key={question._id} value={question._id}>
                                    {question.title}
                                </option>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl id="room-field" error>
                        <TextField
                            value={selectedRoom}
                            onChange={handleRoomChange}
                            label="Room ID"
                            type="number"
                            margin="normal"
                            variant="filled"
                            required
                        />
                    </FormControl>
                    <FormControl id="room-field" error>
                        <TextField
                            value={totalTime}
                            onChange={handleTimeChange}
                            label="Time"
                            type="number"
                            margin="normal"
                            variant="filled"
                            required
                        />
                    </FormControl>
                    <br />
                    <Button
                        type="submit"
                        color="primary"
                        variant="contained"
                        id="start-button"
                    >
                        Start
                    </Button>
                </Paper>
            </form>
            {questionHtml !== null? <Question questionHtml={questionHtml} width="70vw"/>: null}
        </div>
    );
};
