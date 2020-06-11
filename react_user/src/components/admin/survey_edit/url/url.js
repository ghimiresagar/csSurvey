import React, { useState, useEffect } from 'react';

import EditUrl from './url_edit';
import Message from '../../../message';

import 'bootstrap/dist/css/bootstrap.css';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';


function Url(props) {
    const [change, setChange] = useState(0);
    const [message, setMessage] = useState(null);

    const [count, setCount] = useState(0);
    const [obj, setObj] = useState([]);

    useEffect(() => {
        getQuery()
        .then(body => {
            setCount(body.number_question);
            setObj(Object.keys(body.question).map(keys => body.question[keys]));
        })
        .catch(err => console.log(err));
    }, [change]);

    async function getQuery() {
        const data = await fetch("/surveys/"+props.name+"/url");
        const body = await data.json();
        return body;
    }

    const onChangeHandle = () => {
        setChange(change + 1);
    }

    function createSurvey(e) {
        e.preventDefault();

        fetch("/surveys/"+props.name+"/url/create", {
            method: 'post'
        }).then(function(data){
            setTimeout(() => {
                setMessage(null);
                onChangeHandle();
            }, 1000);
            setMessage({
                msgBody: "Creating Survey",
                msgError: false
            });
        }).catch(err => {
            setTimeout(() => {
                window.location.reload(false);
            }, 1000);
            setMessage({
                msgBody: "Error",
                msgError: true
            });
        });
    }
        
    const questions = []
    if (count === 1) {
        for (const [x , y] of obj.entries()) {
        questions.push(
            <EditUrl key={x} value={y} name={props.name} num={props.num} count={count} onChangeHandle={onChangeHandle}/>
        )
        }
    }

    return(
        <Container>
            { count === 0 &&
                <Card className="shadow-sm mb-5 bg-white rounded" style={{ width: '100%' }}>
                    <Card.Header as="h5" className="text-center"> 
                        {props.name} Survey : {props.num}
                    </Card.Header>
                    <Card.Body>
                        <p>No active survey!</p>
                        <div className="text-center m-2">
                            <Button variant="info" className='m-1' onClick={createSurvey}>Create {props.name} Survey</Button>    
                        </div>
                        <div className="m-1 p-1">
                            {message ? <Message message={message} /> : null }
                        </div>
                    </Card.Body>
                </Card>
            }
            { count === 1 && 
                questions
            }
            { props.count > 1 &&
                <p>There's a problem. 2 links are present. Please call Sagar!</p>
            }
        </Container>
    );
}

export default Url;