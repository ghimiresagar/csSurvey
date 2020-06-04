import React from 'react';

import Container from 'react-bootstrap/Container';
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
            title: this.props.value.title,
            input_type: this.props.value.input_type,
            question_type: this.props.value.question_type
        }
        // _id is never going to change, so don't put this on state
        // console.log(this.props.value._id)
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    updateQuestion = (e) => {
        e.preventDefault();

        // run after after validation
        let body = {
            id: this.props.value._id,
            title: this.state.title,
            input_type: this.state.input_type,
            question_type: this.state.question_type
        };
        fetch("/users/surveys/"+this.props.name+"/edit", {
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
        let body = {
            id: this.props.value._id
        }
        fetch("/users/surveys/"+this.props.name+"/delete", {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        }).then(function(data){
            console.log(data)
            window.location.reload(false);
        }).catch(err => console.log(err));
    }

    render() {
        return(     
            <Accordion>
                <Card>
                    <Card.Header>
                        <Container>
                            <Row>
                                <Col sm={10}>
                                    {this.props.value.title}
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
                                    <Form.Control as="textarea" rows="2" placeholder="Question" name="title" defaultValue={this.state.title} onChange={this.handleChange} required/>
                                    </Col>
                                </Form.Group>
                                <Form.Group controlId="exampleForm.SelectCustom" as={Row}>
                                    <Form.Label column sm={2}>
                                        Input Type:
                                    </Form.Label>
                                    <Col sm={4}>
                                        <Form.Control as="select" custom name="input_type" defaultValue={this.state.input_type} onChange={this.handleChange}>
                                        <option>Rate</option>
                                        <option>Input Small</option>
                                        <option>Input Comment</option>
                                        </Form.Control>
                                    </Col>
                                    <Form.Label column sm={2}>
                                        Question Type:
                                    </Form.Label>
                                    <Col sm={4}>
                                        <Form.Control as="select" custom name="question_type" defaultValue={this.state.question_type} onChange={this.handleChange}>
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
                                    <Button variant="primary m-1" onClick={this.updateQuestion}>
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