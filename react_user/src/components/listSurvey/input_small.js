import React from 'react';

import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function InputSmall(props) {
    return(
        <Row>
            <Form.Control type="text" 
                        name={"question-"+props.number} 
                        num = {props.number-1} 
                        id={props.id}
                        typeval="Input Small"
                        onChange={props.handleChange}
                        required/>
        </Row>
    );
}

export default InputSmall;