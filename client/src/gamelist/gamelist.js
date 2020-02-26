import React, {Component} from "react";
import Typography from "@material-ui/core/Typography";
import {Container} from "@material-ui/core";
import Api from "../Api";
import {Link} from "react-router-dom";
import Button from "@material-ui/core/Button";

class GameList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: null
    };
  }

  componentDidMount = async () => {
    const resp = await Api.get("/game/list");
    this.setState({users: resp});
  };

  render() {
    return (
      <Container>
        <Typography variant="h2">Currently Running Games</Typography>
        <Typography variant="h4">There are currently {this.state.users > 0 ? this.state.users : "no"} running games</Typography>
        <Button variant="contained" component={Link} to="/create/lobby">Create a lobby</Button>
      </Container>
    );
  }
}

export default GameList;
