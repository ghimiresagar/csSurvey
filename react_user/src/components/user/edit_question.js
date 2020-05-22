import React from 'react';

import Card from 'react-bootstrap/Card';
import Accordion from 'react-bootstrap/Accordion';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';    
 
class EditQuestion extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            title: "",
            input_type: "Rate",
            question_type: 1
        }
        console.log(this.props.value._id)
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    postQuestion = (e) => {
        e.preventDefault();

        // run after after validation
        let body = {
            title: this.state.title,
            input_type: this.state.input_type,
            question_type: this.state.question_type
        };
        fetch("http://localhost:9000/users/surveys/senior/edit", {
           method: 'post',
           headers: { 'Content-Type': 'application/json' },
           body: JSON.stringify(body)
        }).then(function(data){
            console.log(data)
            window.location.reload(false);
        }).catch(err => console.log(err));
    }

    deleteQuestion = (e) => {
        e.preventDefault();
        fetch("http://localhost:9000/users/surveys/senior/delete", {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(this.props.value._id)
        }).then(function(data){
            console.log(data)
            window.location.reload(false);
        }).catch(err => console.log(err));
    }

    render() {
        return(     
            <Accordion>
                <Card>
                    <Accordion.Toggle as={Card.Header} eventKey="0">
                    {this.props.value.title}
                    </Accordion.Toggle>
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
                                    <Form.Control type="text" placeholder="Question" name="title" defaultValue={this.props.value.title} onChange={this.handleChange} required/>
                                    </Col>
                                </Form.Group>
                                <Form.Group controlId="exampleForm.SelectCustom" as={Row}>
                                    <Form.Label column sm={2}>
                                        Input Type:
                                    </Form.Label>
                                    <Col sm={4}>
                                        <Form.Control as="select" custom name="input_type" value={this.props.value.input_type} onChange={this.handleChange}>
                                        <option>Rate</option>
                                        <option>Input</option>
                                        </Form.Control>
                                    </Col>
                                    <Form.Label column sm={2}>
                                        Question Type:
                                    </Form.Label>
                                    <Col sm={4}>
                                        <Form.Control as="select" custom name="question_type" value={this.props.value.question_type} onChange={this.handleChange}>
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
                                    <Button variant="primary m-1" onClick={this.postQuestion}>
                                        Update
                                    </Button>    
                                    <Button variant="danger m-1" onClick={this.deleteQuestion}>
                                        Delete
                                    </Button>
                                </div>
                            </Col>
                        </Form.Group>
                    </Form>    
                    </Card.Body>
                    </Accordion.Collapse>
                </Card><br></br>
            </Accordion>
        );
    }
}

export default EditQuestion;