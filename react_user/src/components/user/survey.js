import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Container from 'react-bootstrap/Container';

class Survey extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            name: this.props.value,
            total_survey: 0,
            survey_items: []
        };
    }

    // when the component mounts, get express query of surveys
    componentWillMount(){
        this.getQuery();
    }

    getQuery(){
        fetch("http://localhost:9000/users/surveys/senior")
        .then(res => res.text())
        .then(console.log(res));
    }

    render(){
        return(
            <Container className="bg-light">
                {this.state.name}
            </Container>
        );
    }
}

export default Survey;