import React from 'react';

import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

function InputRate(props) {
    return(
        <Row className="justify-content-center">
            <div className="m-2">
            <Form.Check type="radio" 
                        name={"question-"+props.number} 
                        num = {props.number-1}
                        value={5} 
                        id={props.id}
                        typeval = "Rate"
                        onChange={props.handleChange}
                        required/>
            </div>
            <div className="m-2">
            <Form.Check type="radio" 
                        name={"question-"+props.number} 
                        value={4} 
                        num = {props.number-1}
                        id={props.id}
                        typeval = "Rate"
                        onChange={props.handleChange}/>
            </div>
            <div className="m-2">
            <Form.Check type="radio" 
                        name={"question-"+props.number} 
                        value={3} 
                        num = {props.number-1}
                        id={props.id}
                        typeval = "Rate"
                        onChange={props.handleChange}/>
            </div>
            <div className="m-2">
            <Form.Check type="radio" 
                        name={"question-"+props.number} 
                        value={2} 
                        num = {props.number-1}
                        id={props.id}
                        typeval = "Rate"
                        onChange={props.handleChange}/>
            </div>
            <div className="m-2">
            <Form.Check type="radio" 
                        name={"question-"+props.number} 
                        value={1} 
                        num = {props.number-1}
                        id={props.id}
                        typeval = "Rate"
                        onChange={props.handleChange}/>
            </div>
            <div className="m-2">
            <Form.Check type="radio" 
                        name={"question-"+props.number} 
                        num = {props.number-1}
                        value={0} 
                        id={props.id}
                        typeval = "Rate"
                        onChange={props.handleChange}
                        required/>
            </div>
        </Row>
    );
}

export default InputRate;