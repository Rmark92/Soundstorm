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
      return <li key={idx}>{error}</li>;
    });
  }

  render() {
    return (
      <div>
        <h2>{this.props.formType === 'login' ? 'Sign in' : 'Create your account'}</h2>
        <ul>
          {this.renderErrors()}
        </ul>
        <form id="session-form">
          <input onChange={this.handleInput('username')} value={this.state.username} placeholder='username'></input>
          <input onChange={this.handleInput('password')} value={this.state.password} placeholder='password'></input>
          <button onClick={this.handleSubmit}>Submit</button>
        </form>
        {this.props.otherForm}
      </div>
    );
  }
}

// <label>
//   Username:
//   <input onChange={this.handleInput('username')} value={this.state.username} placeholder='Username:'></input>
// </label>
//
// <label>
//   Password:
//   <input onChange={this.handleInput('password')} value={this.state.password} placeholder='Password:'></input>
// </label>
