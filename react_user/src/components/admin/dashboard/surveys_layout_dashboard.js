import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import UrlView from './url_view';

import 'bootstrap/dist/css/bootstrap.css';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

function Survey(props) {
    const [count, setCount] = useState(0);
    const [obj, setObj] = useState([]);
    const [urlCount, setUrlCount] = useState(0);

    useEffect(() => {
        getQuery()
            .then(body => {
                setCount(body.number_question);
                setObj(Object.keys(body.question).map(keys => body.question[keys]));
                setUrlCount(body.number_url);
            })
            .catch(err => console.log(err));
    }, []);

    async function getQuery() {
        const data = await fetch("/surveys/"+props.name);
        const body = await data.json();
        return body;
    }

    const url = obj.map(u => (
        <UrlView key={u._id} value={u} num={count} name={props.name} />
    ));

    return(
        <Container>
            <Card className="shadow-sm mb-5 bg-white rounded" style={{ width: '100%' }}>
                <Card.Header as="h5" className="text-center"> {props.name} Survey Details </Card.Header>
                <Card.Body>
                    { (urlCount !== 0) ? url : 
                        <p className="text-center">
                            No Survey active to show description. Create survey first.
                        </p>
                    }
                    <div className="text-center">
                    <Link to={`/admin/surveys/${props.name}/edit`} className="active">
                        <Button variant="primary">
                { urlCount !== 0 ? "Edit Survey" : "Create Survey"}
                        </Button>    
                    </Link>
                    </div>
                </Card.Body>
            </Card>
        </Container>
    );
}

export default Survey;