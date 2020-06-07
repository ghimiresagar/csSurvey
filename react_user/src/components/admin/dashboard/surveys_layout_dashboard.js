import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.css';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';


function Survey(props) {
    const [count, setCount] = useState(0);

    useEffect(() => {
        getQuery()
            .then(body => setCount(body.number_question))
            .catch(err => console.log(err));
    });

    async function getQuery() {
        const data = await fetch("/users/surveys/"+props.name);
        const body = await data.json();
        return body;
    }

    return(
        <Container>
            <Card className="shadow-sm mb-5 bg-white rounded" style={{ width: '100%' }}>
                <Card.Header as="h5" className="text-center"> {props.name} Survey Details </Card.Header>
                <Card.Body>
                    <Card.Text>Number of Questions: {count}</Card.Text> 
                    <div className="text-center">
                    <Link to={`/users/surveys/${props.name}/edit`} className="active">
                        <Button variant="primary">Edit Survey</Button>    
                    </Link>
                    </div>
                </Card.Body>
            </Card>
        </Container>
    );
}

export default Survey;