import React from 'react';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';

import InputRate from './input_rate';
import InputSmall from './input_small';
import InputComment from './input_comment';

function TakeQuestion(props) {
    return(
        <Container>
            <Row>
                <Col sm={1}>
                    {props.number}.
                </Col>
                {(props.value.input_type === "Rate") && 
                <>
                    <Col sm={9}>
                        {props.value.title}
                    </Col>
                    <Col sm={2}>
                        <InputRate number={props.number} id={props.value._id} handleChange={props.handleChange} />
                    </Col>
                </>
                }
                {(props.value.input_type === "Short Answer") && 
                <>
                    <Col sm={8}>
                        {props.value.title}
                    </Col>
                    <Col sm={3}>
                        <InputSmall number={props.number} id={props.value._id} handleChange={props.handleChange} />
                    </Col>
                </>
                }
                {(props.value.input_type === "Longer Comment") && 
                <>
                    <Col sm={5}>
                        {props.value.title}
                    </Col>
                    <Col sm={6}>
                        <InputComment number={props.number} id={props.value._id} handleChange={props.handleChange} />
                    </Col>
                </>
                }
            </Row> <hr />
        </Container>
    );
}

export default TakeQuestion;