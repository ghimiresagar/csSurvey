import React, { useContext } from 'react';

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
            url_id: "",
            res_body: [],
            detail_body: ""
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
                        url_id: Object.keys(body.detail).map(keys => body.detail[keys]),
                        res_body: Object.keys(body.question).map(keys => body.question[keys]),
                        detail_body: Object.keys(body.detail).map(keys => body.detail[keys]),
                    })
                        .catch(err => console.log(err));
                }
            })
            .catch( err => console.log(err));
    }

    check_obj = async() => {
        const data = await fetch("/users/surveys/"+ this.props.name +"/url/"+this.props.match.params.id);
        const body = await data.json();
        if (body.value === null)
            return null;
        return body;
    }
 

    render(){
        const questions = []
        for (const [x, y] of this.state.res_body.entries()) {
            questions.push(
                <TakeQuestion key={x} value={y} number={x+1} />
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
                                <Col className="col-sm-1">
                                    #
                                </Col>
                                <Col sm={9} className="text-center">
                                    Question
                                </Col>
                                <Col className="col-sm-2">
                                    <Row>
                                        <Col className="col-sm-1">
                                            1
                                        </Col>
                                        <Col className="col-sm-1">
                                            2
                                        </Col>
                                        <Col className="col-sm-1">
                                            3
                                        </Col>
                                        <Col className="col-sm-1">
                                            4
                                        </Col>
                                        <Col className="col-sm-1">
                                            5
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </Container>
                    </Card.Header>
                    <Card.Body>
                        <Form>
                            {questions}

                            <div className="text-center">
                                <Button variant="primary">Submit</Button>    
                            </div>
                        </Form>
                    </Card.Body>
                </Card>
            </Container>
        );
    }
}

export default SurveyView;