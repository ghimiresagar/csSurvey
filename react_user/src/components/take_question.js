import React from 'react';

import Container from 'react-bootstrap/Container';

function TakeQuestion(props) {
    return(
        <Container>
            {props.number}.  
            {props.value.title} 
            
            <br/>
        </Container>
    );
}

export default TakeQuestion;