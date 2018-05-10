import React from 'react';

export default class TrackForm extends React.Component {
  constructor(props) {
    super(props);
    this.updateFile = this.updateFile.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = { audioFile: null, fileURL: null, title: '', description: '' };
  }

  updateFile(event) {
    const file = event.currentTarget.files[0];
    const fileReader = new FileReader();
    fileReader.onloadend = function () {
      this.setState({ audioFile: file, fileURL: fileReader.result });
    }.bind(this);

    if (file) {
      fileReader.readAsDataURL(file);
    }
  }

  handleTextInput(field) {
    return (event) => {
      this.setState({ [field]: event.target.value });
    };
  }

  handleSubmit(event) {
    const formData = new FormData();
    formData.append("track[title]", this.state.title);
    formData.append("track[description]", this.state.description);

    if (this.state.audioFile) {
      formData.append("track[audio]", this.state.audioFile);
    }
    this.props.processForm(formData);
  }

  render() {
    return (
      <form>
        <h2>Upload to soundstorm</h2>
        <label htmlFor="audio-file-input">Choose a file to upload</label>
        <input id="audio-file-input" type="file" onChange={this.updateFile}></input>
        <div id="image-upload-btn"></div>
        <label htmlFor="title-input">Title</label>
        <input id="title-input" type="text" value={this.state.title} onChange={this.handleTextInput('title')}></input>
        <label htmlFor="description-input">Description</label>
        <input id="description-input" type="textarea" value={this.state.description} onChange={this.handleTextInput('description')}></input>
        <button onClick={this.handleSubmit}>Save</button>
      </form>
    );
  }
}
