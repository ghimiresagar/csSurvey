import React from 'react';

import Form from 'react-bootstrap/Form';

function InputComment(props) {
    return(
        <div style={{ "margin": "1px", "padding": "1px"}}>
            <Form.Control as="textarea" 
                        rows="3"
                        name={"question-"+props.number} 
                        num = {props.number-1} 
                        id={props.id}
                        typeval="Longer Comment"
                        placeholder="Leave blank if not applicable"
                        onChange={props.handleChange}
                        />
        </div>
    );
}

export default InputComment;