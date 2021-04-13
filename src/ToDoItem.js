import React, { useState } from 'react';
import MenuList from '@material-ui/core/MenuList';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grow from '@material-ui/core/Grow';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    textAlign: 'left',
    color: theme.palette.text.secondary,
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row',
  },
}));

const ToDoItem = ({ name, secondName, timeout }) => {
  const classes = useStyles();

  return (
    <Grow in={true} unmountOnExit={true} style={{ transformOrigin: `0 0 0` }} {...{ timeout: timeout }}>
      <Paper
        elevation={3}
        className={classes.paper}
        style={{
          marginBottom: '2%',
        }}
      >
        {/* Todo item details */}
        <div>
          <Typography variant="h6">{name}</Typography>
          <Typography variant="subtitle1">{secondName}</Typography>
        </div>
        <div style={{ flexGrow: 1 }}></div>
        <img src={`https://avatars.dicebear.com/api/human/${name}.svg`} height="50" width="50" />
      </Paper>
    </Grow>
  );
};

export default ToDoItem;
