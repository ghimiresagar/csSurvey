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
            res_question_type: [],
            res_body: [],
            res_id_top: [],
        };
    }

    componentWillMount(){
        this.get_questions()
            .then(body => this.setState({
                count: body.number_question,
                res_title: Object.keys(body.question).map(keys => body.question[keys].title),
                res_id: Object.keys(body.question).map(keys => body.question[keys]._id),
                res_input_type: Object.keys(body.question).map(keys => body.question[keys].input_type),
                res_question_type: Object.keys(body.question).map(keys => body.question[keys].title),
                res_body: Object.keys(body.question).map(keys => body.question[keys]),
                res_id_top: Object.keys(body.top_id).map(keys => body.top_id[keys]._id),    
            }))
            .catch(err => console.log(err));
    }

    get_questions = async () => {
        const data = await fetch("http://localhost:9000/users/surveys/senior/edit");
        const body = await data.json();
        return body;
    }

    render(){
        const questions = []
        const id_top = []
        for (var [i, j] of this.state.res_id_top.entries()){
            id_top.push(j+1);
        }
        for (const [x, y] of this.state.res_body.entries()) {
            questions.push(
                <Accordion>
                    <Card>
                        <Accordion.Toggle as={Card.Header} eventKey="0">
                        {y.title}
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="0">
                        <Card.Body>
                            {y._id}
                        </Card.Body>
                        </Accordion.Collapse>
                    </Card><br></br>
                </Accordion>
            )
          }
        return(
            <Container>
                <AddQuestion value={id_top[0]}/>
                {questions}
            </Container>
        );
    }
}

export default SeniorSurvey;