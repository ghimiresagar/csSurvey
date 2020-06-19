import React from 'react';

import Button from 'react-bootstrap/button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function BackPrintButton(props) {

    const goBack = (e) => {
        e.preventDefault();
        window.history.back();
    }

    const printCSV = (e) => {
        e.preventDefault();
        window.print()
        console.log("print");
        
    }

    return (
        <Row>
            <Col sm={6} className="text-left">
            <Button 
                variant="primary"
                onClick={goBack}>
                {"< Back"}
            </Button>
            </Col>
            <Col sm={6} className="text-right">
            { props.show ?
            <Button 
                variant="primary"
                onClick={printCSV}>
                {"Print CSV"}
            </Button> 
            : null }
            <br/> <br/>
            </Col>
        </Row>
    );
}

export default BackPrintButton;