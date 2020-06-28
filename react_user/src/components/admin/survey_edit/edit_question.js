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
        fetch("/surveys/"+props.name+"/edit", {
           method: 'post',
           headers: { 'Content-Type': 'application/json' },
           body: JSON.stringify(body)
        }).then(data => {
            setTimeout(() => {
                props.onChangeHandle();
                setMessage(null);
            }, 1000)
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

    function deleteQuestion(e) {                    // if deleted, operation on question number at backend
        e.preventDefault();
        let body2 = {
            id: body.id,
            num: body.question_type
        }
        fetch("/surveys/"+props.name+"/delete", {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body2)
        }).then(data => {
            setTimeout(() => {
                // props.onChangeHandle();
                setMessage(null);
                window.location.reload(false);
            }, 1000)
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

    async function takeStepUp(e) {
        e.preventDefault();
        let bodyInc = {
            id: body.id,
            surveyType: props.name,
            numUp: body.question_type - 1,
        };
        console.log(bodyInc);

        const fetchReq = await fetch("/surveys/questions/orderinc", {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(bodyInc)
        });
        const fetchReqJson = await fetchReq.json();
        if (fetchReqJson.value === true)
            window.location.reload(false);
        // props.onChangeHandle();
    }

    async function takeStepDown(e) {
        e.preventDefault();
        let bodyDec = {
            id: body.id,
            surveyType: props.name,
            numDown: body.question_type + 1,
        };
        console.log(bodyDec);

        const fetchReq = await fetch("/surveys/questions/orderdec", {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(bodyDec)
        });
        const fetchReqJson = await fetchReq.json();
        if (fetchReqJson.value === true)
            window.location.reload(false);
        // props.onChangeHandle();
    }

    console.log(props.num)
    return(     
        <Accordion>
            <Card>
                <Card.Header>
                    <Container>
                        <Row>
                            <Col sm={9}>
                                { props.value.input_type !== "Instruction" &&
                                    <div className="d-inline-block mr-1">
                                        {props.number}.
                                    </div>
                                }
                                {props.value.title}
                            </Col>
                            <Col sm={3}>
                                <Row className="justify-content-end">
                                    <Accordion.Toggle as={Button} eventKey="0">
                                        Edit Question
                                    </Accordion.Toggle>
                                    <div className="ml-2">
                                        { body.question_type !== 1 &&
                                            <Button variant="info" className="m-1" onClick={takeStepUp}>
                                                ↑
                                            </Button>
                                        }
                                        { body.question_type !== props.num &&
                                            <Button variant="info" className="m-1" onClick={takeStepDown}>
                                                ↓
                                            </Button>
                                        }
                                    </div>
                                </Row>
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
                                    <option>Short Answer</option>
                                    <option>Longer Comment</option>
                                    <option>Instruction</option>
                                    </Form.Control>
                                </Col>

                                {/* <Form.Label column sm={2}>
                                    Question Type:
                                </Form.Label>
                                <Form.Label row="true" sm={2} className="p-2 font-weight-bold">
                                    {body.question_type}
                                </Form.Label> */}

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