import React from 'react';

class FormErrors extends React.Component{

    render(){
        const {formErrors} = this.props;

        return(
            <div className='formErrors'>
                {Object.keys(formErrors).map((fieldName) => {
                    if(formErrors[fieldName].length > 0){
                        return (
                        <span style={{color: 'red'}}> {formErrors[fieldName]}</span>
                        )        
                    } 
                    else {
                        return '';
                    }
                })}
            </div>
        )
    }
}

export default FormErrors;