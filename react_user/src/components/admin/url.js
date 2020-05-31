import React from 'react';

import EditUrl from './url_edit';
import 'bootstrap/dist/css/bootstrap.css';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';


class Url extends React.Component {
    constructor(props){
        super(props);
        this.state = {
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

    render(){
        
        const questions = []
        if (this.state.count === 1) {
            for (const [x , y] of this.state.obj.entries()) {
            questions.push(
                <EditUrl key={x} value={y} name={this.props.name} count={this.state.count}/>
            )
            }
        }

        return(
            <Container>
                { this.state.count === 0 &&
                    <Card className="shadow-sm mb-5 bg-white rounded" style={{ width: '100%' }}>
                        <Card.Header as="h5" className="text-center"> 
                            {this.props.name} Survey Url: {this.state.count} 
                        </Card.Header>
                        <Card.Body>
                            <p>No link for this survey! Create One.</p>
                            <div className="text-center m-2">
                                <Button variant="info" className='m-1' onClick={this.createSurvey}>Create {this.props.name} Survey Url</Button>    
                            </div>
                        </Card.Body>
                    </Card>
                }
                { this.state.count === 1 && 
                    questions
                }
                { this.props.count > 1 &&
                    <p>There's a problem. 2 links are present. Please call Sagar!</p>
                }
            </Container>
        );
    }
}

export default Url;