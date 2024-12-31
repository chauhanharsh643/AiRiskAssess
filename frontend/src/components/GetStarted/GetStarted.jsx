import React from "react";
import './GetStarted.css'

const GetStarted = () =>{
    return (
        <div>
            <div className="getStarted-container">
                <div style={{fontSize:"40px"}}>Hello! Lets Get Started with AIHealthAssess</div>
                <div>Welcome to AIHealthAssess!, a risk assessment system for medical institutions to generate risk assessments for their patients. AIHealthAssess started off as a company that formed strong relationships with medical institutions to help them generate their assessments with ease and maximum efficiency thus saving the organization's valuable time.
          Click below to learn about the diseases that AIHealthAssess is capable of assessing.</div>
                <div><button className="nav-button black-background" style={{marginLeft:"0px", marginTop:"10px"}}>Get Started &raquo;</button></div>
            </div>

            <div style={{backgroundColor:"rgb(235, 235, 213)", marginTop:"0px"}}>
                <div style={{display:"flex", justifyContent:"space-between", marginLeft:"10%", width:"80%"}}>
                    <div className="help-card">
                        <div>1. Cancer Prediction</div>
                        <div>Navigate to the "Cancer" section and add the corresponding details and click on predict to learn whether the patient is at the risk of this illness/disease.</div>
                    </div>
                    <div className="help-card">
                        <div>2. Diabetes Prediction</div>
                        <div>Navigate to the "Diabetes" section and add the corresponding details and click on predict to learn whether the patient is at the risk of this illness/disease.</div>
                    </div>
                    <div className="help-card">
                        <div>3. Heart Disease</div>
                        <div>Navigate to the "Heart Disease" section and add the corresponding details and click on predict to learn whether the patient is at the risk of this illness/disease.</div>
                    </div>
                </div>
                <div style={{display:"flex", justifyContent:"space-between", marginLeft:"10%", width:"80%", marginTop:"30px"}}>
                    <div className="help-card">
                        <div>4. Kidney Disease</div>
                        <div>Navigate to the "Kidney Disease" section and add the corresponding details and click on predict to learn whether the patient is at the risk of this illness/disease.</div>
                    </div>
                    <div className="help-card">
                        <div>5. Liver Disease</div>
                        <div>Navigate to the "Liver Disease" section and add the corresponding details and click on predict to learn whether the patient is at the risk of this illness/disease.</div>
                    </div>
                    <div className="help-card">
                        <div>6. Disease Index</div>
                        <div>Navigate to the "Disease Index" section and gain in-depth information about each of these diseases.</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default GetStarted;
