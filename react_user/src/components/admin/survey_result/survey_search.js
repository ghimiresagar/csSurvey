import React from 'react';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function SurveySearch(props) {
    return (
        <Form>
            <Row>
                <Form.Group as={Col}>
                    <Form.Label>Survey Type:</Form.Label>
                    <Form.Control 
                        as="select"
                        custom name="type"
                        required
                        defaultValue= 'Senior' 
                        onChange={props.onChangeHandle}>
                        <option>Senior</option>
                        <option>Alumni</option>
                        <option>Iab</option>
                    </Form.Control>
                </Form.Group>
                <Form.Group as={Col}>
                    <Form.Label>Year: </Form.Label>
                    <Form.Control 
                        type="text" 
                        defaultValue= {new Date().getFullYear()} 
                        name="year"
                        placeholder="Year"
                        onChange={props.onChangeHandle}
                        required/>
                </Form.Group>
                {/* <Form.Group as={Col}>
                    <Button onClick={() => window.printPreview() }> Print </Button>
                </Form.Group> */}
                {/* <Form.Group as={Col}>
                    <Form.Label>Semester:</Form.Label>
                    <Form.Control 
                        as="select"
                        custom name="semester"
                        defaultValue= 'Spring' 
                        onChange={props.onChangeHandle}
                        required>
                        <option>Spring</option>
                        <option>Fall</option>
                    </Form.Control>
                </Form.Group> */}
            </Row>
        </Form>
    );
}

export default SurveySearch;