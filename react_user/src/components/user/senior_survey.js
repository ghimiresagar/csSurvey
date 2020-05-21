import React from 'react';

import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';

class SeniorSurvey extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            count: 0,
            res_questions: []
        };
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
                <Accordion className="text-center">
                    <Card>
                        <Accordion.Toggle as={Card.Header} eventKey="0">
                        Add Question
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="0">
                        <Card.Body>
                            
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