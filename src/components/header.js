import React from "react";
import { Link } from "react-router-dom";
import logo2 from "../assets/logo2.svg";
import { header, logo, image } from "./header.scss";

export default class extends React.PureComponent {
  render() {
    return (
      <div className={header}>
        <div className={logo}>
          <Link to="/">
            <img className={image} src={logo2} />
          </Link>
        </div>
      </div>
    );
  }
}
