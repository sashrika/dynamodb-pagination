import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import ToDoItem from "./ToDoItem";
import AppBar from "@material-ui/core/AppBar";
import IconButton from "@material-ui/core/IconButton";
import ArrowForwardIcon from "@material-ui/icons/ArrowForwardIos";
import ArrowBackIcon from "@material-ui/icons/ArrowBackIos";
import Toolbar from "@material-ui/core/Toolbar";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import CssBaseline from "@material-ui/core/CssBaseline";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

import "./App.css";

const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
  },
  appbar: {
    alignItems: "center",
  },
}));

const themeLight = createMuiTheme({
  palette: {
    background: {
      default: "#D4E0E4",
    },
  },
});

const apiEndPoint = process.env.REACT_APP_API_URL

const Pagination = () => {  
  const classes = useStyles();
  const [list, setList] = useState([]);
  const [limit, setLimit] = useState(3);

  const [nextToken, setNextToken] = useState(undefined);//ForCurrentResult
  const [nextNextToken, setNextNextToken] = useState();//SendInNextQuery
  const [previousTokens, setPreviousTokens] = useState([]);  

  useEffect(() => {
    fetch(apiEndPoint, {
      method: "POST",
      body: JSON.stringify({
        LastEvaluatedKey: nextToken,
        limit: limit,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setNextNextToken(data.LastEvaluatedKey); // important
        data.Items.forEach(item => {
          item.key = item.PK + limit
        })
        setList(data.Items); // important
      })
      .catch((e) => console.log(e));
  }, [nextToken, limit]);

  const next = () => {
    setPreviousTokens((previousTokens) => [...previousTokens, nextToken]);
    setNextToken(nextNextToken);
  };

  const prev = () => {
    const previousTokensCopy = [...previousTokens];
    const tokenForPreviousFetch = previousTokensCopy.pop();
    setPreviousTokens(previousTokensCopy);
    setNextToken(tokenForPreviousFetch);
  };

  function handleLimitChange(e) {
    setNextToken(undefined);
    setPreviousTokens([]);
    setLimit(e.target.value);
  }

  return (
    <MuiThemeProvider theme={themeLight}>
      <CssBaseline />

      <AppBar position="static" className={classes.appbar}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            The Pagination App
          </Typography>
        </Toolbar>
      </AppBar>
      <Grid container spacing={0} className="main_container">
        <Grid item xs={12} sm={12} md={2} lg={2}></Grid>
        <Grid
          item
          xs={12}
          sm={12}
          md={8}
          lg={8}
          style={{padding: "2%" }}
        >
          <div id="btn_container">
            <Typography variant="subtitle1" style={{ marginRight: "2%" }}>
              Rows per page
            </Typography>
            <Select value={limit} disableUnderline onChange={handleLimitChange}>
              <MenuItem value={3}>3</MenuItem>
              <MenuItem value={5}>5</MenuItem>
              <MenuItem value={10}>10</MenuItem>
            </Select>
            <div style={{ flexGrow: 1 }} />
            <IconButton
              onClick={prev}
              className="pagination_btn"
              disableRipple
              style={{ padding: 0 }}
              disableFocusRipple
              disabled={previousTokens.length === 0}
            >
              <ArrowBackIcon />
            </IconButton>
            <p id="current_page">current page: {previousTokens.length + 1}</p>
            <IconButton
              onClick={next}
              className="pagination_btn"
              disableRipple
              disableFocusRipple
              disabled={!nextNextToken}
              style={{ padding: 0 }}
            >
              <ArrowForwardIcon />
            </IconButton>
          </div>
          {list.map((item, index) => {
            return (
              <ToDoItem
                key={item.key}
                timeout={250 * (index + 1)}
                name={item.PK}
                secondName={item.SK}
              />
            );
          })}
        </Grid>
      </Grid>
    </MuiThemeProvider>
  );
};

export default Pagination;
