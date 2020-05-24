import React from 'react';

import Container from 'react-bootstrap/Container';
import AddQuestion from './add_question';
import EditQuestion from './edit_question';

class SeniorSurvey extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            count: 0,
            res_title: [],
            res_id: [],
            res_input_type: [],
            res_question_type: [],
            res_body: []
        };
    }

    componentDidMount(){
        this.get_questions()
            .then(body => this.setState({
                count: body.number_question,
                res_title: Object.keys(body.question).map(keys => body.question[keys].title),
                res_id: Object.keys(body.question).map(keys => body.question[keys]._id),
                res_input_type: Object.keys(body.question).map(keys => body.question[keys].input_type),
                res_question_type: Object.keys(body.question).map(keys => body.question[keys].title),
                res_body: Object.keys(body.question).map(keys => body.question[keys])
            }))
            .catch(err => console.log(err));
    }

    get_questions = async () => {
        const data = await fetch("http://localhost:9000/users/surveys/"+this.props.name+"/edit");
        const body = await data.json();
        return body;
    }

    render(){
        const questions = []
        for (const [x, y] of this.state.res_body.entries()) {
            questions.push(
                <EditQuestion value={y} name={this.props.name} />
            )
          }
        return(
            <Container>
                <AddQuestion name={this.props.name}/>
                {questions}
            </Container>
        );
    }
}

export default SeniorSurvey;