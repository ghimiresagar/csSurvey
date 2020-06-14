import React, { useState, useEffect } from 'react';

import Container from 'react-bootstrap/Container';

import SurveySearch from './survey_search';
import ResultLayoutMain from './result_layout_main';
import Message from '../../message';

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
                setObj(got[0]['result']);           // array of objects
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
        
        setSurvey({ ...survey, [e.target.name]: e.target.value });
        setObj([]);
        setMessage(null);
        setChange(change + 1);
    }

    // console.log(values);
    console.log(obj);
    return (
        <Container>
            <SurveySearch onChangeHandle={onChangeHandle} />
            {message ? <Message message={message} /> : null }
            <br />
            <ResultLayoutMain value={obj} />
        </Container>
    );
}

export default SurveyResult;