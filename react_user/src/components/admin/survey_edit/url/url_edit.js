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
    const [message, setMessage] = useState(null);
    const [body, setBody] = useState({
        id: props.value._id,
        title: props.value.title,
        semester: props.value.result.semester,
        year: props.value.result.year,
        numberOfTakers: props.value.result.numberOfParts
    });
    const thisYear = new Date().getFullYear();

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
                                    Edit Description
                                </Accordion.Toggle>
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
                                    Edit Description: 
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
                                {/* <Form.Label column sm={2}>
                                    Semester:
                                </Form.Label>
                                <Col sm={4}>
                                    <Form.Control 
                                        as="select" 
                                        custom name="semester" 
                                        defaultValue={body.semester} 
                                        onChange={handleChange}>
                                    <option>Spring</option>
                                    <option>Fall</option>
                                    </Form.Control>
                                </Col> */}
                                <Form.Label column sm={2}>
                                    Year:
                                </Form.Label>
                                <Col sm={4}>
                                    <Form.Control 
                                        as="select" 
                                        custom name="year" 
                                        defaultValue={body.year} 
                                        onChange={handleChange}>
                                    <option>{thisYear - 1}</option>
                                    <option>{thisYear}</option>
                                    <option>{thisYear + 1}</option>
                                    <option>{thisYear + 2}</option>
                                    <option>{thisYear + 3}</option>
                                    </Form.Control>
                                </Col>
                                {/* <Col sm={4}>
                                    <Form.Label row="true" sm={2} className="p-2 font-weight-bold">
                                        {body.year}
                                    </Form.Label>
                                </Col> */}
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