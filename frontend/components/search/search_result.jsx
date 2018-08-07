import React from 'react';
import MdGraphicEq from 'react-icons/lib/md/graphic-eq';
import FaUser from 'react-icons/lib/fa/user';


const SearchResult = ( { result, resetSearch } ) => {
  const link = `#/${result.type.toLowerCase()}s/${result.id}`;

  const renderIcon = () => {
    if (result.type === 'Track') {
      return <MdGraphicEq></MdGraphicEq>;
    } else {
      return <FaUser></FaUser>;
    }
  };
  
  return (
    <a className="search-result" href={link} onClick={resetSearch}>
      <div className="search-result-left">
        <img src={result.imageURL}></img>
        <p>{result.name}</p>
      </div>
      <div className="search-result-right">
        {renderIcon()}
      </div>
    </a>
  );
};

export default SearchResult;
