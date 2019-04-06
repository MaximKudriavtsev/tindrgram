import * as React from "react";
import { Button } from "reactstrap";
import logo from "../assets/logo.svg";
import Auth from "./auth";
import { root, authButton } from "./home.scss";

export default class Home extends React.PureComponent {
  render() {
    return (
      <div className={root}>
        <img src={logo} />
        <Button className={authButton}>sing up / sing in</Button>
      </div>
    );
  }
}
