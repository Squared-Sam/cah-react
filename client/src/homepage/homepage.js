import React, {Component} from "react";
import {CircularProgress} from "@material-ui/core";
import {Link} from "react-router-dom";
import Container from "@material-ui/core/Container";
import Api from "../Api";

class Homepage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: null
    };
  }

  componentDidMount = async () => {
    const resp = await Api.get("/users");
    this.setState({users: resp});
  };

  render() {
    if (this.state.users) {
      return (
        <Container>
          <div>
            <h1>Users</h1>
            {this.state.users.map(user =>
              <div key={user.id}>{user.username}</div>
            )}
            <Link to="/gamelist">GameList</Link>
          </div>
        </Container>
      );
    } else {
      return (
        <CircularProgress/>
      );
    }
  }
}

export default Homepage;
