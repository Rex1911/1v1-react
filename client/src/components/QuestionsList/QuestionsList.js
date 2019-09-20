import React from 'react';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

import './QuestionList.css';

export default () => {
    return (
        <Paper id="questionListRoot">
            <Typography variant="h4" style={{textAlign:"center", fontFamily: 'Montserrat', marginTop: 10}}>
                All Questions
            </Typography>
            <List>
                <ListItem button>
                    <ListItemText primary="Hello 1" />
                    <ListItemSecondaryAction>
                        <IconButton edge="end">
                            <DeleteIcon />
                        </IconButton>
                    </ListItemSecondaryAction>
                </ListItem>
                <ListItem button>
                    <ListItemText primary="Hello 1" />
                    <ListItemSecondaryAction>
                        <IconButton edge="end">
                            <DeleteIcon />
                        </IconButton>
                    </ListItemSecondaryAction>
                </ListItem>
                <ListItem button>
                    <ListItemText primary="Hello 1" />
                    <ListItemSecondaryAction>
                        <IconButton edge="end">
                            <DeleteIcon />
                        </IconButton>
                    </ListItemSecondaryAction>
                </ListItem>
            </List>
        </Paper>
    )
}