import React from "react";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Paper from "@material-ui/core/Paper";
import Typogrpahy from '@material-ui/core/Typography';

export default props => {
    const handleClick = i => {
        props.history.push(`/compete/${i}`);
    };

    let buttons = [];
    for (let i = 1; i <= 9; i++) {
        buttons.push(
            <Button key={i} onClick={() => handleClick(i)}>
                Room {i}
            </Button>
        );
    }

    return (
        <div style={{height: '100vh'}}>
            <Paper style={{width: '70vw', margin: '20vh auto', textAlign: 'center'}}>
                <Typogrpahy variant="h4" style={{padding: 20}}>Welcome to Clash of Codes</Typogrpahy>
                <Typogrpahy variant="h5" style={{padding: 20}}>Please select a room</Typogrpahy>
                <ButtonGroup
                    variant="contained"
                    color="primary"
                    aria-label="full-width contained primary button group"
                    id="buttonGroup"
                    style={{marginBottom: 30}}
                >
                    {buttons}
                </ButtonGroup>
            </Paper>
        </div>
    );
};
