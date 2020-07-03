import React from 'react';

import Button from 'react-bootstrap/button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function BackPrintButton(props) {

    const goBack = (e) => {
        e.preventDefault();
        window.history.back();
    }

    const downloadCSV = (e) => {
        e.preventDefault();
        console.log(props.obj)

        let csvContent = "data:text/csv;charset=utf-8,";

        props.obj.forEach(element => {      // each element is an object
            
            let row = "\""+element.q_title+"\",";
            if (element.q_type === "Rate") {
            row += element.rate[5]+","+
                element.rate[4]+","+
                element.rate[3]+","+
                element.rate[2]+","+
                element.rate[1];
            } else {
                row += element.comment.join(",");
            }
            csvContent += row + "\r\n";
        });

        // set custome name
        let encodedUri = encodeURI(csvContent);
        let link = document.createElement('a');
        link.setAttribute('href', encodedUri);
        link.setAttribute('download', props.name.type+"Survey"+props.name.year+".csv");
        document.body.appendChild(link);

        link.click();
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
                    onClick={downloadCSV}>
                    {"Download CSV"}
                </Button> 
                : null }
                <br/> <br/>
            </Col>
        </Row>
    );
}

export default BackPrintButton;