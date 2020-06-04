import React from 'react';

import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function InputComment(props) {
    return(
        <Row>
            <Form.Control as="textarea" 
                        rows="3"
                        name={"question-"+props.number} 
                        num = {props.number-1} 
                        id={props.id}
                        onChange={props.handleChange}
                        required/>
        </Row>
    );
}

export default InputComment;