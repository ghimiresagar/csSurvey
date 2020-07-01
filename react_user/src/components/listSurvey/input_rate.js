import React from 'react';

import Form from 'react-bootstrap/Form';

function InputRate(props) {

    const stylesRate = {
        width: "15%",
        padding: "1px",
        display: "inline-block",
        textAlign: "center"
    }

    return(
        <>
            <div style={ stylesRate }>
            <Form.Check type="radio" 
                        name={"question-"+props.number} 
                        num = {props.number-1}
                        value={5} 
                        id={props.id}
                        typeval = "Rate"
                        onChange={props.handleChange}
                        required/>
            </div>
            <div style={ stylesRate }>
            <Form.Check type="radio" 
                        name={"question-"+props.number} 
                        value={4} 
                        num = {props.number-1}
                        id={props.id}
                        typeval = "Rate"
                        onChange={props.handleChange}/>
            </div>
            <div style={ stylesRate }>
            <Form.Check type="radio" 
                        name={"question-"+props.number} 
                        value={3} 
                        num = {props.number-1}
                        id={props.id}
                        typeval = "Rate"
                        onChange={props.handleChange}/>
            </div>
            <div style={ stylesRate }>
            <Form.Check type="radio" 
                        name={"question-"+props.number} 
                        value={2} 
                        num = {props.number-1}
                        id={props.id}
                        typeval = "Rate"
                        onChange={props.handleChange}/>
            </div>
            <div style={ stylesRate }>
            <Form.Check type="radio" 
                        name={"question-"+props.number} 
                        value={1} 
                        num = {props.number-1}
                        id={props.id}
                        typeval = "Rate"
                        onChange={props.handleChange}/>
            </div>
        </>
    );
}

export default InputRate;