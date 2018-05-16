import React from 'react';

export default class CommentForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { body: '' };
    this.submitted = false;
    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    if (event.keyCode === 13) {
      event.preventDefault();
      this.props.createComment(this.props.trackId, { body: this.state.body }).then( () => {
        this.setState( {body: ''});
      });
    }
  }

  handleInput(event) {
    if (this.submitted) {
      this.setState( {body: '' });
      this.submitted = false;
    } else {
      this.setState( { body: event.target.value });
    }
  }

  render() {
    if (this.props.currentUser) {
      return (
        <div className="comment-form-bar-large">
          <div className="user-avatar-comment-large">
            <img src={this.props.currentUser.imageURL}></img>
          </div>
          <form className="comment-submission-form-large">
            <input type="text"
                   placeholder="Write a comment..."
                   className="comment-text-area"
                   onChange={this.handleInput}
                   onKeyDown={this.handleSubmit}
                   value={this.state.body}></input>
          </form>
        </div>
      );
    } else {
      return <div></div>;
    }
  }
}

// <textarea className="comment-text-area" onChange={this.handleInput} onKeyDown={this.handleSubmit} value={this.state.body}></textarea>


// <button style={ { display: "none" } }></button>
