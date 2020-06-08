import React, { useState, useEffect } from 'react';

import Container from 'react-bootstrap/Container';
import AddQuestion from './add_question';
import EditQuestion from './edit_question';
import Url from './url/url';

function SeniorSurvey(props) {
    const [questionList, setQuestionList] = useState([]);
    const [change, setChange] = useState(1);

    useEffect(() => {
        getQuestions()
        .then(body => setQuestionList(
            Object.keys(body.question).map(keys => body.question[keys])
        ))
        .catch(err => console.log(err));
    }, [change]);

    const onChangeHandle = () => {
        setChange(change + 1);
    }

    async function getQuestions() {
        const data = await fetch("/users/surveys/"+props.name+"/edit");
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
            <Url name={props.name} />
            <AddQuestion name={props.name} onChangeHandle={onChangeHandle} />
            {questions}
        </Container>
    );
}

export default SeniorSurvey;