import React from 'react';

import './thank.css';

function ThankPage() {
    return (
        <div className="main">
            <div className="main-box"> 

                <div className="robo">
                    <div className="robo-top">
                        <div className="head"></div>
                        <div className="eye"></div>
                        <div className="sparkle-right"></div>
                        <div className="sparkle-left"></div>
                    </div>
                    <div className="robo-middle">
                        <div className="torso">
                            <div className="torso-inner"></div>
                        </div>
                        <div className="hand-left"></div>
                        <div className="hand-right"></div>
                    </div>
                </div>

                <h1 className="shaky"> Thank you! </h1>
                <hr />

                <h5 className="scrollTopToBottom"> The Computer Science department appreciates your effort for taking the survey. </h5>
            </div>
        </div>
    );
}

export default ThankPage;