import React from 'react';
import { withRouter } from 'react-router-dom';
import FaCamera from 'react-icons/lib/fa/camera';

class TrackForm extends React.Component {
  constructor(props) {
    super(props);
    this.updateFile = this.updateFile.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
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
    };
  }

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
    event.preventDefault();
    const formData = new FormData();
    formData.append("track[title]", this.state.title);
    formData.append("track[description]", this.state.description);

    if (this.state.audioFile) {
      formData.append("track[audio]", this.state.audioFile);
    }

    if (this.state.imageFile) {
      formData.append("track[image]", this.state.imageFile);
    }
    this.props.processForm(formData).then((track) => {
      this.props.history.push(`/tracks/${track.id}`);
    });
  }

  renderImage() {
    if (this.state.imageURL) {
      return (
        <div className="track-image">
          <img src={this.state.imageURL} />
          <label htmlFor="image-file-input" id="image-file-input-label"><FaCamera id="camera-icon"></FaCamera>Update Image</label>
          <input id="image-file-input" type="file" onChange={this.updateFile('image')} className="inputfile"></input>
        </div>
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

  handleCancel() {
    this.props.history.goBack();
  }

  // <div id="chosen-file-name">{this.state.audioFile ? this.state.audioFile.name : ''}</div>


  render() {
    return (
      <form id="track-form">
        <div id="track-form-audio-upload">
          <h2>Upload to SoundStorm</h2>
          <div id="chosen-file-name">{this.state.audioFile ? this.state.audioFile.name : ''}</div>
          <label htmlFor="audio-file-input" id="audio-file-input-label">Choose a file to upload</label>
          <input id="audio-file-input" type="file" onChange={this.updateFile('audio')} className="inputfile"></input>
        </div>
        <div id="track-form-details">
          {this.renderImage()}
          <ul id="track-form-text-details">
            <div id="track-form-title-input">
              <label htmlFor="title-input">Title</label>
              <input id="title-input" type="text" value={this.state.title} onChange={this.handleTextInput('title')}></input>
            </div>
            <div id="track-form-description-input">
              <label htmlFor="description-input">Description</label>
              <textarea id="description-input" value={this.state.description} onChange={this.handleTextInput('description')}></textarea>
            </div>
          </ul>
        </div>
        <div id="track-form-submit-buttons">
          <button onClick={this.handleCancel} id="track-form-cancel">Cancel</button>
          <button onClick={this.handleSubmit} id="track-form-submit">Save</button>
        </div>
      </form>
    );
  }
}

export default withRouter(TrackForm);
