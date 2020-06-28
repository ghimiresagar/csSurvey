import React from 'react';

import './howto.css';
import loginGif from  '../../images/logingif.gif';
import dashboard from '../../images/dashboard.png';
import url from '../../images/url.png';
import questions from '../../images/questions.png';
import graph from '../../images/graph.png';
import results from '../../images/results.png';
import surveyview from '../../images/surveyview.png';

import Container from 'react-bootstrap/Container';

function HowTo() {
    return (
        <div className="main-howto">
            <Container>
                <br />
                <h3 className="toph3left"> Computer Science Department </h3>
                <h1 className="toph1"> Survey Web App </h1>
                <h3 className="toph3right"> Date: June 21, 2020 </h3> <hr /><br></br>
                <p> This report provides a general outline on how to use the Survey Web App and on it's functionality.
                    We will discuss the following sections in detail in the order they should be performed.</p>
                <ol>
                    <li>Overview</li>
                    <li>Login</li>
                    <li>Create, Edit, and Deactivating Survey</li>
                    <li>Create, Edit, and Delete Survey Questions</li>
                    <li>Archive Survey Results</li>
                    <li>View Survey Results</li>
                    <li>Survey Taker View</li>
                </ol>

                <div className="para-section">
                    <h2>Overview</h2>
                    <p> The Survey Web App is a modern MERN stack app introduced to make it easier to take Senior, Alumni, and IAB surveys online plus visualize the results.
                        It contains 3 different types of surveys similar in functionality where the end user (admin), can easily admistrate the survey and survey taker
                        can easily take the survey with the provided url. The admin can also activate or deactivate the survey link, save and close the survey, and view 
                        the survey results (table or graph format) with a click of a button. Moreover, the admin has the option to download a csv format of the results to 
                        manipulate the date on their own will.
                    </p>
                </div>

                <div className="para-section">
                    <h2>Login</h2>
                    <p> 
                        The app introduces a basic login page for the admin with option to provide username and password. It also provides basic validation and appropriate error message to the user.<br />
                    </p>
                    <div className="gifBox">
                        <img src={loginGif} alt="login gif"/>
                    </div>
                    <br />
                    <p>
                        <i>The survey web app doesn't provide any registration form to prevent unwanted access to the app.</i>
                    </p>
                    <p>
                        Once Logged in, the add takes the admin to the landing page which provides the overview of the surveys. It provides information such as active surveys, description of 
                        surveys, and number of people who took the survey.
                    </p>

                    <div className="gifBox">
                        <img src={dashboard} alt="dashboard"/>
                    </div>
                </div>

                <div className="para-section">
                    <h2>Create, Edit, and Deactivating Survey</h2>
                    <p>
                        In case of no survey available, a create a survey button is available for the user. On clicked, a description of the survey is provided to the admin with option to 
                        edit the description and year along with the options to preview, deactivate, or close the survey. Preview Survey will take the admin to a mock preview of the survey that
                        which represents how survey takers see the survey. Deactivating the survey will deactivate the link of the survey and will not affect the questions or the result so far for 
                        the survey.
                    </p>

                    <div className="gifBox">
                        <img src={url} alt="url edit"/>
                    </div>
                </div>

                <div className="para-section">
                    <h2>Create, Edit, and Delete Survey Questions</h2>
                    <p>
                        Initially, the survey will contain no questions to display. But adding a question is very intuitive. Once the admin writes the question on the textarea, pressing the 
                        "Add Question" button will add the question to the survey. Along with creating a question title, the admin can also select the type of the input for the question such as,
                        rate, short input, or longer comment. <br />
                        Once the question is added, it appears at the bottom with an option to edit question title, the input type, the order in which the questions will appear, or delete the question.
                    </p>
                    
                    <div className="gifBox">
                        <img src={questions} alt="questions"/>
                    </div>
                </div>

                <div className="para-section">
                    <h2>Archive Survey Results</h2>
                    <p>
                        Once the survey is taken by the audience, the admin can save and close the survey. This will not affect the questions for the survey rather save the results of the question and delete the 
                        survey link along with the survey. After this function is performed, the admin won't be able to create a new survey for the same year. For security, the admin has to double click the button.
                    </p>

                    <h2>View Survey Results</h2>
                    <p>
                        Once saved and closed, the result for the particular survey can be view under view result page which provides a easy to use interface for the user that displays the results on a tabular format and
                        seperate graph for each question. Also the admin can download the csv file associated with the particular survey to manipulate the date on their own.
                    </p>

                    
                    <div className="gifBox">
                        <img src={results} alt="results"/>
                    </div>
                    <br></br>
                    <div className="gifBox">
                        <img src={graph} alt="graph"/>
                    </div>
                </div>

                <div className="para-section">
                    <h2>Survey Taker View</h2>
                    <p>
                        The generated random link to the survey is used to go to the webpage where users can take the survey. The survey can be take only once by the user until the survey is saved and closed.
                        Generating a new link for the same survey won't let the user to take the survey again.
                    </p>
                    
                    <div className="gifBox">
                        <img src={surveyview} alt="survey view"/>
                    </div>
                </div>
            </Container>
        </div>
    );
}

export default HowTo;