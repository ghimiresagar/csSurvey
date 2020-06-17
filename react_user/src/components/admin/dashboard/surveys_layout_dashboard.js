import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import UrlView from './url_view';

import 'bootstrap/dist/css/bootstrap.css';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

function Survey(props) {
    const [detailBody, setDetailBody] = useState({});

    useEffect(() => {
        getQuery()
        .then(body => {
            setDetailBody(body);
            console.log(body);
        })
        .catch(err => console.log(err));
    }, []);

    async function getQuery() {
        const data = await fetch("/surveys/"+props.name+"/url");
        const body = await data.json();
        return body;
    }

    return(
        <>
            <Card className="shadow-sm mb-5 bg-white rounded" style={{ width: '100%' }}>
                <Card.Header as="h5" className="text-center"> {props.name} Survey Details </Card.Header>
                <Card.Body>
                    { detailBody.number_url === 1 ? 
                        <UrlView 
                            value={detailBody.details} 
                            name={props.name} />
                    : 
                        <p className="text-center">
                            No Survey active to show description. Create survey first.
                        </p>
                    }
                    <div className="text-center">
                    <Link to={`/admin/surveys/${props.name}/edit`} className="active">
                        <Button variant="primary">
                            { detailBody.number_url !== 0 ? "Edit Survey" : "Create Survey"}
                        </Button>    
                    </Link>
                    </div>
                </Card.Body>
            </Card>
        </>
    );
}

export default Survey;