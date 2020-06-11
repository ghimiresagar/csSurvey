import React, { useState } from 'react';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function UrlView(props) {
    return (
        <>
        <Row>
            <Col sm={3}>
                Description:
            </Col>
            <Col sm={9}>
                {props.value.title}
            </Col>
        </Row>
        <Row>
            <Col sm={3}>
                Semester:
            </Col>
            <Col sm={9}>
                {props.value.result.semester}
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
                Number of questions:
            </Col>
            <Col sm={9}>
                {props.num}
            </Col>
        </Row>
        <Row>
            <Col sm={3}>
                Survey Link:
            </Col>
            <Col sm={9}>
                {'http://127.0.0.1:3000/surveys/'+props.name+'/url/'+props.value._id}
                <br/><br/>
            </Col>
        </Row>
        </>
    )
};

export default UrlView;