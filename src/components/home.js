import * as React from "react";
import { Button } from "reactstrap";
import { CLIENT_ID, APP_URL } from "../keys";
import logo from "../assets/logo.svg";
import logob from "../assets/logo-b.svg";
import Auth from "./auth";
import {
  root,
  authButton,
  block,
  textGirl,
  imageGirl,
  blockWhite,
  imagePhone,
  textPhone,
  blockGreen,
  footer,
  rootLogo
} from "./home.scss";

export default class Home extends React.PureComponent {
  render() {
    const host = window.location.host;
    console.log(host);
    return (
      <div>
        <div className={root}>
          <img className={rootLogo} src={logo} />
          <a
            href={`https://${APP_URL}/login?response_type=token&client_id=${CLIENT_ID}&redirect_uri=http://${host}/log-in`}
          >
            <Button className={authButton}>sing up / sing in</Button>
          </a>
        </div>
        <div className={block}>
          <div className={textGirl}>
            <h2>Заголовок</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </div>
          <div className={imageGirl} />
        </div>

        <div className={blockWhite}>
          <div className={textPhone}>
            <h2>Заголовок</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </div>
          <div className={imagePhone} />
        </div>

        <div className={blockGreen}>
          <img className={rootLogo} src={logo} />
          <a
            href={`https://${APP_URL}/login?response_type=token&client_id=${CLIENT_ID}&redirect_uri=${host}/log-in`}
          >
            <Button className={authButton}>sing up / sing in</Button>
          </a>
        </div>

        <div className={footer}>
          <img src={logob} />
        </div>
      </div>
    );
  }
}
