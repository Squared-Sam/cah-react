import React, {Component} from "react";
import Typography from "@material-ui/core/Typography";
import {Container} from "@material-ui/core";
import Api from "../Api";
import {withRouter} from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";
import NoneFound from "./noneFound/noneFound";
import GameOptions from "./gameOptions/gameOptions";
import GameField from "./gameField/gameField";

class GameLobby extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userID: this.props.userID,
      password: null,
      notFound: false,
      joinData: null,
      isOwner: false,
      haveStarted: false
    };
  }

  join = async () => {
    const resp = await Api.post("/game/join", {
      body: JSON.stringify({
        gameID: this.props.match.params.gameID,
        password: this.state.password,
        nickname: this.props.userID
      }),
      headers: {
        "Content-Type": "application/json;charset=UTF-8"
      }
    });
    if (Object.keys(resp).includes("error")) {
      if (resp.errorID === 404) {
        this.setState({notFound: true});
      }
    }
    this.setState({joinData: resp});
    this.setState({isOwner: this.state.joinData.owner});
  };

  componentDidMount = async () => {
    if (this.props.location.state !== undefined) {
      await this.setState({password: this.props.location.state.password});
    }
    await this.join();
  };

  render() {
    if (this.state.joinData === null) {
      return (
        <Container>
          <CircularProgress/>
        </Container>
      );
    }

    if (this.state.notFound) {
      return (
        <NoneFound/>
      );
    }

    return (
      <Container>
        <Typography variant="h2">Joined {this.state.joinData.gameName}</Typography>
        {!this.state.haveStarted ? <GameOptions isOwner={this.state.isOwner}/> : <GameField/>}
      </Container>
    );
  }
}

export default withRouter(GameLobby);
