import React from 'react';
import SearchResult from './search_result';

export default class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      showResults: false
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.setInputRef = this.setInputRef.bind(this);
  }

  setInputRef(node) {
    this.inputRef = node;
  }

  componentWillMount() {
    document.addEventListener('mousedown', this.handleClick, false);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClick, false);
  }

  handleClick(event) {
    this.setState({
      showResults: this.inputRef.contains(event.target)
    });
  }

  handleInputChange(event) {
    this.setState({ query: event.currentTarget.value });
    this.props.getSearchResults(event.currentTarget.value);
  }

  renderResults() {
    if (this.state.showResults) {
      return this.props.results.map( result => (
        <SearchResult key={`${result.type}-${result.id}`} result={result}></SearchResult>
      ));
    } else {
      return <div></div>;
    }
  }

  render() {
    return (
      <div>
        <div className="search-bar">
          <textarea ref={this.setInputRef}
                    value={this.state.query}
                    onChange={this.handleInputChange}></textarea>
        </div>
        <div className="search-results">
          {this.renderResults()}
        </div>
      </div>
    );
  }
}
