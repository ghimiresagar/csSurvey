import React, { useState } from 'react';

import Container from 'react-bootstrap/Container';

function ResultLayout(props) {
    return (
        <Container>
            {props.value.q_title}
        </Container>
    );
}

export default ResultLayout;