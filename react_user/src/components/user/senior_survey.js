import React from 'react';

import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Accordion from 'react-bootstrap/Accordion';
import AddQuestion from './add_question';

class SeniorSurvey extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            count: 0,
            res_title: [],
            res_id: [],
            res_input_type: [],
            res_question_type: []
        };
        this.postQuery = this.postQuery.bind(this);
    }

    componentWillMount(){
        this.get_questions()
            .then(body => this.setState({
                count: body.number_question,
                res_title: Object.keys(body.question).map(keys => body.question[keys].title),
                res_id: Object.keys(body.question).map(keys => body.question[keys]._id),
                res_input_type: Object.keys(body.question).map(keys => body.question[keys].input_type),
                res_question_type: Object.keys(body.question).map(keys => body.question[keys].title)
            }))
            .catch(err => console.log(err));
    }

    get_questions = async () => {
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
    }

    render(){
        const questions = []
        for (const [x, y] of this.state.res_id.entries()) {
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
                <AddQuestion />
                {questions}
            </Container>
        );
    }
}

export default SeniorSurvey;