import React from 'react';

const SearchResult = ( { result, unsetFocus } ) => {
  const link = `#/${result.type.toLowerCase()}s/${result.id}`;
  return (
    <a className="search-result" href={link} onClick={unsetFocus}>
      <div className="search-result-left">
        <img src={result.imageURL}></img>
        <p>{result.name}</p>
      </div>
      <div className="search-result-right">
      </div>
    </a>
  );
};

export default SearchResult;
