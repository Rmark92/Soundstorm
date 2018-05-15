import React from 'react';

export default class CommentForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { body: '' };
    this.handleInput = this.handleInput.bind(this);
  }

  handleInput(event) {
    // debugger;
    if (event.keyCode === 13) {
      this.props.createComment(this.props.trackId, { body: this.state.body });
      this.setState({ body: ''});
    } else {
      this.setState( { body: this.state.body + event.key });
    }
  }

  render() {
    return (
      <form>
        <textarea className="comment-text-area" onKeyDown={this.handleInput} value={this.state.body}></textarea>
      </form>
    );
  }
}
