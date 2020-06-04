import React from 'react';

// import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';

import InputRate from './input_rate';
import InputSmall from './input_small';
import InputComment from './input_comment';

class TakeQuestion extends React.Component {
    render() {
        return(
            <Container>
                <Row>
                    <Col sm={1}>
                        {this.props.number}.
                    </Col>
                    {(this.props.value.input_type === "Rate") && 
                    <>
                        <Col sm={9}>
                            {this.props.value.title}
                        </Col>
                        <Col sm={2}>
                            <InputRate number={this.props.number} id={this.props.value._id} handleChange={this.props.handleChange} />
                        </Col>
                    </>
                    }
                    {(this.props.value.input_type === "Input Small") && 
                    <>
                        <Col sm={8}>
                            {this.props.value.title}
                        </Col>
                        <Col sm={3}>
                            <InputSmall number={this.props.number} id={this.props.value._id} handleChange={this.props.handleChange} />
                        </Col>
                    </>
                    }
                    {(this.props.value.input_type === "Input Comment") && 
                    <>
                        <Col sm={5}>
                            {this.props.value.title}
                        </Col>
                        <Col sm={6}>
                            <InputComment number={this.props.number} id={this.props.value._id} handleChange={this.props.handleChange} />
                        </Col>
                    </>
                    }
                </Row> <hr />
            </Container>
        );
    }
}

export default TakeQuestion;