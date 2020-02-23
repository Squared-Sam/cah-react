import React, {Component} from "react";
import {withStyles} from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import BrandLogo from "./brandLogo/brandLogo";
import "./header.css";
import SideLinks from "./sideLinks/sideLinks";

const styles = theme => {
  return ({
    root: {
      flexGrow: 1,
      boxShadow: "0 2px 2px 0 rgba(0,0,0,0.14),0 3px 1px -2px rgba(0,0,0,0.12),0 1px 5px 0 rgba(0,0,0,0.2)"
    },
    title: {
      flexGrow: 1
    }
  });
};

const StyledAppBar = withStyles({
  root: {
    backgroundColor: "#222",
    width: "100%"
  }
})(AppBar);

class Header extends Component {
  render() {
    const {classes} = this.props;
    return (
      <div className={classes.root}>
        <StyledAppBar position="sticky">
          <Toolbar variant="dense">
            <div className="nav-wrapper container">
              <BrandLogo/>
              <SideLinks/>
            </div>
          </Toolbar>
        </StyledAppBar>
      </div>
    );
  }
}

export default withStyles(styles)(Header);
