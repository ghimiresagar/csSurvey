import React from 'react';

import 'bootstrap/dist/css/bootstrap.css';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';


class Url extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            name: "",     // name of the survey, is passed
            count: 0,
            obj: []
        };
    }

    // when the component mounts, get express query of surveys
    componentDidMount(){
        this.getQuery()
            .then(body => this.setState({ 
                count: body.number_question,                
                obj: Object.keys(body.question).map(keys => body.question[keys])
            }))
            .catch(err => console.log(err));
    }

    // gets the query from express url
    getQuery = async () => {
        const data = await fetch("/users/surveys/"+this.props.name+"/url");
        const body = await data.json();
        return body;
    }

    createSurvey = (e) => {
        e.preventDefault();

        fetch("/users/surveys/"+this.props.name+"/url/create", {
           method: 'post'
        }).then(function(data){
            console.log(data)
            window.location.reload(false);
        }).catch(err => console.log(err));
    }

    deleteSurvey = (e) => {
        e.preventDefault();

        fetch("/users/surveys/"+this.props.name+"/url/delete", {
           method: 'post'
        }).then(function(data){
            console.log(data)
            window.location.reload(false);
        }).catch(err => console.log(err));
    }

    render(){
        
        const questions = []
        let id = ""
        if (this.state.count === 1) {
            for (const [x , y] of this.state.obj.entries()) {
                id = y._id;
            questions.push(
                <Card.Text key={x}>
                    {'http://127.0.0.1:3000/users/surveys/'+this.props.name+'/url/'+y._id}
                </Card.Text>
            )
            }
        }

        return(
            <Container>
                <Card className="shadow-sm mb-5 bg-white rounded" style={{ width: '100%' }}>
                    <Card.Header as="h5" className="text-center"> 
                        {this.props.name} Survey Url: {this.state.count} 
                    </Card.Header>
                    <Card.Body>
                        { this.state.count === 1 &&
                            <div className="m-2">{questions}</div>
                        }
                        { this.state.count === 0 &&
                            <p>No link for this survey! Create One.</p>
                        }
                        { this.state.count > 1 &&
                            <p>There's a problem. 2 links are present. Please call Sagar!</p>
                        }
                        
                        <Card.Title className="text-center">
                            { this.state.count === 1 &&         // link to go to the survey, nthg else
                                <a href={'http://127.0.0.1:3000/users/surveys/'+this.props.name+'/url/'+id}>
                                    <Button variant="success" className='m-1'>Go to Survey</Button>    
                                </a>
                            }
                            { this.state.count === 0 &&
                                <Button variant="info" className='m-1' onClick={this.createSurvey}>Create new Survey</Button>    
                            }
                            { this.state.count === 1 &&
                                <Button variant="danger" className='m-1' onClick={this.deleteSurvey}>Delete this Survey</Button>    
                            }
                        </Card.Title>

                    </Card.Body>
                </Card>
            </Container>
        );
    }
}

export default Url;