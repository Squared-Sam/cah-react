import React, {Component} from "react";
import Typography from "@material-ui/core/Typography";
import {Container} from "@material-ui/core";

class GameList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: null
    };
  }

  componentDidMount = async () => {
    const resp = await fetch("/list");
    const data = await resp.json();
    this.setState({users: data});
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
