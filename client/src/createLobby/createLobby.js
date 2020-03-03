import React, {Component} from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Slider from "@material-ui/core/Slider";
import Api from "../Api";
import {Redirect} from "react-router-dom";

class CreateLobby extends Component {
  constructor(props) {
    super(props);

    this.state = {
      roomNameError: false,
      passwordError: false,
      buttonDisabled: true,
      maxPlayers: 4,
      switchToLobby: null
    };
  }

  validation = (element) => {
    let updates = {};
    if (element.minLength > element.value.length) {
      updates[`${element.id}Error`] = true;
      this.setState(updates);
      return false;
    } else if (element.maxLength < element.value.length) {
      updates[`${element.id}Error`] = true;
      this.setState(updates);
      return false;
    } else {
      updates[`${element.id}Error`] = false;
      this.setState(updates);
      return true;
    }
  };

  validationHandler = (e) => {
    this.validation(e.target);
    this.buttonValidation(e);
  };

  buttonValidation = (e) => {
    let errorFree = [];
    for (const elem of ["roomName", "password"]) {
      errorFree.push(this.validation(document.getElementById(elem)));
    }
    this.setState({buttonDisabled: (errorFree.includes(false))});
  };

  handleSlider = (event, value) => {
    this.setState({maxPlayers: value});
  };

  createLobby = async (e) => {
    e.preventDefault();
    const password = document.getElementById("password").value;
    let data = await Api.post("/game/create", {
      body: JSON.stringify({
        name: document.getElementById("roomName").value,
        maxPlayers: this.state.maxPlayers,
        packs: ["ALL OF THEM"],
        password: password,
        owner: this.props.userID
      }),
      headers: {
        "Content-Type": "application/json;charset=UTF-8"
      }
    });
    this.setState({switchToLobby: <Redirect push to={{pathname: `/lobby/${data.id}`, state: {password: password}}}/>});
  };

  render() {
    return (
      <Container component="main" maxWidth="xs">
        <Typography component="h1" variant="h5">Create a Lobby?</Typography>
        <form noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="roomName"
                label="Room Name"
                autoFocus
                inputProps={{minLength: "4", maxLength: "20"}}
                onKeyUp={this.validationHandler}
                error={this.state.roomNameError}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography id="discrete-slider" gutterBottom>
                Max Players
              </Typography>
              <Slider
                defaultValue={4}
                aria-labelledby="discrete-slider"
                valueLabelDisplay="auto"
                step={1}
                marks
                min={2}
                max={8}
                onChange={this.handleSlider}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                label="Game Pack"
                name="packs"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                label="Password"
                type="password"
                id="password"
                inputProps={{minLength: "4", maxLength: "20"}}
                error={this.state.passwordError}
                onKeyUp={this.validationHandler}
              />
            </Grid>
          </Grid>
          <Button
            type="submit" fullWidth variant="contained" color="primary"
            disabled={this.state.buttonDisabled} onClick={this.createLobby}>
            Create Lobby
          </Button>
          {this.state.switchToLobby}
        </form>
      </Container>
    );
  }
}

export default CreateLobby;
