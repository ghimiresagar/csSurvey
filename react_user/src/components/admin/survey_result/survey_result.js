import React, { useState, useEffect } from 'react';

import Container from 'react-bootstrap/Container';

import SurveySearch from './survey_search';
import ResultLayout from './result_layout';
import Message from '../../message';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';

function SurveyResult() {
    const [change, setChange] = useState(0);
    const [survey, setSurvey] = useState({
        type: "Senior",
        year: "2020",
        semester: "Spring"
    });
    const [obj, setObj] = useState([]);
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetchResults()
        .then(result => {
            if (result.result === null) {
                setMessage({
                    msgBody: "No results for this survey.",
                    msgError: true
                });
            } else {
                const got = Object.keys(result).map(keys => result[keys]);
                setObj(got[0]['result']);
            }
        })
    }, [change]);

    async function fetchResults() {
        const data = await fetch("/surveys/results/all", {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(survey)
        });
        const result = await data.json();
        return result;
    }

    const onChangeHandle = (e) => {
        e.preventDefault();
        // if (survey.year.length !== 4) 
        setSurvey({ ...survey, [e.target.name]: e.target.value });
        setMessage(null);
        setObj([]);
        setChange(change + 1);
    }

    const questions = obj.map(element => (
        <ResultLayout 
            key={element._id}
            value={element} />
    ));



    return (
        <Container>
            <SurveySearch onChangeHandle={onChangeHandle} />
            {message ? <Message message={message} /> : null }
            {questions}
        </Container>
    );
}

export default SurveyResult;