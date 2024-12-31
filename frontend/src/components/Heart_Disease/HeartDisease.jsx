import React, { useState, useEffect } from 'react';
import './HeartDisease.css'; // Import the CSS file for HeartDiseaseForm styling
import heartImage from '../../assets/Human_heart_3.png'; // Import the heart image
import FileUpload from '../FileUpload/FileUpload';
import { useRecoilValue } from 'recoil';
import { responseAtom } from '../../atom/responseAtom';

const HeartDisease = () => {
  const [formData, setFormData] = useState({
    age: '',
    sex: '',
    cp: '',
    chol: '',
    fbs: '',
    restecg: '',
    thalach: '',
    exang: '',
    oldpeak: '',
    slope: '',
    ca: '',
    thal: '',
    trestbps: '' // Added trestbps to the initial state
  });

  const response = useRecoilValue(responseAtom);
  const [resultData, setResultData] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Your form submission logic and API call
    try {
      const response = await fetch('http://127.0.0.1:5000/api/heart_disease', {
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
        age: response.data.text.age || '',
        sex: response.data.text.sex || '',
        cp: response.data.text.cp || '',
        chol: response.data.text.chol || '',
        fbs: response.data.text.fbs || '',
        restecg: response.data.text.restecg || '',
        thalach: response.data.text.thalach || '',
        exang: response.data.text.exang || '',
        oldpeak: response.data.text.oldpeak || '',
        slope: response.data.text.slope || '',
        ca: response.data.text.ca || '',
        thal: response.data.text.thal || '',
        trestbps: response.data.text.trestbps || '' // Added trestbps to the state update
      }));
      console.log('hi there', response)
    }
  }, [response]);

  return (
    <div className="scrollable-container">
      <div className="heart-disease-form-container">
        <div className="form-container">
          <div className='input-from-text'>Enter Details</div>
          <FileUpload disease = "heart"/>
          <form className="heart-disease-form" onSubmit={handleSubmit}>
            <div className="form-input">
              <label htmlFor="age">Age:</label>
              <input type="number" id="age" name="age" value={formData.age} onChange={handleChange} />
            </div>
            <div className="form-input">
              <label htmlFor="sex">Sex:</label>
              <select id="sex" name="sex" value={formData.sex} onChange={handleChange}>
                <option value="">Select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
            <div className="form-input">
              <label htmlFor="cp">Chest Pain:</label>
              <input type="number" id="cp" name="cp" value={formData.cp} onChange={handleChange} />
            </div>
            <div className="form-input">
              <label htmlFor="chol">Serum Cholesterol:</label>
              <input type="number" id="chol" name="chol" value={formData.chol} onChange={handleChange} />
            </div>
            <div className="form-input">
              <label htmlFor="trestbps">Trestbps:</label>
              <input type="number" id="trestbps" name="trestbps" value={formData.trestbps} onChange={handleChange} />
            </div>
            <div className="form-input">
              <label htmlFor="fbs">Fasting Blood Sugar:</label>
              <input type="number" id="fbs" name="fbs" value={formData.fbs} onChange={handleChange} />
            </div>
            <div className="form-input">
              <label htmlFor="restecg">Restecg:</label>
              <input type="number" id="restecg" name="restecg" value={formData.restecg} onChange={handleChange} />
            </div>
            <div className="form-input">
              <label htmlFor="thalach">Thalach:</label>
              <input type="number" id="thalach" name="thalach" value={formData.thalach} onChange={handleChange} />
            </div>
            <div className="form-input">
              <label htmlFor="exang">Exang:</label>
              <input type="number" id="exang" name="exang" value={formData.exang} onChange={handleChange} />
            </div>
            <div className="form-input">
              <label htmlFor="oldpeak">Oldpeak:</label>
              <input type="number" id="oldpeak" name="oldpeak" value={formData.oldpeak} onChange={handleChange} />
            </div>
            <div className="form-input">
              <label htmlFor="slope">Slope:</label>
              <input type="number" id="slope" name="slope" value={formData.slope} onChange={handleChange} />
            </div>
            <div className="form-input">
              <label htmlFor="ca">Ca:</label>
              <input type="number" id="ca" name="ca" value={formData.ca} onChange={handleChange} />
            </div>
            <div className="form-input">
              <label htmlFor="thal">Thalassemia:</label>
              <input type="number" id="thal" name="thal" value={formData.thal} onChange={handleChange} />
            </div>
            <button type="submit">Predict</button>
          </form>
        </div>
        <div className="heart-image-container">
          <img src={heartImage} alt="Heart" className="heart-image" />
        </div>
      </div>
    </div>
  );
};

export default HeartDisease;
