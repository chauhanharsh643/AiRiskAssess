import React, { useState, useEffect } from 'react';
import './Diabeties.css';
import diabetesImage from '../../assets/diabetes.png'; // Import the diabetes image
import FileUpload from '../FileUpload/FileUpload';
import { diabetesResponseAtom } from '../../atom/diabetesResponseAtom';
import { useRecoilValue } from 'recoil';

// Pregnancies,Glucose,BloodPressure,SkinThickness,Insulin,BMI,DiabetesPedigreeFunction,Age,Outcome
const Diabeties = () => {
  const [formData, setFormData] = useState({
    pregnancies: '',
    glucose: '',
    bloodPressure: '',
    skinThickness: '',
    insulin: '',
    bmi: '',
    diabetesPedigreeFunction: '',
    age: '',
  });

  const [resultData, setResultData] = useState(null);
  const response = useRecoilValue(diabetesResponseAtom);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Your form submission logic and API call
    try {
      const response = await fetch('http://127.0.0.1:5000/api/diabetes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      
      if (!response.ok) {
        throw new Error('Failed to submit form');
      }

      const data = await response.json();
      
      // Set the result data in state
      setResultData(data);
    } catch (error) {
      // Handle errors
      console.error('Error submitting form:', error);
    }
  };
  
  // useEffect hook to redirect when resultData changes
  useEffect(() => {
    if (resultData) {
      // Encode the resultData into a query string
      const queryString = new URLSearchParams(resultData).toString();
      
      // Redirect to the result page with the query string as part of the URL
      window.location.href = `/result?${queryString}`;
    }
  }, [resultData]);

  // useEffect hook to update formData when the response changes
  useEffect(() => {
    if (response.data) {
      setFormData((prevData) => ({
        ...prevData,
        pregnancies: response.data.text.pregnancies || '',
        glucose: response.data.text.glucose || '',
        bloodPressure: response.data.text.bloodPressure || '',
        skinThickness: response.data.text.skinThickness || '',
        insulin: response.data.text.insulin || '',
        bmi: response.data.text.bmi || '',
        diabetesPedigreeFunction: response.data.text.diabetesPedigreeFunction || '',
        age: response.data.text.age || ''
      }));
      console.log('hi there', response)
    }
  }, [response]);
  
  return (
    <div className="scrollable-container">
      <div className="diabetes-disease-form-container">
        <div className="form-container">
        <div className='input-from-text'> Enter Details </div>
        <FileUpload disease = "diabetes"/>
          <form className="diabetes-disease-form" onSubmit={handleSubmit}>
            <div className="form-input">
              <label htmlFor="pregnancies">Pregnancies:</label>
              <input type="number" id="pregnancies" name="pregnancies" onChange={handleChange} />
            </div>
            <div className="form-input">
              <label htmlFor="glucose">Glucose:</label>
              <input type="number" id="glucose" name="glucose" onChange={handleChange} />
            </div>
            <div className="form-input">
              <label htmlFor="skinThickness">SkinThickness:</label>
              <input type="number" id="skinThickness" name="chol" onChange={handleChange} />
            </div>
            <div className="form-input">
              <label htmlFor="insulin">Insulin:</label>
              <input type="number" id="insulin" name="insulin" onChange={handleChange} />
            </div>
            <div className="form-input">
              <label htmlFor="bmi">BMI:</label>
              <input type="number" id="bmi" name="bmi" onChange={handleChange} />
            </div>
            <div className="form-input">
              <label htmlFor="diabetesPedigreeFunction ">DiabetesPedigreeFunction :</label>
              <input type="number" id="diabetesPedigreeFunction" name="diabetesPedigreeFunction" onChange={handleChange} />
            </div>
            <div className="form-input">
              <label htmlFor="age">Age:</label>
              <input type="number" id="age" name="age" onChange={handleChange} />
            </div>
            <button type="submit">Predict</button>
          </form>
        </div>
        <div className="diabetes-image-container">
          <img src={diabetesImage} alt="diabetes" className="diabetes-image" />
        </div>
      </div>
    </div>
  );
};

export default Diabeties;
