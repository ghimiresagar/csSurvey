import React, { useState, useEffect } from 'react';

import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

import TakeQuestion from './take_question';
import Message from '../message';
import AuthService from '../../Services/AuthService'; 
import Header from '../header';
import BackButton from '../backbutton';

function SurveyView(props) {
    const [message, setMessage] = useState(null);
    const [body, setBody] = useState([]);
    const [detailBody, setDetailBody] = useState("");
    const [results, setResults] = useState(null);
    let num = 1;

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
                        window.location.href = '/pagenotfound';
                        setMessage(null);
                    }, 3000);
                    setMessage({
                        msgBody: "No survey for this link available!",
                        msgError: true
                    })
                } else if (body === "taken") {
                    // survey is already taken
                    setTimeout(() => {
                        window.location.href = '/thankyou';
                        setMessage(null);
                    }, 3000);
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
        const data = await fetch("/surveys/"+ props.name +"/url/"+props.match.params.id);
        const body = await data.json();
        if (body.value === null)
            return null;
        if (body.value === "taken")
            return "taken";
        // console.log(body);
        return body;
    }

    async function post_results() {
        const data = await fetch("/surveys/"+props.name+"/url/"+props.match.params.id, {
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
        // console.log(results);
        post_results().then(body => {
            if (!body.message.msgError) {   // if error is false
                setTimeout(() => {
                    setMessage(null);
                    window.location.href = '/thankyou';
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
        if (y.input_type !== "Instruction") {
            questions.push(
                <TakeQuestion key={x} value={y} number={num} handleChange={callOnChangeParent} />
            );
            num += 1;
        } else {
            questions.push(
                <TakeQuestion key={x} value={y} />
            );
        }
    }

    const stylesRate = {
        width: "15%",
        padding: "1px",
        display: "inline-block",
        textAlign: "right"
    }
    
    return(
        <Container >
            <Header value="Survey Web App" />
            { logged ? <BackButton /> : null}
            <Card className="shadow-sm mb-5 bg-white rounded" >
                <Card.Header as="h5" className="text-center"> 
                    {props.name} Survey
                </Card.Header>
                <Card.Text className="p-2" style={{ whiteSpace: "pre-line", padding: "2px" }}>
                    {detailBody}
                </Card.Text>
                <Card.Header as="h5"> 
                <Container>
                    <Row>
                        <div style={{ "width": "5%"}}>
                            #
                        </div>
                        <div style={{ "width": "65%"}}>
                            Question
                        </div>
                        <div style={{ "width": "30%", textAlign: "center" }}>
                            <div style={stylesRate}>
                                5
                            </div>
                            <div  style={stylesRate}>
                                4
                            </div>
                            <div style={stylesRate}>
                                3
                            </div>
                            <div style={stylesRate}>
                                2
                            </div>
                            <div style={stylesRate}>
                                1
                            </div>
                        </div>
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