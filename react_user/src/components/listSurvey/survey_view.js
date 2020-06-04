import React from 'react';

import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import TakeQuestion from './take_question';

class SurveyView extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            res_body: [],
            detail_body: "",
            results: null
        }
    }

    componentWillMount(){
        this.check_obj()
            .then((body) => {
                if (body === null) {
                    // url doesn't exist
                    window.location.href = '/';
                } else {
                    // set id, url exists
                    this.setState({
                        res_body: Object.keys(body.question).map(keys => body.question[keys]),
                        detail_body: Object.keys(body.detail).map(keys => body.detail[keys]),
                        results: Array(body.number_question).fill(null)
                    })
                        // .catch(err => console.log(err));
                }
            })
            .catch( err => console.log(err));
    }

    // get request
    check_obj = async() => {
        const data = await fetch("/users/surveys/"+ this.props.name +"/url/"+this.props.match.params.id);
        const body = await data.json();
        if (body.value === null)
            return null;
        return body;
    }

    // post request
    post_results = async() => {
        const data = await fetch("/users/surveys/"+this.props.name+"/url/"+this.props.match.params.id, {
                        method: "post",
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify(this.state.results)
                    });
        const body = await data.json();
        // console.log(body);
        return body;
    }

    // talks to child providing the values
    callOnChangeParent = e => {     
        const new_results = this.state.results.slice();
        new_results[e.target.getAttribute("num")] = {
            "id": e.target.id,
            "value": e.target.value,
            "input_val": e.target.getAttribute("typeval")
        };
        this.setState({
            results: new_results,
        });
    }

    handleSubmit = e => {
        e.preventDefault();
        console.log(this.state.results);
        this.post_results().then(body => {
            // if the post is a success, we need to make so one we can't take it any more
            console.log(body);
        })
    }
 
    render(){
        const questions = []
        for (const [x, y] of this.state.res_body.entries()) {
            questions.push(
                <TakeQuestion key={x} value={y} number={x+1} handleChange={this.callOnChangeParent} />
            )
          }
        return(
            <Container>
                <Card className="shadow-sm mb-5 bg-white rounded" style={{ width: '100%' }}>
                    <Card.Header as="h5" className="text-center"> 
                        {this.props.name} Survey {this.state.count} 
                    </Card.Header>
                    <Card.Text className="p-2">
                        {this.state.detail_body}
                    </Card.Text>
                    <Card.Header as="h5"> 
                        <Container>
                            <Row>
                                <Col sm={1}>
                                    #
                                </Col>
                                <Col sm={9} className="text-center">
                                    Question
                                </Col>
                                <Col sm={2}>
                                    <Row>
                                        <div className="m-1">
                                            5
                                        </div>
                                        <div className="m-1">
                                            4
                                        </div>
                                        <div className="m-1">
                                            3
                                        </div>
                                        <div className="m-1">
                                            2
                                        </div>
                                        <div className="mt-1">
                                            1
                                        </div>
                                    </Row>
                                </Col>
                            </Row>
                        </Container>
                    </Card.Header>
                    <Card.Body>
                        <Form onSubmit={this.handleSubmit}>
                            {questions}

                            <div className="text-center">
                                <Button type="submit">
                                    Submit
                                </Button>
                            </div>
                        </Form>
                    </Card.Body>
                </Card>
            </Container>
        );
    }
}

export default SurveyView;