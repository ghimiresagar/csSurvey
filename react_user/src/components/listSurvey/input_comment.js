import React from 'react';

import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

function InputComment(props) {
    return(
        <Row>
            <Form.Control as="textarea" 
                        rows="3"
                        name={"question-"+props.number} 
                        num = {props.number-1} 
                        id={props.id}
                        typeval="Input Comment"
                        onChange={props.handleChange}
                        required/>
        </Row>
    );
}

export default InputComment;