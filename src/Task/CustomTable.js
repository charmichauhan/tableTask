import React from 'react';
import {Table} from 'reactstrap';

class CustomTable extends React.Component{

    render(){
        const {fields, data} = this.props;
       
        const headers = fields.map(function(colData) {
            return <th key={colData.name}> {colData.label} </th>;
        });
        const rows = data.map(function(item) {
            const cells = fields.map(function(colData) {
                if (colData.render) return (<td> { colData.render(item) } </td>);
                return (
                    <td> {item[colData.name]} </td>
                );
            });
            return <tr key={item.id}> {cells} </tr>;
        });
        return(
            <div>
                <Table bordered hover>
                    <thead>{headers}</thead>
                    <tbody>{rows}</tbody>
                </Table>
            </div>
        )
    }
}

export default CustomTable;