import React, { Fragment } from "react";
import Paper from "@material-ui/core/Paper";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import Divider from "@material-ui/core/Divider";

import "./QuestionList.css";

export default props => {
    const displayQuestions = () => {
        return props.questions.map((question, i) => {
            return (
                <Fragment key={i}>
                    <ListItem button onClick={() => props.onItemClick(i)}>
                        <ListItemText
                            primary={question.title}
                            style={{ maxWidth: "85%" }}
                        />
                        <ListItemSecondaryAction>
                            <IconButton onClick={() => props.onEditClick(i)} edge="end">
                                <EditIcon/>
                            </IconButton>
                            <IconButton edge="end" onClick={() => props.onDeleteClick(i)}>
                                <DeleteIcon />
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                    <Divider variant="middle" component="li" />
                </Fragment>
            );
        });
    };

    return (
        <Paper id="questionListRoot" style={{ width: props.width || "70vw" }}>
            <Typography
                variant="h4"
                style={{
                    textAlign: "center",
                    fontFamily: "Montserrat",
                    marginTop: 10
                }}
            >
                ALL QUESTIONS
            </Typography>
            <div style={{ width: "80%", margin: "0 auto" }}>
                <List>{props.questions ? displayQuestions() : null}</List>
            </div>
        </Paper>
    );
};
