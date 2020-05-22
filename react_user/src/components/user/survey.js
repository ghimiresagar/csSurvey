import React from 'react';
import { Link } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.css';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';


class Survey extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            name: this.props.value,     // name of the survey, is passed
            count: 0,
            obj: []
        };
    }

    // when the component mounts, get express query of surveys
    componentWillMount(){
        this.getQuery()
            .then(body => this.setState({ 
                count: body.number_question,
                obj: Object.keys(body.question).map(keys => body.question[keys].title)
            }))
            .catch(err => console.log(err));
    }

    // gets the query from express url
    getQuery = async () => {
        const data = await fetch("http://localhost:9000/users/surveys/"+this.state.name);
        const body = await data.json();
        return body;
    }

    render(){
        const questions = []

        for (const [x, y] of this.state.obj.entries()) {
          questions.push(
            <Card.Text>
                {y}
            </Card.Text>
          )
        }

        return(
            <Container>
                <Card className="shadow-sm mb-5 bg-white rounded" style={{ width: '100%' }}>
                    <Card.Header as="h5" className="text-center"> {this.state.name} Survey Questions: {this.state.count} </Card.Header>
                    <Card.Body>
                        <Card.Title>Questions</Card.Title>
                        {questions}
                        <div className="text-center">
                        <Link to={`/users/surveys/${this.state.name}/edit`} className="active">
                            <Button variant="primary">Edit Survey</Button>    
                        </Link>
                        </div>
                    </Card.Body>
                </Card>
            </Container>
        );
    }
}

export default Survey;