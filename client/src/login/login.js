import React, {Component} from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import AccountCircle from "@material-ui/icons/AccountCircle";
import TextField from "@material-ui/core/TextField";
import {Redirect} from "react-router-dom";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loggedIn: false
    };
  }

  handleInput = (event) => {
    if (event.key === "Enter") {
      this.props.handleLogin(event.target.value);
      this.setState({loggedIn: true});
    }
  };

  render() {
    if (this.state.loggedIn) {
      return (
        <Redirect push to="/"/>
      );
    }

    return (
      <div>
        <Typography variant="h3">Pretend You're Gaming</Typography>
        <Typography variant="body1">This webapp is still in development. There will be bugs</Typography>
        <Grid container spacing={1} alignItems="flex-end">
          <Grid item>
            <AccountCircle />
          </Grid>
          <Grid item>
            <TextField id="input-with-icon-grid" label="Username" onKeyUp={this.handleInput} />
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default Login;
