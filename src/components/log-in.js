import * as React from "react";
import { Redirect } from "react-router";
import jose from "node-jose";
import Cookie from "js-cookie";
import findToken from "../utils/find-token";

export default class LogIn extends React.PureComponent {
  render() {
    console.log(123);
    if (this.props.location.hash) {
      const hash = this.props.location.hash;
      const idToken = findToken(hash, "id_token");
      const payload = jose.util.base64url.decode(idToken.split(".")[1]);
      const userData = JSON.parse(payload);

      Cookie.set("userData", userData, { path: "/" });
    }

    return <Redirect to="/main" />;
  }
}
