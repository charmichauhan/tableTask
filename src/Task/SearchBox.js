import React from 'react';
import { Input} from 'reactstrap';

class SearchBox extends React.Component{
    
    render(){
        const { searchValue, onSearch} = this.props;
        
        return(
            <div>
                <Input style={{width: '25%'}} placeholder="Search Here..." onChange={(e)=>onSearch(e.target.value)} value={searchValue}/>
           </div>
        )
    }
}

export default SearchBox;