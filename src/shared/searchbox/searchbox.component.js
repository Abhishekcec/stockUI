import React from 'react'
import "./searchbox.component.css"

function SearchBox(props) {
  return (
      <div className='search-component'>
          <input
              className='search-input-field'
              value={props.companyCode}
              onChange={(event) => props.onSearchChanged(event)}
          >
          </input>
          
          <button
              className='search-button'
              onClick={(event)=>{props.onSearchClicked(event)}}
         >Search</button>
    </div>
    );
} 
export default SearchBox;