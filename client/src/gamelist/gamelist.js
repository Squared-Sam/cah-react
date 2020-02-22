import React, {Component} from "react";
import Typography from "@material-ui/core/Typography";

class GameList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: null
    };
  }

  componentDidMount = async () => {
    const resp = await fetch("/users");
    const data = await resp.json();
    this.setState({users: data});
  };

  render() {
    return (
      <Typography variant="h2">Test</Typography>
    );
  }
}

export default GameList;
