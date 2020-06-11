import React from 'react';

import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

function InputSmall(props) {
    return(
        <Row>
            <Form.Control type="text" 
                        name={"question-"+props.number} 
                        num = {props.number-1} 
                        id={props.id}
                        placeholder="Leave blank if not applicable"
                        typeval="Short Answer"
                        onChange={props.handleChange}
                        />
        </Row>
    );
}

export default InputSmall;