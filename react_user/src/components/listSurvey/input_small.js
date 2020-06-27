import React from 'react';

import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

function InputSmall(props) {
    return(
        <div style={{ "margin": "1px", "padding": "1px"}}>
            <Form.Control type="text" 
                        name={"question-"+props.number} 
                        num = {props.number-1} 
                        id={props.id}
                        placeholder="Leave blank if not applicable"
                        typeval="Short Answer"
                        onChange={props.handleChange}
                        />
        </div>
    );
}

export default InputSmall;