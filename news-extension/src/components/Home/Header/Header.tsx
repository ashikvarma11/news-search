
import React from 'react';
type Props = {
    handleSearch: Function
}
const Header:React.FC<Props> = ({handleSearch}) => {
return (<>
<header className="container p-4 text-center">
      <input type="search" placeholder="Search News..." className="search" onKeyDown={(event)=>handleSearch(event)}/>
      </header>
</>)
}

export {Header};