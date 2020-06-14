import React, { useState } from 'react';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';

function ResultLayoutComment(props) {
    return (
        <Container>
            {props.num}
        </Container>
    );
}

export default ResultLayoutComment;