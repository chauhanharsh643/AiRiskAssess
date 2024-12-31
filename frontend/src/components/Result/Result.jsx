// Result.jsx
import React, { useEffect, useState } from 'react';
import './Result.css'

const Result = () => {
  const [resultData, setResultData] = useState("");
  const [details, setDetails] = useState("");
  useEffect(() => {
    // Parse the query string to retrieve the result data
    const params = new URLSearchParams(window.location.search);
    const data = Object.fromEntries(params.entries());
    {
      console.log(data)
    }
    // Set the result data in state
    if(data.result.startsWith("1")){
      if(data.result.endsWith("heart")){
        setResultData("The person has high risk of Heart Disease");
        setDetails("https://medlineplus.gov/ency/article/002203.htm");
      }
      else if(data.result.endsWith("diabetes")){
        setResultData("The person has high risk of Diabetes");
        setDetails("https://www.who.int/news-room/fact-sheets/detail/diabetes#:~:text=Overview,hormone%20that%20regulates%20blood%20glucose.");
      }
    }
    else{
      if(data.result.endsWith("heart")){
        setResultData("The person has low risk of Heart Disease");
      }
      else if(data.result.endsWith("diabetes")){
        setResultData("The person has low risk of Diabetes");
      }
    }
  }, []);

  return (
    <div>{
      console.lo}
        <div className='result'>
          <h1 className='div_web'>Risk Assessment</h1>
          <div className='div_data'>{resultData}</div>
          <div className='div_link'>click <a href={details}>here</a> to know more about heart disease</div>
          <div className='div_footer'>&copy;aihealthassess.com</div>
        </div>
    </div>
  );
};

export default Result;
