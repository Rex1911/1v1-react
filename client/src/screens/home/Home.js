import React from "react";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";

import './Home.css'

export default (props) => {
    const handleClick = (i) => {
        props.history.push(`/compete/${i}`)
    }
    
    let buttons = [];
    for (let i = 1; i <= 9; i++) {
        buttons.push(
            <Button key={i} onClick = {() => handleClick(i)}>Room {i}</Button>
        );
    }

    return (
        <ButtonGroup
            variant="contained"
            color="primary"
            aria-label="full-width contained primary button group"
            id="buttonGroup"
        >
            {buttons}
        </ButtonGroup>
    );
};
