import React from 'react';
import FormErrors from './FormErrors';
import { Button, Form, FormGroup, Label, Input, Col } from 'reactstrap';

class FormDetails extends React.Component{
    
    render(){
        const { data, onChange, onSave, formErrors} = this.props;
        console.log('dataForm', data); 

        return(
            <Form>
                <h3>Enter details here...</h3>
                <br/>
                <FormGroup row >
                    <Label sm={3}> Name: </Label>
                    <Col sm={8} row >
                        <Input type="text" onChange={(e)=>onChange('name', e.target.value)} value={data.name}/>
                            <FormErrors formErrors={formErrors.name} />
                    </Col>
                </FormGroup>
                
                <FormGroup row>
                    <Label sm={3}> Start_Date: </Label>
                    <Col sm={8}>
                        <Input 
                            type="date" onChange={(e)=>onChange('startDate', e.target.value)} value={data.startDate}/>
                        <FormErrors formErrors={formErrors.startDate} />                                                        
                    </Col>
                </FormGroup>

                <FormGroup row >
                    <Label sm={3}> End_Date: </Label>
                    <Col sm={8}>
                        <Input type="date" onChange={(e)=>onChange('endDate', e.target.value)} value={data.endDate}/>
                        <FormErrors formErrors={formErrors.endDate} />                            
                    </Col>
                </FormGroup>

                <FormGroup row>
                    <Label sm={3}> Duration: </Label>
                    <Col sm={8}>
                        <Input type="number" onChange={(e)=>onChange('duration', e.target.value)}  value={data.duration}/>
                        <FormErrors formErrors={formErrors.duration} />
                    </Col>
                </FormGroup>

                <Button 
                    disabled={ data.name === "" || data.startDate === "" || data.endDate === "" || data.duration === "" ||
                                formErrors.name !== "" || formErrors.startDate !== "" || formErrors.endDate !== "" || formErrors.duration !== ""}
                    onClick={(e)=>onSave(e)}>Save
                </Button>
            </Form>
        )
    }
}

export default FormDetails;