import React from 'react';
import { Link } from 'react-router-dom';

export default class SessionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { username: '', password: '' };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInput = this.handleInput.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.processForm(this.state).then( () => {
      this.props.closeModal();
    });
  }

  handleInput(inputType) {
    return (event) => {
      this.setState( { [inputType] : event.currentTarget.value });
    };
  }

  renderErrors() {
    return this.props.errors.map( (error, idx) => {
      return <div key={idx} class="error-message">{error}</div>;
    });
  }

  // renderErrors() {
  //   return this.props.errors.map( (error, idx) => {
  //     return <p class="error-message">*{error}</p>;
  //   })}
  // }

  render() {
    return (
      <div>
        <h2>{this.props.formType === 'login' ? 'Sign in' : 'Create your account'}</h2>
        <form id="session-form">
          <input onChange={this.handleInput('username')} value={this.state.username} placeholder='username'></input>
          <input type="password" onChange={this.handleInput('password')} value={this.state.password} placeholder='password'></input>
          <button onClick={this.handleSubmit}>Submit</button>
        </form>
        <div id="error-list">
          {this.renderErrors()}
        </div>
        <div id="other-options">
          {this.props.otherForm}
          <p>{"- or -"}</p>
          <p id="demo-link" onClick={this.props.demoLogin}>{"Sign in as demo user"}</p>
        </div>
      </div>
    );
  }
}

// {this.props.otherForm}
// <div id="demo-login-option">
//   <p>{" - or - "}</p>
//   <p{"Sign in as demo user"}
// </div>
