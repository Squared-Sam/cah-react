import React, {Component} from "react";
import Typography from "@material-ui/core/Typography";
import {Container} from "@material-ui/core";
import Api from "../Api";

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
        <Typography variant="h2">Test</Typography>
      </Container>
    );
  }
}

export default GameList;
