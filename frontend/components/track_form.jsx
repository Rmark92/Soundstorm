import React from 'react';
import FaCamera from 'react-icons/lib/fa/camera';

export default class TrackForm extends React.Component {
  constructor(props) {
    super(props);
    this.updateFile = this.updateFile.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    const defaultState = { audioFile: null, audioURL: null, imageFile: null, imageURL: null, title: '', description: '' };
    this.state = Object.assign(this.props.track, defaultState);
  }

  updateFile(type) {
    return (event) => {
      const file = event.currentTarget.files[0];
      const fileReader = new FileReader();
      fileReader.onloadend = function () {
        this.setState({ [type + 'File']: file, [type + 'URL']: fileReader.result });
      }.bind(this);

      if (file) {
        fileReader.readAsDataURL(file);
      }
    }
  }
  //
  // updateFile(event) {
  //   const file = event.currentTarget.files[0];
  //   const fileReader = new FileReader();
  //   fileReader.onloadend = function () {
  //     this.setState({ audioFile: file, audioURL: fileReader.result });
  //   }.bind(this);
  //
  //   if (file) {
  //     fileReader.readAsDataURL(file);
  //   }
  // }

  updateImageFile(event) {
    const file = event.currentTarget.files[0];
    const fileReader = new FileReader();
    fileReader.onloadend = function () {
      this.setState({ audioFile: file, audioURL: fileReader.result });
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

    if (this.state.imageFile) {
      formData.append("track[image]", this.state.imageFile);
    }
    this.props.processForm(formData);
  }

  renderImageForm() {
    if (this.state.imageURL) {
      return (
        <img src={this.state.imageURL} className="track-image">
          <label htmlFor="image-file-input" id="image-file-input-label"><FaCamera id="camera-icon"></FaCamera>Update Image</label>
          <input id="image-file-input" type="file" onChange={this.updateFile('image')} className="inputfile"></input>
        </img>
      );
    } else {
      return (
        <div className="track-image-default">
          <label htmlFor="image-file-input" id="image-file-input-label"><FaCamera id="camera-icon"></FaCamera>Update Image</label>
          <input id="image-file-input" type="file" onChange={this.updateFile('image')} className="inputfile"></input>
        </div>
      );
    }
  }

  // setBackgroundImage() {
  //   if (this.state.imageURL) {
  //     return `background-image = {this.state.imageURL}`;
  //   }
  // }
  // background-image={this.state.imageURL || "inherit"}

  render() {
    return (
      <form id="track-form">
        <div id="track-form-audio-upload">
          <h2>Upload to SoundStorm</h2>
          <label htmlFor="audio-file-input" id="audio-file-input-label">Choose a file to upload</label>
          <input id="audio-file-input" type="file" onChange={this.updateFile('audio')} className="inputfile"></input>
        </div>
        <div id="track-form-details">
          {this.renderImageForm()}
          <ul id="track-form-text-details">
            <div id="track-form-title-input">
              <label htmlFor="title-input">Title</label>
              <input id="title-input" type="text" value={this.state.title} onChange={this.handleTextInput('title')}></input>
            </div>
            <div id="track-form-description-input">
              <label htmlFor="description-input">Description</label>
              <input id="description-input" type="textarea" value={this.state.description} onChange={this.handleTextInput('description')}></input>
            </div>
          </ul>
        </div>
        <button onClick={this.handleSubmit}>Save</button>
      </form>
    );
  }
}
