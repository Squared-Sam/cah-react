import React, {Component} from "react";
import ThemeProvider from "@material-ui/styles/ThemeProvider";
import "./App.css";
import {CssBaseline} from "@material-ui/core";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import {orange} from "@material-ui/core/colors";
import Homepage from "./homepage/homepage";

const theme = createMuiTheme({
  palette: {
    background: {
      default: "#383433",
      paper: "#222"
    },
    primary: orange
  }
});

class App extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline/>
        <Router>
          <Switch>
            <Route exact-path="/" children={<Homepage/>}/>
          </Switch>
        </Router>
      </ThemeProvider>
    );
  }
}

export default App;
