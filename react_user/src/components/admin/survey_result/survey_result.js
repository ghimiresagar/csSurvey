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
    const [numberOfParts, setNumberOfParts] = useState(0);
    const [message, setMessage] = useState('');
    const [contains, setContains] = useState(false);

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
                setNumberOfParts(got[0].numberOfParts);
                setObj(got[0]['result']);           // array of objects
                setContains(true);
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
        setContains(false);
        setMessage(null);
        setChange(change + 1);
    }

    return (
        <Container>
            <SurveySearch onChangeHandle={onChangeHandle} />
            {message ? <Message message={message} /> : null }
            <br />
            {contains ? <ResultLayoutMain value={obj} numberOfParts={numberOfParts} /> : null }
        </Container>
    );
}

export default SurveyResult;