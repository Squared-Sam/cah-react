import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import {Link} from "react-router-dom";
import {Container} from "@material-ui/core";
import React, {Component} from "react";

class GameOptions extends Component {
  render() {
    return (
      <Container>
        {/*<Typography variant="h4">There are currently {this.state.users > 0 ? this.state.users : "no"} running*/}
        {/*  games</Typography>*/}
        <Button variant="contained" component={Link} to="/create/lobby">Create a lobby</Button>
      </Container>
    );
  }
}

export default GameOptions;
