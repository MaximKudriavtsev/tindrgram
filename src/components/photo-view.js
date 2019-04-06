import React from "react";
import { Button, Modal, ModalBody, ModalFooter } from "reactstrap";

import { image, body, modalContent } from "./photo-view.scss";

export default class extends React.PureComponent {
  render() {
    const { open, onToggle, imageData } = this.props;
    return (
      <Modal className={modalContent} isOpen={open} toggle={onToggle}>
        <ModalBody className={body}>
          <img className={image} src={imageData && imageData.imageUrl} />
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.toggle}>
            Do Something
          </Button>{" "}
          <Button color="secondary" onClick={this.toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}
