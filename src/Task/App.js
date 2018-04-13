import React from 'react';
import FormDetails from './Form';
import TableTask from './TableTask';
import moment from 'moment';
import {Card} from 'material-ui';

let id = 1;
const defaultData = {
    id:'',
    name:'',
    startDate:'',
    endDate:'',
    duration:''
}

class App extends React.Component{
    constructor(props){
        super(props)

        this.state = {
            formData: {...defaultData},
            data: new Array(10).fill({}).map((o, i) => ({
                    id: id++,
                    name: `Task ${i+1}`,
                    startDate: moment().add(i, 'day').format('YYYY-MM-DD'),
                    endDate: moment().add(i+12, 'day').format('YYYY-MM-DD'),
                    duration: 12,
            })),
            formErrors: { 
                id: '',
                name: '', 
                startDate: '', 
                endDate:'', 
                duration:''
            },
            searchValue:"",
        };
    }

    onChange (key, value){
        const {formData} = this.state;
        formData[key] = value;
        if(key === "endDate" || key === "startDate"){
            const endDate = formData.endDate;
            const startDate = formData.startDate;
            const durationText = this.calcDuration(startDate, endDate);
            formData.duration = durationText
        }
        this.setState({formData},
            ()=> { this.validateField(key, value) }
        );
    }

    onSearch(value){
        this.setState({searchValue: value})
    }

    findIndex(id) {
        const {data} = this.state;
        return data.findIndex(i => i.id === id);
    }
 
    onSave (e){
        e.preventDefault();
        const {data, formData} = this.state;
        if(formData.id){
            //edit
            const formIndex = this.findIndex(formData.id)
            data[formIndex] = formData;   
        }
        else{
            //add
            formData.id = id++;
            data.push(formData);
        }
        this.setState({ data: [...data], formData: {...defaultData} });
    }

    onDelete (id){
        const { data } = this.state;
        const formIndex = this.findIndex(id);
        data.splice(formIndex, 1);
        this.setState({ data: [...data] });
    }

    onEdit (id){
        const { data } = this.state;
        const findIndex = this.findIndex(id);
        this.setState({ formData: {...data[findIndex]} });     
    }

    validateField(fieldName, value) {
        let {formErrors, formData} = this.state;
        let nameValid;
        switch(fieldName) {
            case 'name':
                nameValid = value.match(/^[a-zA-Z]+$/);
                formErrors.name = !nameValid ? 'invalid field' : '';
                break;
            case 'startDate':
                formErrors.startDate = formData.duration <= 0 ? 'startdate should be lesser than enddate' : '';
                break;
            case 'endDate':
                formErrors.endDate = formData.duration <= 0 ? 'endDate should be greater than startdate': '';
                break;
            default:
                break;
        }
        this.setState({
            formErrors: formErrors,
            nameValid,
        });
      }
    
      calcDuration(startDate, endDate){
        let {Days} = this.state;
        const endDate1 = moment(endDate);
        const startDate1 = moment(startDate);
        Days = endDate1.diff(startDate1, 'days');
        return Days
    }

    render(){
        const {data, formErrors, formData, searchValue} = this.state;
        console.log('dataApp', data);
        
        return(
            <div style={{margin: '150px'}} >    
                {/* <h1 style={{paddingLeft: '700px'}} > My Application </h1> */}
                <br /> <br />
               
                <div style={{float:'left'}}>
                    <Card style={{padding:"50px"}}>
                        <FormDetails
                            formErrors={formErrors}
                            data={formData}     
                            onChange={(key, value)=>this.onChange(key, value)}
                            onSave={(e)=>this.onSave(e)}
                        />
                    </Card>
                </div>
                
                <div style={{float:'right'}}>
                    <Card style={{padding:"50px"}}>
                        <TableTask 
                            data={data}
                            onDelete={(id)=>this.onDelete(id)}
                            onEdit={(id)=>this.onEdit(id)}     
                            onSearch={(value)=>this.onSearch(value)} 
                            searchValue={searchValue}                     
                        />
                    </Card>
                </div>
            </div>
        )
    }
}

export default App;
