import React, { useState } from "react";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Typography from '@material-ui/core/Typography';

import "./index.css";
import { TextField } from "@material-ui/core";

export default () => {
    const [selectValue, setSelectValue] = useState();
    const [selectedRoom, setSelectedRoom] = useState(1);

    const handleSelectChange = e => {
        setSelectValue(e.target.value);
    };

    const handleRoomChange = e => {
        if(e.target.value == 0) return;
        setSelectedRoom(e.target.value);
    };

    return (
        <div id="rootDiv">
            <form autoComplete="off">
                <Paper id="paper">
                    <Typography variant="h4" gutterBottom style={{fontFamily: 'Montserrat'}}>
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
                        >
                            <option value="" />
                            <option value={10}>Ten</option>
                            <option value={20}>Twenty</option>
                            <option value={30}>Thirty</option>
                        </Select>
                    </FormControl>
                    <FormControl id="room-field">
                        <TextField
                            value={selectedRoom}
                            onChange={handleRoomChange}
                            label="Room ID"
                            type="number"
                            margin="normal"
                            variant="filled"
                        />
                    </FormControl>
                    <br />
                    <Button color="primary" variant="contained" id="start-button">
                        Start
                    </Button>
                </Paper>
            </form>
        </div>
    );
};
