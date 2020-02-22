import React, {Component} from "react";
import ThemeProvider from "@material-ui/styles/ThemeProvider";
import "./App.css";
import {CssBaseline} from "@material-ui/core";
import {BrowserRouter as Router, Redirect, Route, Switch} from "react-router-dom";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import {orange} from "@material-ui/core/colors";
import Homepage from "./homepage/homepage";
import Login from "./login/login";
import GameList from "./gamelist/gamelist";

const theme = createMuiTheme({
  typography: {
    h1: {
      fontSize: "4.2rem",
      lineHeight: "110%",
      margin: "2.8rem 0 1.68rem 0",
      fontWeight: 400
    },
    h3: {
      fontSize: "2.92rem",
      lineHeight: "110%",
      margin: "1.9466666667rem 0 1.168rem 0",
      fontWeight: 400,
      color: "white"
    },
    h4: {
      fontSize: "2.28rem",
      lineHeight: "110%",
      margin: "1.52rem 0 0.912rem 0",
      fontWeight: 400,
      color: "white"
    },
    h5: {
      fontSize: "1.64rem",
      lineHeight: "110%",
      margin: "1.0933333333rem 0 .656rem 0",
      fontWeight: 400,
      color: "white"
    },
    body1: {
      color: "white"
    },
    fontFamily: [
      "'Port Lligat Slab'",
      "sans-serif"
    ].join(",")
  },
  overrides: {
    body: {
      color: "white"
    }
  },
  palette: {
    background: {
      default: "#383433",
      paper: "#222"
    },
    primary: orange
  }
});

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userID: null
    };
  }

  handleLogin = (username) => {
    this.setState({userID: username});
  };

  ProtectedRoute = ({children, ...rest}) => {
    if (this.state.userID) {
      return (
        <Route {...rest} children={children}/>
      );
    } else {
      return (
        <Redirect to={{pathname: "/login"}}/>
      );
    }
  };

  render() {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline/>
        <Router>
          <Switch>
            <this.ProtectedRoute path="/gamelist" children={<GameList/>}/>
            <Route path="/login" children={<Login handleLogin={this.handleLogin}/>}/>
            <Route exact-path="/" children={<Homepage/>}/>
          </Switch>
        </Router>
      </ThemeProvider>
    );
  }
}

export default App;
