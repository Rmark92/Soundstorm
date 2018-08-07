import React from 'react';
import SearchResult from './search_result';

export default class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      showResults: false,
      inputBackground: '#e5e5e5'
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.setInputRef = this.setInputRef.bind(this);
    this.setFocus = this.setFocus.bind(this);
    this.unsetFocus = this.unsetFocus.bind(this);
    this.reset = this.reset.bind(this);
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
    if (this.inputRef.contains(event.target)) {
      this.setFocus();
    } else {
      this.unsetFocus();
    }
  }

  setFocus() {
    this.setState( { showResults: true, inputBackground: '#fff' } );
  }

  unsetFocus() {
    this.setState( { showResults: false, inputBackground: '#e5e5e5' } );
  }

  reset() {
    this.setState( { showResults: false, inputBackground: '#e5e5e5', query: '' } );
    this.props.clearSearchResults();
  }

  handleInputChange(event) {
    this.setState({ query: event.currentTarget.value });
    this.props.getSearchResults(event.currentTarget.value);
  }

  renderResults() {
    if (this.state.showResults) {
      const results = this.props.results.map( result => (
        <SearchResult key={`${result.type}-${result.id}`}
                      result={result}
                      resetSearch={this.reset}></SearchResult>
      ));
      return (
        <div className="search-results">
          {results}
        </div>
      );
    } else {
      return <div></div>;
    }
  }

  render() {
    return (
      <div className="search" ref={this.setInputRef}>
        <div className="search-bar">
          <input
                 type="text"
                 style={ { backgroundColor: this.state.inputBackground}}
                 placeholder="Search"
                 value={this.state.query}
                 onChange={this.handleInputChange}></input>
        </div>
        {this.renderResults()}
      </div>
    );
  }
}
