import React from 'react';

const SearchResult = ( { result } ) => {
  const link = `/${result.type.toLowerCase()}s/${result.id}`;
  return (
    <a className="search-result" href={link}>
      <img src={result.imageURL}></img>
      <p>{result.name}</p>
    </a>
  );
};

export default SearchResult;
