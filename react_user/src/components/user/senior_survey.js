import React from 'react';

import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Accordion from 'react-bootstrap/Accordion';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

class SeniorSurvey extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            count: 0,
            res_questions: []
        };
        this.postQuery = this.postQuery.bind(this);
    }

    componentWillMount(){
        this.getQuery()
            .then(body => this.setState({
                count: body.number_question,
                res_questions: Object.keys(body.question).map(keys => body.question[keys].title)
            }))
            .catch(err => console.log(err));
    }

    getQuery = async () => {
        const data = await fetch("http://localhost:9000/users/surveys/senior/edit");
        const body = await data.json();
        return body;
    }

    postQuery = (e) => {
        e.preventDefault();
        fetch("http://localhost:9000/users/surveys/senior/create", {
           method: 'post',
           body: e
        }).then(function(data){
            console.log(data);
        });
        console.log("Button Clicked!");

        // then(function(response) {
        //     return response.json();
        // }).
    }

    render(){
        const questions = []
        for (const [x, y] of this.state.res_questions.entries()) {
            questions.push(
                <Accordion>
                    <Card>
                        <Accordion.Toggle as={Card.Header} eventKey="0">
                        {y}
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="0">
                        <Card.Body>
                            
                        </Card.Body>
                        </Accordion.Collapse>
                    </Card><br></br>
                </Accordion>
            )
          }
        return(
            <Container>
                {/* Adding new question part. */}
                <Accordion className="text-center">
                    <Card>
                        <Accordion.Toggle as={Card.Header} eventKey="0">
                        Add Question
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="0">
                        <Card.Body>
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
                        </Card.Body>
                        </Accordion.Collapse>
                    </Card><br></br>
                </Accordion>
                {questions}
            </Container>
        );
    }
}

export default SeniorSurvey;