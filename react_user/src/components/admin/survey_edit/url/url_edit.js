import React, { useState } from 'react';

import Message from '../../../message';

import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';    
import Accordion from 'react-bootstrap/Accordion';
import Container from 'react-bootstrap/Container';
 
function EditUrl(props) {
    const years = [];

    for (let i = 2019; i < (new Date().getFullYear() + 5); i++) {
        years.push(
            <option key={i}>{i}</option>
        );      
    }

    const [message, setMessage] = useState(null);
    const [body, setBody] = useState({
        id: props.value._id,
        title: props.value.title,
        year: props.value.result.year,
        numberOfTakers: props.value.result.numberOfParts
    });

    function handleChange(e) {
        e.preventDefault();
        setBody({ ...body, [e.target.name]: e.target.value });
    }

    function updateDescription(e) {
        e.preventDefault();
        fetch("/surveys/"+props.name+"/url", {
           method: 'post',
           headers: { 'Content-Type': 'application/json' },
           body: JSON.stringify(body)
        }).then(data => {
            setTimeout(() => {
                props.onChangeHandle();
                setMessage(null);
            }, 750);
            setMessage({
                msgBody: "Updating",
                msgError: false
            });
        }).catch(err => console.log(err));
    }

    return(
        <Container className="mb-2">
            <Accordion>
                <Card>
                    <Card.Header className="bg-white">
                        <Row>
                            <Col sm={8}>
                                {props.name} Survey Description
                            </Col>
                            <Col sm={4} className="text-right">
                                <Accordion.Toggle as={Button} eventKey="0">
                                    <div style={{width: "100px"}}>Edit</div>
                                </Accordion.Toggle>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={12}>
                                Year: {body.year}
                            </Col>
                        </Row>
                    </Card.Header>
                    <Accordion.Collapse eventKey="0">
                    <Card.Body>
                    <Form>
                        <Form.Group as={Row}>
                        <Col sm={12}>
                            <Form.Group as={Row}>
                                <Form.Label column sm={2}>
                                    Description: 
                                </Form.Label>
                                <Col sm={10}>
                                <Form.Control 
                                    as="textarea" 
                                    rows="3" 
                                    placeholder="Details" 
                                    name="title" 
                                    defaultValue={body.title} 
                                    onChange={handleChange} required/>
                                </Col>
                            </Form.Group>
                            <Form.Group controlId="exampleForm.SelectCustom" as={Row}>
                                <Form.Label column sm={2}>
                                    Year:
                                </Form.Label>
                                <Col sm={4}>
                                    <Form.Control 
                                        as="select" 
                                        custom name="year" 
                                        defaultValue={body.year} 
                                        onChange={handleChange}>
                                        {years}
                                    </Form.Control>
                                </Col>
                            </Form.Group>
                            <Row>
                                <Col sm={12} className="text-center">
                                    <Button variant="primary m-1" onClick={updateDescription}>
                                        Update
                                    </Button>
                                </Col>
                            </Row>
                        </Col>
                        </Form.Group>
                        <div className="m-1 p-1">
                            {message ? <Message message={message} /> : null }
                        </div>
                    </Form>    
                    </Card.Body>
                    </Accordion.Collapse>
                </Card>
            </Accordion>
        </Container>
    );
}

export default EditUrl;