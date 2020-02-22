import React, {Component} from "react";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      users: null
    };
  }

  componentDidMount = async () => {
    const resp = await fetch("/users");
    this.setState({users: resp.json()});
  };

  render() {
    return (
      <div className="App">
        <h1>Users</h1>
        {this.state.users.map(user =>
          <div key={user.id}>{user.username}</div>
        )}
      </div>
    );
  }
}

export default App;
