import React from 'react';
import SearchBox from './SearchBox';
import CustomTable from './CustomTable';
import {Button} from 'reactstrap';

class TableTask extends React.Component{

    render(){
        const { data, onDelete, onEdit, searchValue, onSearch} = this.props;
        debugger
        const fields = [
            { name: 'id', label: 'Id' },
            { name: 'name', label: 'Name' },
            { name: 'startDate', label: 'Start Date' },
            { name: 'endDate', label: 'End Date' },
            { name: 'duration', label: 'Duration' },                
            { name: 'id', label: 'Actions', render: (row) => {
                return (
                    <div>
                        <Button style={{padding:"5px"}}onClick={()=>onEdit(row.id)}>Edit</Button>
                        <Button style={{margin: "1px", padding:"5px"}} onClick={()=>onDelete(row.id)}>Delete</Button>  
                    </div>
                )}
            },
        ];
        // var size = data.length;
        const tableData = data.filter((tableData) => {  
        //    var data1 = fields.map((colData)=>{
        //         for (var index = 0; index < size; index++) {
        //             var v = data[index][colData.name];
        //             return v.toString.toLowerCase.includes(searchValue)
        //         }
        //         // return (tableData[colData.name].includes(searchValue))
        //     })
            return  (tableData.id.toString()).includes(searchValue.toString()) || 
                    (tableData.name.toLowerCase()).includes(searchValue.toLowerCase()) || 
                    (tableData.startDate).includes(searchValue) ||  
                    (tableData.endDate).includes(searchValue) || 
                    (tableData.duration.toString()).includes(searchValue.toString())
        })
        // console.log('tableData', tableData);
      
        return(
            <div>
                <SearchBox
                    searchValue={searchValue}
                    onSearch={onSearch}
                /> 
                <br/>
                <CustomTable 
                    onDelete={onDelete}
                    onEdit={onEdit}
                    fields={fields}
                    data={tableData}
                />
            </div>
        )
    }
}

export default TableTask;