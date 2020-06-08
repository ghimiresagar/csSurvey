import React, { useState } from 'react';

import Message from '../../../message';

import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';    
 
function EditUrl(props) {
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
        fetch("/users/surveys/"+props.name+"/url", {
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

    function deleteSurvey(e) {
        e.preventDefault();

        fetch("/users/surveys/"+props.name+"/url/delete/"+props.value._id, {
            method: 'post'
        }).then(data => {
            setTimeout(() => {
                props.onChangeHandle();
                setMessage(null);
            }, 750);
            setMessage({
                msgBody: "Deleting",
                msgError: false
            });
        }).catch(err => console.log(err));
    }

    return(
        <Card className="shadow-sm mb-5 bg-white rounded" style={{ width: '100%' }}>
                <Card.Header as="h5" className="text-center"> 
                    {props.name} Survey 
                </Card.Header>
                <Card.Body>  
                        <Form>
                            <Form.Group as={Row}>
                                <Col sm={10}>
                                    <Form.Group as={Row}>
                                        <Form.Label column sm={2}>
                                            Edit Detail: 
                                        </Form.Label>
                                        <Col sm={10}>
                                        <Form.Control 
                                            as="textarea" 
                                            rows="4" 
                                            placeholder="Details" 
                                            name="title" 
                                            defaultValue={body.title} 
                                            onChange={handleChange} required/>
                                        </Col>
                                    </Form.Group>
                                    <Form.Group controlId="exampleForm.SelectCustom" as={Row}>
                                        <Form.Label column sm={2}>
                                            Semester:
                                        </Form.Label>
                                        <Col sm={4}>
                                            <Form.Control 
                                                as="select" 
                                                custom name="input_type" 
                                                defaultValue={props.input_type} 
                                                onChange={handleChange}>
                                            <option>Spring</option>
                                            <option>Fall</option>
                                            </Form.Control>
                                        </Col>
                                        <Form.Label column sm={2}>
                                            Year:
                                        </Form.Label>
                                        <Col sm={4}>
                                            <Form.Label row="true" sm={2} className="p-2 font-weight-bold">
                                                {body.question_type}
                                            </Form.Label>
                                        </Col>
                                    </Form.Group>
                                </Col>
                                <Col sm={2}>
                                <Card.Text className="text-center">
                                    <Button variant="primary m-2" onClick={updateQuestion}>Update Details</Button> 
                                    <Button variant="danger" className='m-2' onClick={deleteSurvey}>Close Survey</Button>    
                                </Card.Text>
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} >
                                <Col sm={2}>
                                Survey Link: 
                                </Col>
                                <Col sm={8}>
                                    <Card.Text>  
                                        {'http://127.0.0.1:3000/users/surveys/'+props.name+'/url/'+props.value._id}
                                    </Card.Text>
                                </Col>
                                <Col sm={2} className="text-center">
                                    <a href={'http://127.0.0.1:3000/users/surveys/'+props.name+'/url/'+props.value._id}>
                                        <Button variant="success">Preview Survey</Button>    
                                    </a>
                                </Col>
                                
                                <div className="m-1 p-1">
                                    {message ? <Message message={message} /> : null }
                                </div>
                            </Form.Group>
                        </Form>  
                </Card.Body>
            </Card>
    );
}

export default EditUrl;