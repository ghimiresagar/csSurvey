import React from 'react';

// import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
// import InputRate from './input_rate';

class TakeQuestion extends React.Component {
    render() {
        return(
            <Container>
                <Row>
                    <Col sm={1}>
                        {this.props.number}.
                    </Col>
                    <Col sm={9}>
                        {this.props.value.title}
                    </Col>
                    <Col sm={2}>
                        {/* <InputRate name={"question-"+props.number+"-radio"}/> */}
                        <Row>
                            <Form.Check type="radio" 
                                        name={"question-"+this.props.number} 
                                        num = {this.props.number-1}
                                        value={5} 
                                        id={this.props.value._id}
                                        onChange={this.props.handleChange}
                                        required/>
                            <Form.Check type="radio" 
                                        name={"question-"+this.props.number} 
                                        value={4} 
                                        num = {this.props.number-1}
                                        id={this.props.value._id}
                                        onChange={this.props.handleChange}/>
                            <Form.Check type="radio" 
                                        name={"question-"+this.props.number} 
                                        value={3} 
                                        num = {this.props.number-1}
                                        id={this.props.value._id}
                                        onChange={this.props.handleChange}/>
                            <Form.Check type="radio" 
                                        name={"question-"+this.props.number} 
                                        value={2} 
                                        num = {this.props.number-1}
                                        id={this.props.value._id}
                                        onChange={this.props.handleChange}/>
                            <Form.Check type="radio" 
                                        name={"question-"+this.props.number} 
                                        value={1} 
                                        num = {this.props.number-1}
                                        id={this.props.value._id}
                                        onChange={this.props.handleChange}/>
                        </Row>
                    </Col>
                </Row> <hr />
            </Container>
        );
    }
}

export default TakeQuestion;