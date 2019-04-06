import React from "react";
import { Modal, ModalBody, ModalFooter } from "reactstrap";
import {
  image,
  body,
  modalFooter,
  container,
  button,
  mainText,
  childText
} from "./photo-view.scss";

import liked from "../assets/liked.svg";
import like from "../assets/like.svg";

export default class extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      value: false
    };

    this.addLike = () => {
      this.setState({ value: !this.state.value });
    };
  }

  render() {
    const { value } = this.state;
    const { open, onToggle, imageData } = this.props;
    return (
      <Modal isOpen={open} toggle={onToggle}>
        <ModalBody className={body}>
          <img className={image} src={imageData && imageData.imageUrl} />
        </ModalBody>

        <ModalFooter className={modalFooter}>
          <div className={container}>
            <p className={mainText}>Фото пропадет через</p>
            <p className={childText}>12:30</p>
          </div>

          {value ? (
            <img className={button} src={liked} onClick={this.addLike} />
          ) : (
            <img className={button} src={like} onClick={this.addLike} />
          )}

          <div className={container} style={{ alignItems: "flex-end" }}>
            <p className={mainText}>Адрес</p>
            <p className={childText}>123</p>
          </div>
        </ModalFooter>
      </Modal>
    );
  }
}
