import * as React from "react";
import { Button } from "reactstrap";
import { CLIENT_ID, APP_URL } from "../keys";
import logo from "../assets/logo.svg";
import logob from "../assets/logo-b.svg";
import girlImage from "../../public/girl.png";
import photoImage from "../../public/phone.png";
import Auth from "./auth";
import { Parallax } from "react-scroll-parallax";
import { Image } from "react-scroll-parallax";

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
import { Position } from "devextreme-react/toast";

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
            <h2>Всё самое классное совсем рядом</h2>
            <p>
              В мире всегда что-то происходит: интересные акции и мероприятия,
              отвязные вечеринки и уютные посиделки. Будь в курсе самых
              актуальных событий и самых популярных мест в два клика!
            </p>
          </div>
          <div>
            <GirlParallaxImage />
          </div>
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
          <div>
            <PhotoParallaxImage />
          </div>
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

const GirlParallaxImage = () => (
  <Parallax className={imageGirl} y={[-50, 0]} tagOuter="figure">
    <img src={girlImage} style={{ width: "1500px" }} />
  </Parallax>
);

const PhotoParallaxImage = () => (
  <Parallax className={imagePhone} x={[-20, 20]} tagOuter="figure">
    <img src={photoImage} />
  </Parallax>
);
