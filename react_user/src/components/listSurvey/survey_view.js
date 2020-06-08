import React, { useState, useEffect } from 'react';

import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import TakeQuestion from './take_question';
import Message from '../message';
import AuthService from '../../Services/AuthService'; 

function SurveyView(props) {
    const [message, setMessage] = useState(null);
    const [body, setBody] = useState([]);
    const [detailBody, setDetailBody] = useState("");
    const [results, setResults] = useState(null);

    const [logged, setLogged] = useState(false);

    useEffect(() => {
        // checks for logged in user
        AuthService.isAuthenticated().then(data => {                   
            setLogged(data.isAuthenticated);
        })
        check_obj()
            .then((body) => {
                if (body === null) {
                    // url doesn't exist
                    setTimeout(() => {
                        window.location.href = '/users';
                        setMessage(null);
                    }, 1000);
                    setMessage({
                        msgBody: "No survey for this link available!",
                        msgError: true
                    })
                } else if (body === "taken") {
                    // survey is already taken
                    setTimeout(() => {
                        window.location.href = '/users';
                        setMessage(null);
                    }, 1000);
                    setMessage({
                        msgBody: `You already took the ${props.name} survey!`,
                        msgError: false
                    })
                } else {
                    // set id, url exists
                    setBody(Object.keys(body.question).map(keys => body.question[keys]));
                    setDetailBody(Object.keys(body.detail).map(keys => body.detail[keys]));
                    setResults(Array(body.number_question).fill(null));
                }
            })
            .catch( err => console.log(err));
    }, [])

    async function check_obj() {
        const data = await fetch("/users/surveys/"+ props.name +"/url/"+props.match.params.id);
        const body = await data.json();
        if (body.value === null)
            return null;
        if (body.value === "taken")
            return "taken";
        return body;
    }

    async function post_results() {
        const data = await fetch("/users/surveys/"+props.name+"/url/"+props.match.params.id, {
                        method: "post",
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify(results)
                    });
        const body = await data.json();
        return body;
    }

    function callOnChangeParent(e) {     
        const new_results = results.slice();
        new_results[e.target.getAttribute("num")] = {
            "id": e.target.id,
            "value": e.target.value,
            "input_val": e.target.getAttribute("typeval")
        };
        setResults(new_results);
    }

    function handleSubmit(e) {
        e.preventDefault();
        console.log(results);
        post_results().then(body => {
            if (!body.message.msgError) {   // if error is false
                setTimeout(() => {
                    setMessage(null);
                    window.location.href = '/users';
                }, 3000);
            };
            setMessage({
                msgBody: body.message.msgBody,
                msgError: body.message.msgError 
            });
        })
    }
 
    const questions = []
    for (const [x, y] of body.entries()) {
        questions.push(
            <TakeQuestion key={x} value={y} number={x+1} handleChange={callOnChangeParent} />
        )
    }
    
    return(
        <Container>
            <Card className="shadow-sm mb-5 bg-white rounded" style={{ width: '100%' }}>
                <Card.Header as="h5" className="text-center"> 
                    {props.name} Survey
                </Card.Header>
                <Card.Text className="p-2">
                    {detailBody}
                </Card.Text>
                <Card.Title className="text-center">Please input n/a for anything not applicable.</Card.Title>
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
                    <Form onSubmit={handleSubmit}>
                        {questions}

                        <div className="m-1 p-1">
                            {message ? <Message message={message} /> : null }
                        </div>
                        { !logged &&
                            <div className="text-center">
                                <Button type="submit">
                                    Submit
                                </Button>
                            </div>
                        }
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
}

export default SurveyView;