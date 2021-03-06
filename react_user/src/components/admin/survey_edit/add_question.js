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
        question_type: 0                    // 0 is never the question number
    });

    function handleChange(e) {
        e.preventDefault();
        setBody({ ...body, [e.target.name]: e.target.value, question_type: props.questionNumber });
    }

    function postQuestion(e) {
        e.preventDefault();
        if (body.title === "") {
            setTimeout(() => {
                setMessage(null);
            }, 1000)
            setMessage({
                msgBody: "Empty Question",
                msgError: true
            });
            return null
        }
        fetch("/surveys/"+props.name+"/create", {
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
                    question_type: 0
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
                Add a new Question or Instruction
            </Card.Header>
            <Card.Body>
            <Form>
                <Form.Group as={Row}>
                    <Col sm={10}>
                    <Form.Group as={Row}>
                        <Form.Label column sm={2}>
                            New Description: 
                        </Form.Label>
                        <Col sm={10}>
                            <Form.Control
                                as="textarea"
                                rows="2"
                                placeholder="Description"
                                name="title"
                                value={body.title}
                                onChange={handleChange}
                            />
                        </Col>
                    </Form.Group>
                    <Form.Group controlId="exampleForm.SelectCustom" as={Row}>
                        <Form.Label column sm={2}>
                            Type:
                        </Form.Label>
                        <Col sm={4}>
                            <Form.Control 
                                as="select" 
                                custom name="input_type" 
                                value={body.input_type} 
                                onChange={handleChange}
                                style={{"cursor": "pointer"}}>
                            <option>Rate</option>
                            <option>Short Answer</option>
                            <option>Longer Comment</option>
                            <option>Instruction</option>
                            </Form.Control>
                        </Col>
                    </Form.Group>
                    </Col>
                    <Col sm={2}>
                        <div className="text-center">
                            <Button variant="primary" onClick={postQuestion}>
                                Add
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