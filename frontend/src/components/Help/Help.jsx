import React from "react";
import './Help.css';

const Help = () => {
    return(
        <div className="help-container">
            <div className="to">
                <div style={{fontSize:"35px"}}>How to Go About AIHealthAssess</div>
                <div style={{width:"50%", marginLeft:"25%", marginTop:"8px"}}>Please find below the Steps for Administrators to go about the Risk Assessment System. <a href="">Click</a> to learn more</div>
            </div>
            <div className="b">
                <div>1. Login into the system using your account to start generating risk Assessment.</div>
                <div>2. Select the type of Diease for which you want to generate risk.</div>
                <div>3. Inputs the patients Value</div>
                <div>4. Click on Submit</div>
                <div>5. Get Assessment Result</div>
            </div>
        </div>
    )
}

export default Help;