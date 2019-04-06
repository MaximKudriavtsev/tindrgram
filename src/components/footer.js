import React from "react";
import FileInput from "react-fine-uploader/file-input";
import FineUploaderTraditional from "fine-uploader-wrappers";

import { footer, image } from "./footer.scss";
import addImage from "../assets/add-image.svg";

const uploader = new FineUploaderTraditional({
  options: {
    request: {
      endpoint: "my/upload/endpoint"
    }
  }
});

export default class extends React.PureComponent {
  onAddButtonClick() {
    console.log("add button");
  }

  render() {
    return (
      <div className={footer}>
        <FileInput multiple accept="image/*" uploader={uploader}>
          <img
            className={image}
            src={addImage}
            onClick={this.onAddButtonClick}
          />
        </FileInput>
      </div>
    );
  }
}
