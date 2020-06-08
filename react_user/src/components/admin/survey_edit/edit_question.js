import React, { useState } from 'react';

import Message from '../../message';

import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Accordion from 'react-bootstrap/Accordion';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';    
 
function EditQuestion(props) {
    const [message, setMessage] = useState(null);
    const [body, setBody] = useState({
        id: props.value._id,
        title: props.value.title,
        input_type: props.value.input_type,
        question_type: props.value.question_type
    });

    function handleChange(e) {
        e.preventDefault();
        setBody({ ...body, [e.target.name]: e.target.value });
    }

    function updateQuestion(e) {
        e.preventDefault();
        if (body.title === "") {
            setMessage({
                msgBody: "Empty Question",
                msgError: true
            });
            return null
        }
        fetch("/users/surveys/"+props.name+"/edit", {
           method: 'post',
           headers: { 'Content-Type': 'application/json' },
           body: JSON.stringify(body)
        }).then(data => {
            setTimeout(() => {
                props.onChangeHandle();
                setMessage(null);
            }, 750)
            setMessage({
                msgBody: "Question Set",
                msgError: false
            });
        }).catch(err => {
            setMessage({
                msgBody: "Can't update question.",
                msgError: true
            });
        });
    }

    function deleteQuestion(e) {
        e.preventDefault();
        let body2 = {
            id: body.id
        }
        fetch("/users/surveys/"+props.name+"/delete", {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body2)
        }).then(data => {
            setTimeout(() => {
                props.onChangeHandle();
                setMessage(null);
            }, 750)
            setMessage({
                msgBody: "Question Deleted",
                msgError: false
            });
        }).catch(err => {
            setMessage({
                msgBody: "Can't delete question.",
                msgError: true
            });
        });
    }

    return(     
        <Accordion>
            <Card>
                <Card.Header>
                    <Container>
                        <Row>
                            <Col sm={10}>
                                {props.value.title}
                            </Col>
                            <Col sm={2} className="text-right">
                                <Accordion.Toggle as={Button} eventKey="0">
                                    Edit Question
                                </Accordion.Toggle>
                            </Col>
                        </Row>
                    </Container>
                </Card.Header>
                <Accordion.Collapse eventKey="0">
                <Card.Body>
                <Form>
                    <Form.Group as={Row}>
                        <Col sm={10}>
                            <Form.Group as={Row}>
                                <Form.Label column sm={2}>
                                    Edit Question: 
                                </Form.Label>
                                <Col sm={10}>
                                <Form.Control 
                                    as="textarea" 
                                    rows="2" 
                                    placeholder="Question" 
                                    name="title" 
                                    defaultValue={body.title} 
                                    onChange={handleChange} required/>
                                </Col>
                            </Form.Group>
                            <Form.Group controlId="exampleForm.SelectCustom" as={Row}>
                                <Form.Label column sm={2}>
                                    Input Type:
                                </Form.Label>
                                <Col sm={4}>
                                    <Form.Control 
                                        as="select" 
                                        custom name="input_type" 
                                        defaultValue={body.input_type} 
                                        onChange={handleChange}>
                                    <option>Rate</option>
                                    <option>Input Small</option>
                                    <option>Input Comment</option>
                                    </Form.Control>
                                </Col>
                                <Form.Label column sm={2}>
                                    Question Type:
                                </Form.Label>
                                <Col sm={4}>
                                    <Form.Control 
                                        as="select" 
                                        custom name="question_type" 
                                        defaultValue={body.question_type} 
                                        onChange={handleChange}>
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                    </Form.Control>
                                </Col>
                            </Form.Group>
                        </Col>
                        <Col sm={2}>
                            <div className="text-center">
                                <Button variant="primary m-1" onClick={updateQuestion}>
                                    Update
                                </Button>    
                                <Button variant="danger m-1" onClick={deleteQuestion}>
                                    Delete
                                </Button>
                            </div>
                        </Col>
                    </Form.Group>
                    <div className="m-1 p-1">
                        {message ? <Message message={message} /> : null }
                    </div>
                </Form>    
                </Card.Body>
                </Accordion.Collapse>
            </Card><br></br>
        </Accordion>
    );
}

export default EditQuestion;