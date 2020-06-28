import React from 'react';

import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';

import InputRate from './input_rate';
import InputSmall from './input_small';
import InputComment from './input_comment';

function TakeQuestion(props) {
    return(
        <Container>
            <Row>
                <div style={{ "width": "5%"}}>
                    <div style={{ "display": "inline-block" }}>{props.number}.</div>
                </div>

                {(props.value.input_type === "Rate") && 
                <>
                    <div style={{ "width": "65%"}}>
                        {props.value.title}
                    </div>
                    <div style={{ "width": "30%"}}>
                        <InputRate number={props.number} id={props.value._id} handleChange={props.handleChange} />
                    </div>
                </>
                }
                {(props.value.input_type === "Short Answer") && 
                <>
                    <div style={{ "width": "45%"}}>
                        {props.value.title}
                    </div>
                    <div style={{ "width": "50%"}}>
                        <InputSmall number={props.number} id={props.value._id} handleChange={props.handleChange} />
                    </div>
                </>
                }
                {(props.value.input_type === "Longer Comment") && 
                <>
                    <div style={{ "width": "40%"}}>
                        {props.value.title}
                    </div>
                    <div style={{ "width": "55%"}}>
                        <InputComment number={props.number} id={props.value._id} handleChange={props.handleChange} />
                    </div>
                </>
                }
            </Row> <hr />
        </Container>
    );
}

export default TakeQuestion;