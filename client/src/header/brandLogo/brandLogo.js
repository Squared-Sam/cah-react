import React, {Component} from "react";
import styled from "@material-ui/core/styles/styled";
import Link from "@material-ui/core/Link";
import {Link as RouterLink} from "react-router-dom";

const CustomLink = styled(Link)({
  position: "absolute",
  color: "#FFF",
  display: "inline-block",
  fontSize: "2.1em",
  padding: 0,
  textDecoration: "none"
});

class BrandLogo extends Component {
  render() {
    return (
      <CustomLink to="/" className="left" underline="none" id="logo-container" component={RouterLink}>Pretend Your
        Xyz</CustomLink>
    );
  }
}

export default BrandLogo;
