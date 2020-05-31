import React from 'react';

// import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import InputRate from './input_rate';

function TakeQuestion(props) {
    return(
        <Container>
            <Row>
                <Col sm={1}>
                    {props.number}.
                </Col>
                <Col sm={9}>
                    {props.value.title}
                </Col>
                <Col sm={2}>
                    <InputRate name={"question-"+props.number+"-radio"}/>
                </Col>
            </Row> <hr />
        </Container>
    );
}

export default TakeQuestion;