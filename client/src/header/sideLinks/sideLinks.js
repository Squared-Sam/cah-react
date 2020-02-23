import React, {Component} from "react";
import styled from "@material-ui/core/styles/styled";
import List from "@material-ui/core/List";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";

const SList = styled(List)({
  paddingLeft: 0,
  listStyleType: "none",
  margin: 0,
  display: "block"
});

export const SListItem = styled(ListItem)({
  transition: "background-color .3s",
  listStyleType: "none",
  float: "left",
  padding: 0,
  height: "32px",
  color: "white",
  lineHeight: "32px"
});

export const SListItemText = styled(ListItemText)({
  transition: "background-color .3s",
  fontSize: "1rem",
  color: "#FFF",
  display: "block",
  padding: "0 15px",
  cursor: "pointer"
});

class SideLinks extends Component {
  render() {
    return (
      <SList id="nav" component="ul" className="right">
        <SListItem>
          <SListItemText primary="Logout"/>
        </SListItem>
      </SList>
    );
  }
}

export default SideLinks;
