import React, { useState } from 'react';

import Message from '../../../message';

import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';    
import Popover from 'react-bootstrap/Popover';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
 
function EditUrl(props) {
    const [message, setMessage] = useState(null);
    const [body, setBody] = useState({
        id: props.value._id,
        title: props.value.title,
        semester: props.value.result.semester,
        year: props.value.result.year,
        numberOfTakers: props.value.result.numberOfParts
    });

    function handleChange(e) {
        e.preventDefault();
        setBody({ ...body, [e.target.name]: e.target.value });
    }

    function updateQuestion(e) {
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

    function deleteSurvey(e) {
        e.preventDefault();
        fetch("/surveys/"+props.name+"/url/delete/"+props.urlId, {          // using id of url
            method: 'post'
        })
        .then(res => res.json())
        .then(data => {
            setTimeout(() => {
                props.onChangeHandle();
                setMessage(null);
            }, 1000);
            setMessage( data.message );
        }).catch(err => console.log(err));
    }

    function archiveSurvey(e) {
        e.preventDefault();

        fetch("/surveys/"+props.name+"/url/archive/"+props.value._id, {         // using id of detail
            method: 'post'
        })
        .then(res => res.json())
        .then(data => {
            setTimeout(() => {
                props.onChangeHandle();
                setMessage(null);
            }, 3000);
            setMessage( data.message );
        }).catch(err => console.log(err));
    }

    const popover = (
        <Popover id="popover-basic">
          <Popover.Title as="h3">Closing Survey</Popover.Title>
          <Popover.Content>
            After closing the survey you won't be able to <strong>update</strong> the results anymore. Double Click to close the survey.
          </Popover.Content>
        </Popover>
    );

    return(
        <Card className="shadow-sm mb-5 bg-white rounded" style={{ width: '100%' }}>
                <Card.Header as="h5" className="text-center"> 
                    {props.name} Survey : {props.num}
                </Card.Header>
                <Card.Body>  
                        <Form>
                            <Form.Group as={Row}>
                                <Col sm={10}>
                                    <Form.Group as={Row}>
                                        <Form.Label column sm={2}>
                                            Description: 
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
                                                custom name="semester" 
                                                defaultValue={body.semester} 
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
                                                {body.year}
                                            </Form.Label>
                                        </Col>
                                    </Form.Group>
                                </Col>
                                <Col sm={2}>
                                <Card.Text className="text-center">
                                    <Button variant="primary m-2" onClick={updateQuestion}>
                                        Update Details
                                    </Button> 
                                    <Button variant="warning" className='m-2' onClick={deleteSurvey}>
                                            Close Survey
                                        </Button>
                                    <OverlayTrigger trigger="click" placement="right" overlay={popover}>
                                        <Button variant="danger" className='m-2' onDoubleClick={archiveSurvey}>
                                            Archive Survey
                                        </Button>
                                    </OverlayTrigger>
                                </Card.Text>
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row}>
                                <Col sm={2}>
                                    Survey Takers:
                                </Col>
                                <Col sm={10}>
                                    {body.numberOfTakers}
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} >
                                <Col sm={2}>
                                Survey Link: 
                                </Col>
                                <Col sm={8}>
                                    <Card.Text>  
                                        {'http://127.0.0.1:3000/admin/surveys/'+props.name+'/url/'+props.urlId}
                                    </Card.Text>
                                </Col>
                                <Col sm={2} className="text-center">
                                    <a href={'http://127.0.0.1:3000/admin/surveys/'+props.name+'/url/'+props.urlId}>
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