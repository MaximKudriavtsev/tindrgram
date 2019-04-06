import React from "react";
import logo2 from "../assets/logo2.svg";
import { header, logo } from "./header.scss";

export default class extends React.PureComponent {
  render() {
    return (
      <div className={header}>
        <img className={logo} src={logo2} />
      </div>
    );
  }
}
