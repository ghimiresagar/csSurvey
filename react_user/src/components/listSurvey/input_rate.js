import React from 'react';

import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

function InputRate(props) {
    return(
        <Row>
            <Form.Check type="radio" 
                        name={"question-"+props.number} 
                        num = {props.number-1}
                        value={5} 
                        id={props.id}
                        typeval = "Rate"
                        onChange={props.handleChange}
                        required/>
            <Form.Check type="radio" 
                        name={"question-"+props.number} 
                        value={4} 
                        num = {props.number-1}
                        id={props.id}
                        typeval = "Rate"
                        onChange={props.handleChange}/>
            <Form.Check type="radio" 
                        name={"question-"+props.number} 
                        value={3} 
                        num = {props.number-1}
                        id={props.id}
                        typeval = "Rate"
                        onChange={props.handleChange}/>
            <Form.Check type="radio" 
                        name={"question-"+props.number} 
                        value={2} 
                        num = {props.number-1}
                        id={props.id}
                        typeval = "Rate"
                        onChange={props.handleChange}/>
            <Form.Check type="radio" 
                        name={"question-"+props.number} 
                        value={1} 
                        num = {props.number-1}
                        id={props.id}
                        typeval = "Rate"
                        onChange={props.handleChange}/>
        </Row>
    );
}

export default InputRate;