import React, {Component} from "react";
import {Link} from "react-router-dom";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

class Homepage extends Component {
  render() {
    return (
      <Container>
        <Typography variant="h2">A Cards Against Humanity clone</Typography>
        <Typography variant="h4">This webapp is still in development. There will be bugs, but hopefully they won't
          affect gameplay very much.</Typography>
        <Button variant="contained" component={Link} to="/login">I accept, let me game</Button>
        <Link to="/gamelist">GameList</Link>
      </Container>
    );
  }
}

export default Homepage;
