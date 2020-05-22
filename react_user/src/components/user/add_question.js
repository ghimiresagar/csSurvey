import React from 'react';

import Card from 'react-bootstrap/Card';
import Accordion from 'react-bootstrap/Accordion';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';    
 
class AddQuestion extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            title: "",
            input_type: "Rate",
            question_type: 1
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    postQuestion = (e) => {
        e.preventDefault();
        let body = {
            title: this.state.title,
            input_type: this.state.input_type,
            question_type: this.state.question_type
        };
        fetch("http://localhost:9000/users/surveys/senior/create", {
           method: 'post',
           headers: { 'Content-Type': 'application/json' },
           body: JSON.stringify(body)
        }).then(function(data){
            console.log(data)
        }).catch(err => console.log(err));
        console.log("Button Clicked!");
    }

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
                            <Form.Control type="text" placeholder="Question" name="title" value={this.state.title} onChange={this.handleChange} />
                            </Col>
                        </Form.Group>
                        <Form.Group controlId="exampleForm.SelectCustom" as={Row}>
                            <Form.Label column sm={2}>
                                Input Type:
                            </Form.Label>
                            <Col sm={4}>
                                <Form.Control as="select" custom name="input_type" value={this.state.input_type} onChange={this.handleChange}>
                                <option>Rate</option>
                                <option>Input</option>
                                </Form.Control>
                            </Col>
                            <Form.Label column sm={2}>
                                Question Type:
                            </Form.Label>
                            <Col sm={4}>
                                <Form.Control as="select" custom name="question_type" value={this.state.question_type} onChange={this.handleChange}>
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                </Form.Control>
                            </Col>
                        </Form.Group>
                        <div className="text-center">
                            <Button variant="primary" onClick={this.postQuestion}>
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