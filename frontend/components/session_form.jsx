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
      this.props.history.push('/');
    });
  }

  handleInput(inputType) {
    return (event) => {
      this.setState( { [inputType] : event.currentTarget.value });
    };
  }

  renderOtherOption() {
    if (this.props.formType === "log_in") {
      return (
        <p>
          Don't have an account?
          <Link to="/signup">Sign Up</Link>
        </p>
      );
    } else {
      return (
        <p>
          Already have an account?
          <Link to="/login">Log In</Link>
        </p>
      );
    }
  }

  renderErrors() {
    return this.props.errors.map( (error, idx) => {
      return <li key={idx}>{error}</li>;
    });
  }

  render() {
    return (
      <div>
        <h2>{ this.props.formType === "sign_up" ? "Sign Up" : "Log In"}</h2>
        <ul>
          {this.renderErrors()}
        </ul>
        <form>
          <label>
            Username:
            <input onChange={this.handleInput('username')} value={this.state.username}></input>
          </label>

          <label>
            Password:
            <input onChange={this.handleInput('password')} value={this.state.password}></input>
          </label>

          <button onClick={this.handleSubmit}>Submit</button>
        </form>
        {this.renderOtherOption()}
      </div>
    );
  }
}
