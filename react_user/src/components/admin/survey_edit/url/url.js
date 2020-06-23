import React, { useState, useEffect } from 'react';

import EditUrl from './url_edit';
import Message from '../../../message';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Popover from 'react-bootstrap/Popover';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';


function Url(props) {
    const [change, setChange] = useState(0);
    const [message, setMessage] = useState(null);
    const [resultExist, setResultExist] = useState(false);

    const [detailBody, setDetailBody] = useState({});

    useEffect(() => {
        getQuery()
        .then(body => {
            setDetailBody(body);
            // run a quick check after we get the body
            runCheckForSurvey(body);
        })
        .catch(err => console.log(err));
    }, [change]);

    async function getQuery() {
        const data = await fetch("/surveys/"+props.name+"/url");
        const body = await data.json();
        return body;
    }

    const onChangeHandle = () => {
        setChange(change + 1);
    }

    function runCheckForSurvey(body) {
        if (body.details !== null) {
            for (let x = 0; x < body.archived_result.length; x++){
                if (body.archived_result[x].year === body.details.result.year) {
                    setMessage({
                        msgBody: `The result for the year ${body.archived_result[x].year} already exists. Click recreate survey to delete the existing results and create a new survey for this year.`,
                        msgError: true
                    });
                    setResultExist(true);
                    break
                } else {
                    setMessage(null);
                }
            }
        }
    }

    function createSurvey(e) {
        e.preventDefault();

        fetch("/surveys/"+props.name+"/url/create", {
            method: 'post'
        }).then(function(data){
            setTimeout(() => {
                setMessage(null);
                onChangeHandle();
            }, 1000);
            setMessage({
                msgBody: "Activating Survey",
                msgError: false
            });
        }).catch(err => {
            setTimeout(() => {
                window.location.reload(false);
            }, 1000);
            setMessage({
                msgBody: "Error",
                msgError: true
            });
        });
    }

    function deleteSurvey(e) {
        e.preventDefault();
        fetch("/surveys/"+props.name+"/url/delete/"+detailBody.urlId, {          // using id of url
            method: 'post'
        })
        .then(res => res.json())
        .then(data => {
            setTimeout(() => {
                onChangeHandle();
                setMessage(null);
            }, 1000);
            setMessage( data.message );
        }).catch(err => console.log(err));
    }
    
    function archiveSurvey(e) {
        e.preventDefault();

        fetch("/surveys/"+props.name+"/url/archive/"+detailBody.details._id, {         // using id of detail
            method: 'post'
        })
        .then(res => res.json())
        .then(data => {
            setTimeout(() => {
                onChangeHandle();
                setMessage(null);
            }, 3000);
            setMessage( data.message );
        }).catch(err => console.log(err));
    }

    function deleteResult(e) {
        e.preventDefault();
        let postBody = {
            name: props.name,
            year: detailBody.details.result.year
        }
        fetch("/surveys/result/delete/", {          // using id of url
            method: 'post',
            body: JSON.stringify(postBody),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(data => {
            setTimeout(() => {
                onChangeHandle();
                setMessage(null);
                setResultExist(false);
            }, 2000);
            setMessage( data.message );
        }).catch(err => console.log(err));
    }

    const popoverArchiveSurvey = (
        <Popover id="popover-basic" data-trigger="focus">
        <Popover.Title as="h3">Closing Survey</Popover.Title>
        <Popover.Content>
            After closing the survey you won't be able to <strong>update</strong> the results until you delete the results. Double Click to close the survey.
        </Popover.Content>
        </Popover>
    );

    const popoverDeleteResult = (
        <Popover id="popover-basic">
          <Popover.Title as="h3">Delete the Result</Popover.Title>
          <Popover.Content>
            Double click to delete the result of this particular survey. You won't me able to <strong>view</strong> the results anymore.
          </Popover.Content>
        </Popover>
    );
    
    return(
        <Card className="shadow-sm mb-5 bg-white rounded" style={{ width: '100%' }}>
            <Card.Header as="h5" className="text-center"> 
                {props.name} Survey
            </Card.Header>
            <Card.Body>
                { detailBody.number_detail === 0 &&    
                // no detail no url, create one
                    <>
                        <p>No active survey!</p>
                        <div className="text-center m-2">
                            <Button variant="info" className='m-1' onClick={createSurvey}>Create {props.name} Survey</Button>    
                        </div>
                    </>
                }
                { detailBody.number_detail === 1 &&
                // if detail is present, get details
                <>
                    <Row>
                        <EditUrl 
                            value={detailBody.details} 
                            name={props.name} 
                            num={props.num} 
                            count={detailBody.number_detail} 
                            onChangeHandle={onChangeHandle}/>
                    </Row>
                    {/* <Row>
                        <Col sm={3}>
                            Year:
                        </Col>
                        <Col sm={9}>
                            {detailBody.details.result.year}
                        </Col>
                    </Row> */}
                    <Row>
                        <Col sm={3}>
                            Number of Questions:
                        </Col>
                        <Col sm={9}>
                            {props.num}
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={3}>
                            Survey Takers:
                        </Col>
                        <Col sm={9}>
                            {detailBody.details.result.numberOfParts}
                        </Col>
                    </Row>
                    { detailBody.number_url === 1 &&            // if url is present show url link
                        <Row>
                            <Col sm={3}>
                            Survey Link: 
                            </Col>
                            <Col sm={9}>
                                <Card.Text>  
                                    {'http://127.0.0.1:3000/admin/surveys/'+props.name+'/url/'+detailBody.urlId._id}
                                    {/* {'http://cs_survey.salemstate.edu/admin/surveys/'+props.name+'/url/'+detailBody.urlId._id} */}
                                </Card.Text>
                            </Col>
                        </Row>
                    }

                    <Row className="justify-content-center mt-2">
                        { detailBody.number_url === 0 ?     // no url link, give option to create it
                            <div className="m-2">
                                <Button variant="info" className='m-1' onClick={createSurvey}>Activate Survey</Button>    
                            </div>
                        : null}

                        { detailBody.number_url === 1 ?     // url present so give option to close the url
                            <div className="m-2">
                                <a href={'http://127.0.0.1:3000/admin/surveys/'+props.name+'/url/'+detailBody.urlId._id}>
                                {/* <a href={'http://cs_survey.salemstate.edu/admin/surveys/'+props.name+'/url/'+detailBody.urlId._id}> */}
                                    <Button variant="success" className='m-1'>Preview Survey</Button>    
                                </a>
                            </div>
                        : null}
                        
                        { detailBody.number_url === 1 ?     // url present so give option to close the url
                            <div className="m-2">
                                <Button variant="warning" className='m-1' onClick={deleteSurvey}>Deactivate Survey</Button>    
                            </div>
                        : null}
                        
                        { !resultExist ?
                            <div className="m-2">
                                <OverlayTrigger 
                                    delay={{ show: 250, hide: 300 }} 
                                    placement="right" 
                                    overlay={popoverArchiveSurvey}>
                                    <Button variant="danger" className='m-1' onDoubleClick={archiveSurvey}>Save and Close</Button> 
                                </OverlayTrigger>   
                            </div>
                            :
                            <div className="m-2">
                                <OverlayTrigger
                                    delay={{ show: 250, hide: 300 }} 
                                    placement="right" 
                                    overlay={popoverDeleteResult}>
                                    <Button variant="danger" className='m-1' onDoubleClick={deleteResult}>Delete and Recreate</Button>
                                </OverlayTrigger>   
                            </div>
                        }
                    </Row>
                </>
                }
                <div className="m-1 p-1">
                        {message ? <Message message={message} /> : null }
                    </div>
            </Card.Body>
        </Card>
    );
}

export default Url;