import React from 'react';

export default class UserShow extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchUser(this.props.userId);
  }

  componentWillReceiveProps(newProps) {
    if (this.props.userId !== newProps.userId ) {
      this.props.fetchUser(newProps.userId);
    }
  }

  render() {
    console.log(this.props);
    return (
      <div className="user-show">
      </div>
    );
  }
}
