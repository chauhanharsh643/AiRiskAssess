import React from "react";
import './About.css'

const About = () => {
    return (
        <div>
            <div className="getStarted-container">
                <div style={{fontSize:"40px", marginBottom:"20px"}}>About AIRiskAssess</div>
                <div>Welcome to AIRiskAssess!, a risk assessment system for medical institutions to generate risk assessments for their patients. RiskAssess started off as a company that formed strong relationships with medical institutions to help them generate their assessments with
         ease and maximum efficiency thus saving the organization's valuable time. Click below for Help.</div>
                <div><button className="nav-button black-background" style={{marginLeft:"0px", marginTop:"15px"}}>Help &raquo;</button></div>
            </div>

            <div style={{backgroundColor:"rgb(235, 235, 213)", marginTop:"0px", paddingBottom:"7px"}}>
                <div style={{display:"flex", justifyContent:"space-between", marginLeft:"10%", width:"80%", paddingBottom:"30px"}}>
                    <div className="help-card">
                        <div>Admin</div>
                        <div>RiskAssess provides instituitons with an Admin account to generate risk assessments for their patients.</div>
                        <div style={{ marginBottom:"0px"}}><button className="nav-button black-background" style={{marginLeft:"0px"}}>Login &raquo;</button></div>
                    </div>
                    <div className="help-card">
                        <div>How does it Work?</div>
                        <div>RiskAssess makes use of machine learning models that helps generate accurate risk assessments.</div>
                        <div style={{ marginBottom:"0px"}}><button className="nav-button black-background" style={{marginLeft:"0px"}}>Generate Assessment &raquo;</button></div>
                    </div>
                    <div className="help-card">
                        <div>Terms & Conditions</div>
                        <div>If your organization has any concerns regarding the system please click below to read our Terms and Conditions.</div>
                        <div style={{ marginBottom:"0px"}}><button className="nav-button black-background" style={{marginLeft:"0px"}}>Terms & Conditions &raquo;</button></div>
                    </div>
                </div>
                <div style={{marginLeft:"1%"}}>&copy; AIHealthassess. All Rights Reserved</div>
            </div>
        </div>
    )
}

export default About;