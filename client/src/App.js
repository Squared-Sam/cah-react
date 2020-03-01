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
import CreateLobby from "./createLobby/createLobby";
import GameLobby from "./gameLobby/gameLobby";

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
      userNickname: null
    };
  }

  handleLogin = (username) => {
    this.setState({userNickname: username});
    localStorage.setItem("userNickname", username);
  };

  loggedIn = () => {
    return this.state.userNickname !== false;
  };

  userIDSetup() {
    if (this.storageAvailable("localStorage")) {
      if (localStorage.getItem("userNickname") !== null) {
        this.setState({userNickname: localStorage.getItem("userNickname")});
      } else {
        this.setState({userNickname: false});
      }
    }
  }

  // authCheck = () => {
  //   console.log(this.state.userNickname !== false);
  //   return this.state.userNickname !== false;
  //   // if (this.state.userNickname === null) {
  //   //   // this.userIDSetup();
  //   //   return this.state.userNickname !== false;
  //   // } else {
  //   //   return this.state.userNickname !== false;
  //   // }
  // };

  ProtectedRoute = ({children, ...rest}) => {
    console.log("test");
    return (
      <Route
        {...rest}
        render={({location}) =>
          this.state.userNickname !== false ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: {from: location}
              }}
            />
          )
        }
      />
    );
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
    this.userIDSetup();
  }

  render() {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline/>
        <Router>
          <Header/>
          <Switch>
            <this.ProtectedRoute path="/lobby/:gameID" children={<GameLobby userID={this.state.userNickname}/>}/>
            <this.ProtectedRoute path="/create/lobby" children={<CreateLobby userID={this.state.userNickname}/>}/>
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
