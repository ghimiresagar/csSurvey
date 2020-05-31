import React from 'react';

import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function InputRate(props) {
    return(
        <fieldset>
            <Row>
                <Col sm={1}>
                    <Form.Check
                    type="radio"
                    name= {props.name}
                    value="1"
                    />
                </Col>
                <Col sm={1}>
                    <Form.Check
                    type="radio"
                    name={props.name}
                    value="2"
                    />
                </Col>
                <Col sm={1}>
                    <Form.Check
                    type="radio"
                    name={props.name}
                    value="3"
                    />
                </Col>
                <Col sm={1}>
                    <Form.Check
                    type="radio"
                    name={props.name}
                    value="4"
                    />
                </Col>
                <Col sm={1}>
                    <Form.Check
                    type="radio"
                    name={props.name}
                    value="5"
                    />
                </Col>
            </Row>
        </fieldset>
    );
}

export default InputRate;