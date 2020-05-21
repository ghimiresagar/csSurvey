import React from 'react';

import Card from 'react-bootstrap/Card';
import Accordion from 'react-bootstrap/Accordion';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';    
 
class AddQuestion extends React.Component {
    render() {
        return(     
            <Accordion className="text-center">
                <Card>
                    <Accordion.Toggle as={Card.Header} eventKey="0">
                    Add Question
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="0">
                    <Card.Body>
                    <Form>
                        <Form.Group as={Row}>
                            <Form.Label column sm={2}>
                                New Question: 
                            </Form.Label>
                            <Col sm={10}>
                            <Form.Control type="text" placeholder="Question" />
                            </Col>
                        </Form.Group>
                        <Form.Group controlId="exampleForm.SelectCustom" as={Row}>
                            <Form.Label column sm={2}>
                                Input Type:
                            </Form.Label>
                            <Col sm={4}>
                                <Form.Control as="select" custom>
                                <option>Rate</option>
                                <option>Input</option>
                                </Form.Control>
                            </Col>
                            <Form.Label column sm={2}>
                                Question Type:
                            </Form.Label>
                            <Col sm={4}>
                                <Form.Control as="select" custom>
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                </Form.Control>
                            </Col>
                        </Form.Group>
                        <div className="text-center">
                            <Button variant="primary" onClick={this.postQuery}>
                                Add Question
                            </Button>    
                        </div>
                    </Form>    
                    </Card.Body>
                    </Accordion.Collapse>
                </Card><br></br>
            </Accordion>
        );
    }
}

export default AddQuestion;