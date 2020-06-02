import React from 'react';

import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';    
 
class EditUrl extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            title: this.props.value.title,                      // details
            input_type: this.props.value.input_type,            // date
            question_type: this.props.value.question_type       // spring, fall
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    updateQuestion = (e) => {
        e.preventDefault();

        let body = {
            id: this.props.value._id,
            title: this.state.title,
            input_type: this.state.input_type,
            question_type: this.state.question_type
        };
        fetch("/users/surveys/"+this.props.name+"/url", {
           method: 'post',
           headers: { 'Content-Type': 'application/json' },
           body: JSON.stringify(body)
        }).then(function(data){
            console.log(data)
            window.location.reload(false);
        }).catch(err => console.log(err));
    }

    deleteSurvey = (e) => {
        e.preventDefault();

        fetch("/users/surveys/"+this.props.name+"/url/delete", {
            method: 'post'
        }).then(function(data){
            console.log(data)
            window.location.reload(false);
        }).catch(err => console.log(err));
    }

    render() {
        return(
            <Card className="shadow-sm mb-5 bg-white rounded" style={{ width: '100%' }}>
                    <Card.Header as="h5" className="text-center"> 
                        {this.props.name} Survey Url: {this.props.count} 
                    </Card.Header>
                    <Card.Body>  
                            <Form>
                                <Form.Group as={Row}>
                                    <Col sm={10}>
                                        <Form.Group as={Row}>
                                            <Form.Label column sm={2}>
                                                Edit Detail: 
                                            </Form.Label>
                                            <Col sm={10}>
                                            <Form.Control as="textarea" rows="4" placeholder="Details" name="title" defaultValue={this.state.title} onChange={this.handleChange} required/>
                                            </Col>
                                        </Form.Group>
                                        <Form.Group controlId="exampleForm.SelectCustom" as={Row}>
                                            <Form.Label column sm={2}>
                                                Semester:
                                            </Form.Label>
                                            <Col sm={4}>
                                                <Form.Control as="select" custom name="input_type" defaultValue={this.state.input_type} onChange={this.handleChange}>
                                                <option>Spring</option>
                                                <option>Fall</option>
                                                </Form.Control>
                                            </Col>
                                            <Form.Label column sm={2}>
                                                Year:
                                            </Form.Label>
                                            <Col sm={4}>
                                                <Form.Label row="true" sm={2} className="p-2 font-weight-bold">
                                                    {this.state.question_type}
                                                </Form.Label>
                                            </Col>
                                        </Form.Group>
                                    </Col>
                                    <Col sm={2}>
                                    <Card.Text className="text-center">
                                        <Button variant="primary m-2" onClick={this.updateQuestion}>Update Details</Button> 
                                        <Button variant="danger" className='m-2' onClick={this.deleteSurvey}>Close Survey</Button>    
                                    </Card.Text>
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} >
                                    <Col sm={2}>
                                    Survey Link: 
                                    </Col>
                                    <Col sm={8}>
                                        <Card.Text>  
                                            {'http://127.0.0.1:3000/users/surveys/'+this.props.name+'/url/'+this.props.value._id}
                                        </Card.Text>
                                    </Col>
                                    <Col sm={2} className="text-center">
                                        <a href={'http://127.0.0.1:3000/users/surveys/'+this.props.name+'/url/'+this.props.value._id}>
                                            <Button variant="success">Preview Survey</Button>    
                                        </a>
                                    </Col>
                                </Form.Group>
                            </Form>  
                    </Card.Body>
                </Card>
        );
    }
}

export default EditUrl;