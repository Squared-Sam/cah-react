import React, {Component} from "react";
import ThemeProvider from "@material-ui/styles/ThemeProvider";
import "./App.css";
import {CssBaseline} from "@material-ui/core";
import {BrowserRouter as Router, Redirect, Route, Switch} from "react-router-dom";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import Homepage from "./homepage/homepage";
import Login from "./login/login";
import GameList from "./gamelist/gamelist";
import Header from "./header/header";

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
      fontWeight: 400
    },
    h4: {
      fontSize: "2.28rem",
      lineHeight: "110%",
      margin: "1.52rem 0 0.912rem 0",
      fontWeight: 400
    },
    h5: {
      fontSize: "1.64rem",
      lineHeight: "110%",
      margin: "1.0933333333rem 0 .656rem 0",
      fontWeight: 400
    },
    fontFamily: [
      "sans-serif"
    ].join(",")
  },
  palette: {
    primary: {main: "#9E9E9E"},
    secondary: {main: "#BBDEFB"}
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
    localStorage.setItem("userID", username);
  };

  loggedIn = () => {
    return this.state.userID !== null;
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

  storageAvailable(type) {
    let storage;
    try {
      storage = window[type];
      const x = "__storage_test__";
      storage.setItem(x, x);
      storage.removeItem(x);
      return true;
    } catch (e) {
      return e instanceof DOMException && (
        e.code === 22 ||
        e.code === 1014 ||
        e.name === "QuotaExceededError" ||
        e.name === "NS_ERROR_DOM_QUOTA_REACHED") &&
        (storage && storage.length !== 0);
    }
  }

  componentDidMount() {
    if (this.storageAvailable("localStorage")) {
      if (localStorage.getItem("userID") !== null) {
        this.setState({userID: localStorage.getItem("userID")});
      }
    }
  }

  render() {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline/>
        <Router>
          <Header/>
          <Switch>
            <this.ProtectedRoute path="/gamelist" children={<GameList/>}/>
            <Route path="/login" children={<Login handleLogin={this.handleLogin} loggedIn={this.loggedIn}/>}/>
            <Route exact-path="/" children={<Homepage/>}/>
          </Switch>
        </Router>
      </ThemeProvider>
    );
  }
}

export default App;
