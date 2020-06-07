import React, { useState } from 'react';

import Message from '../../message';

import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';    
 
function AddQuestion(props) {
    const [message, setMessage] = useState(null);
    const [body, setBody] = useState({
        title: "",
        input_type: "Rate",
        question_type: "1"
    });

    function handleChange(e) {
        e.preventDefault();
        setBody({ ...body, [e.target.name]: e.target.value });
    }

    function postQuestion(e) {
        e.preventDefault();
        if (body.title === "") {
            setMessage({
                msgBody: "Empty Question",
                msgError: true
            });
            return null
        }
        fetch("/users/surveys/"+props.name+"/create", {
           method: 'post',
           headers: { 'Content-Type': 'application/json' },
           body: JSON.stringify(body)
        }).then(data => {
            setTimeout(() => {
                props.onChangeHandle();
                setMessage(null);
                setBody({
                    title: "",
                    input_type: "Rate",
                    question_type: "1"
                });
            }, 750)
            setMessage({
                msgBody: "Question Set",
                msgError: false
            });
        }).catch(err => {
            setMessage({
                msgBody: "Can't set question.",
                msgError: true
            });
        });
    }

    return(     
        <Card className="shadow-sm mb-5 bg-white rounded" style={{ width: '100%' }}>
            <Card.Header as="h5" className="text-center">
                Add a new Question
            </Card.Header>
            <Card.Body>
            <Form>
                <Form.Group as={Row}>
                    <Col sm={10}>
                    <Form.Group as={Row}>
                        <Form.Label column sm={2}>
                            New Question: 
                        </Form.Label>
                        <Col sm={10}>
                            <Form.Control
                                as="textarea"
                                rows="2"
                                placeholder="Question"
                                name="title"
                                value={body.title}
                                onChange={handleChange}
                            />
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
                                value={body.input_type} 
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
                                value={body.question_type} 
                                onChange={handleChange}>
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            </Form.Control>
                        </Col>
                    </Form.Group>
                    </Col>
                    <Col sm={2}>
                        <div className="text-center">
                            <Button variant="primary" onClick={postQuestion}>
                                Add Question
                            </Button>    
                        </div>
                    </Col>
                </Form.Group>
                <div className="m-1 p-1">
                    {message ? <Message message={message} /> : null }
                </div>
            </Form>    
            </Card.Body>
        </Card>
    );
}

export default AddQuestion;