import React, { useState, useEffect } from 'react';

import Container from 'react-bootstrap/Container';
import AddQuestion from './add_question';
import EditQuestion from './edit_question';
import Url from './url/url';
import BackButton from '../../backbutton';
import Header from '../../header';

function SeniorSurvey(props) {
    const [questionList, setQuestionList] = useState([]);
    const [count, setCount] = useState({});
    const [change, setChange] = useState(1);

    let num = 1;

    useEffect(() => {
        getQuestions()
        .then(body => {
            setQuestionList(Object.keys(body.question).map(keys => body.question[keys]));
            setCount({
                questionCount: body.number_question,
                questionNumber: body.number_question + 1 
            })
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

    const questions = []
    for (const [x, y] of questionList.entries()) {
        if (y.input_type !== "Instruction") {
            questions.push(
                <EditQuestion key={x} value={y} name={props.name} number={num} num={count.questionCount} onChangeHandle={onChangeHandle} />
            );
            num += 1;
        } else {
            questions.push(
                <EditQuestion key={x} value={y} name={props.name} num={count.questionCount} onChangeHandle={onChangeHandle} />
            );
        }
    }

    return(
        <Container>
            <Header value="Dashboard" />
            <BackButton />
            <Url name={props.name} num={count.questionCount} />
            <AddQuestion name={props.name} questionNumber={count.questionNumber} onChangeHandle={onChangeHandle} />
            {questions}
        </Container>
    );
}

export default SeniorSurvey;