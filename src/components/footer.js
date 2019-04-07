import React from "react";
import FileInput from "react-fine-uploader/file-input";
import FineUploaderTraditional from "fine-uploader-wrappers";
import { FileUploader } from "devextreme-react";

import { footer, image } from "./footer.scss";
import addImage from "../assets/add-image.svg";

const uploader = new FineUploaderTraditional({
  options: {
    request: {
      endpoint:
        "https://b8yu7yk4hj.execute-api.eu-central-1.amazonaws.com/photo/save"
    }
  }
});

export default class extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      selectedFiles: []
    };

    this.onSelectedFilesChanged = this.onSelectedFilesChanged.bind(this);
  }
  onAddButtonClick() {
    console.log("add button");
  }

  onSelectedFilesChanged(e) {
    debugger;
    this.setState({ selectedFiles: e.value });
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

        <FileUploader
          multiple={false}
          uploadMode="instantly"
          accept="*"
          uploadMethod="POST"
          uploadHeaders={{ mode: "cors" }}
          uploadUrl="https://b8yu7yk4hj.execute-api.eu-central-1.amazonaws.com/photo/save"
          onValueChanged={this.onSelectedFilesChanged}
        />
      </div>
    );
  }
}
