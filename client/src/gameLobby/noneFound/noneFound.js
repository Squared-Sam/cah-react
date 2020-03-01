import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import {Link} from "react-router-dom";
import {Container} from "@material-ui/core";
import React, {Component} from "react";

class NoneFound extends Component {
  render() {
    return (
      <Container>
        <Typography variant="h2">Error</Typography>
        <Typography variant="h5">No game was found for that ID. Either, make sure you typed
          it in correctly or that the game still exists and wasn't deleted.</Typography>
        <Typography>If you want to create a lobby, please click
          <Button variant="contained" component={Link} to="/create/lobby">here</Button>
        </Typography>
      </Container>
    );
  }
}

export default NoneFound;
