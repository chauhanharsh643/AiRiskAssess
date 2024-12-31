import React from "react";
import "./Home.css"
import {Fade, Zoom, Slide} from "react-slideshow-image";

import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { ImPower } from "react-icons/im";
import { FaLock } from "react-icons/fa";
import { FaCheck } from "react-icons/fa";

import { FaFacebookSquare } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";
import { FaXTwitter } from "react-icons/fa6";

const Home = () => {

    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
      };

    const slideContent = [
        {
            heading : "Easy to Use.",
            paragraph : "The Development Process is Simplified using a Clean and an Elegant User Interface with Minimal Complexities."
        },
        {
            heading : "Efficient and Reliable.",
            paragraph : "An efficient and a reliable tool to generate your risk assessments. Learn more about RiskAsess."
        },
        {
            heading : "Simple and Non-Complex.",
            paragraph : "The Development Process is Simplified using a Clean and an Elegant User Interface with Minimal Complexities."
        },
    ]

    return (
        <div className="home-container">
            <div className="slider-container">
                <div className="slider">
                    <Slider {...settings} className="some">
                        {slideContent.map((content) =>(
                            <div className="slide-content">
                                <div className="heading">{content.heading}</div>
                                <div className="paragraph">{content.paragraph}</div>
                            </div>
                            
                        ))}
                    </Slider>
                </div>
            </div>
            <div className="welcome-message">
                <div className="message">Welcome to RiskAssess!, a risk assessment system for medical institutions to generate risk assessments.
                If your organization faces any challenges while generating the risk assessment or has any concerns regarding the system please visit our help or about us pages.</div>
                <div><button>About us</button></div>
            </div>
            
            <div className="middle">
                <div style={{fontSize : "40px", fontWeight : "bold", textAlign:"center"}}>Assess with ease.</div>
                <div className="line">A Risk Assessment Tool that allows for the swift, efficient and smooth generation of risk assessments for your patients.</div>
                <div className="card-container">
                    <div className="card">
                        <div ><ImPower className="icon"/></div>
                        <div className="head">Fast</div>
                        <div className="para">Fast and smooth Assesment</div>
                    </div>

                    <div className="card">
                        <div ><FaLock className="icon"/></div>
                        <div className="head">Secure</div>
                        <div className="para">Secure Assessment Process.</div>
                    </div>

                    <div className="card">
                        <div ><FaCheck className="icon"/></div>
                        <div className="head">Reliable</div>
                        <div className="para">Reliable and Trustworthy Process.</div>
                    </div>
                </div>
                <div style={{fontSize:"25px", textAlign:"center", marginTop:"50px"}}>Connect</div>

                <div className="social-icons-container">
                    <div className="facebook-icon"><FaFacebookSquare/></div>
                    <div className="instagram-icon"><FaInstagram/></div>
                    <div><FaXTwitter/></div>
                </div>
            </div>
            <div className="footer">
                <div>
                    <div className="footer-line">Contact Details</div>
                    <div style={{marginTop:"24px", textAlign:"center", height:"26px"}}>+91 9235918366</div>
                    <div style={{textAlign:"center", height:"26px"}}>contactus@airiskassess.com</div>
                    <div style={{textAlign:"center", height:"26px"}}>Humayunpur (North)</div>
                    <div style={{textAlign:"center", height:"26px"}}>Gorakhpur, Uttar Pradesh</div>
                </div>

                <div>
                <div className="footer-line">Our hours</div>
                    <div style={{marginTop:"24px", textAlign:"center", height:"26px"}}>Monday 9am-6pm</div>
                    <div style={{textAlign:"center", height:"26px"}}>Satarday 11am-7pm</div>
                    <div style={{textAlign:"center", height:"26px"}}>Sunday (closed)</div>
                </div>

                <div>
                    <div className="footer-line">Service Areas</div>
                    <div  style={{marginTop:"24px", textAlign:"center", height:"26px"}}>Gorakhpur, Uttar Oradesh</div>
                    <div style={{textAlign:"center", height:"26px"}}>Kurukshetra, Haryana</div>
                    <div style={{textAlign:"center", height:"26px"}}>Nirman vihar, New Delhi</div>
                    <div style={{textAlign:"center", height:"26px"}}>Ludhiyana, Panjab</div>
                </div>
            </div>
        </div>
    )
}

export default Home;