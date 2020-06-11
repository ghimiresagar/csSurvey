import React, { useState, useEffect } from 'react';

import Container from 'react-bootstrap/Container';
import AddQuestion from './add_question';
import EditQuestion from './edit_question';
import Url from './url/url';

function SeniorSurvey(props) {
    const [questionList, setQuestionList] = useState([]);
    const [questionCount, setQuestionCount] = useState(0);
    const [change, setChange] = useState(1);

    useEffect(() => {
        getQuestions()
        .then(body => {
            setQuestionList(Object.keys(body.question).map(keys => body.question[keys]));
            setQuestionCount(body.number_question);
        }
        )
        .catch(err => console.log(err));
    }, [change]);

    const onChangeHandle = () => {
        setChange(change + 1);
    }

    async function getQuestions() {
        const data = await fetch("/surveys/"+props.name+"/edit");
        const body = await data.json();
        return body;
    }

    const questions = questionList.map(question => (
        <EditQuestion
            key={question._id}
            value = {question}
            name={props.name}
            onChangeHandle={onChangeHandle}
        />
    ));

    return(
        <Container>
            <Url name={props.name} num={questionCount} />
            <AddQuestion name={props.name} onChangeHandle={onChangeHandle} />
            {questions}
        </Container>
    );
}

export default SeniorSurvey;