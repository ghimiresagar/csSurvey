import React from 'react';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function UrlView(props) {
    return (
        <>
        <Row>
            <Col sm={3}>
                Description:
            </Col>
            <Col sm={9} style={{ whiteSpace: "pre-line" }}>
                {props.value.title}
            </Col>
        </Row>
        <Row>
            <Col sm={3}>
                Year:
            </Col>
            <Col sm={9}>
                {props.value.result.year}
            </Col>
        </Row>
        <Row>
            <Col sm={3}>
                Survey Takers:
            </Col>
            <Col sm={9}>
                {props.value.result.numberOfParts}
            </Col>
        </Row>
        </>
    )
};

export default UrlView;