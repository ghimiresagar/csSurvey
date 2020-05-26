import React from 'react';
import { Redirect } from 'react-router-dom';
import Container from 'react-bootstrap/Container';

import TakeQuestion from './take_question';

class SurveyView extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            url_id: "",
            res_body: []
        }
    }

    componentWillMount(){
        this.check_obj()
            .then((body) => {
                // since body is a single object, we don't need to map it
                // check if body status is ok
                if (body === null) {
                    console.log(body);
                    // TODO:
                    // don't set anything, need to render 404 not found page
                } else {
                    console.log(body);
                    // set id, url exists
                    this.setState({
                        url_id: body._id,
                        res_body: Object.keys(body.question).map(keys => body.question[keys])
                    })
                        .catch(err => console.log(err));
                }
                
            })
            .catch( err => console.log(err));
    }

    check_obj = async() => {
        const data = await fetch("http://localhost:9000/users/surveys/senior/url/"+this.props.match.params.id);
        const body = await data.json();
        if (body.value === null)
            return null;
        return body;
    }
 

    render(){
        const questions = []
        for (const [x, y] of this.state.res_body.entries()) {
            questions.push(
                <TakeQuestion value={y} />
            )
          }
        return(
            <Container>
                {questions}
            </Container>
        );
    }
}

export default SurveyView;