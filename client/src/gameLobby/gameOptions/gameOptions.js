import {Container} from "@material-ui/core";
import React, {Component} from "react";
import ScoreLimit from "./scoreLimit/scoreLimit";

class GameOptions extends Component {
  constructor(props) {
    super(props);

    this.state = {
      scoreLimit: 8,
      playerLimit: 4,
      idleTime: 60,
      cardSets: [],
      password: null,
      passwordHidden: true
    };
  }

  handlePlayerLimitChange = (event) => {
    this.setState({playerLimit: event.target.value});
  };

  render() {
    return (
      <Container>
        <form noValidate>
          <ScoreLimit playerLimit={this.state.playerLimit} handlePlayerLimitChange={this.handlePlayerLimitChange}/>
        </form>
      </Container>
    );
  }
}

export default GameOptions;
