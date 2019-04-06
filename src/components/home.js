import * as React from "react";
import { Button } from "reactstrap";
import Cookie from "js-cookie";
import { CLIENT_ID, APP_URL } from "../keys";
import logo from "../assets/logo.svg";
import logob from "../assets/logo-b.svg";
import { withRouter } from "react-router-dom";
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

class Home extends React.PureComponent {
  render() {
    const { origin, pathname } = window.location;

    return (
      <div>
        <div className={root}>
          <img className={rootLogo} src={logo} />
          <a
            href={`https://${APP_URL}/login?response_type=token&client_id=${CLIENT_ID}&redirect_uri=${origin}${pathname}`}
          >
            <Button className={authButton}>sing up / sing in</Button>
          </a>
        </div>
        <div className={block}>
          <div className={textGirl}>
            <h2>Всё самое классное совсем рядом</h2>
            <p>
              В мире всегда что-то происходит: интересные акции и мероприятия,
              отвязные вечеринки и уютные посиделки. Будь в курсе самых
              актуальных событий и самых популярных мест в два клика!
            </p>
          </div>
          <div className={imageGirl} />
        </div>

        <div className={blockWhite}>
          <div className={textPhone}>
            <h2>Расскажи о своей находке миру</h2>
            <p>
              Делай публикации понравившихся мест, чтобы поделиться ими с
              окружающими. Фотографии будут доступны не менее 24 часов.
              Предлевай жизнь чужим публикациям с помощью лайков, останутся
              только самые интересные 😋
            </p>
          </div>
          <div className={imagePhone} />
        </div>

        <div className={blockGreen}>
          <img className={rootLogo} src={logo} />
          <a
            href={`https://${APP_URL}/login?response_type=token&client_id=${CLIENT_ID}&redirect_uri=${origin}${pathname}`}
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

export default withRouter(Home);
