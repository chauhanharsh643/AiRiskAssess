import React, { useState } from 'react';
import axios from 'axios';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { responseAtom } from '../../atom/responseAtom';
import './FileUpload.css'; // Import the CSS file for FileUpload styling
import { diabetesResponseAtom } from '../../atom/diabetesResponseAtom';

const FileUpload = (props) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // State to track loading status
  const setHeartResponseData = useSetRecoilState(responseAtom);
  const setDiabetesResponseData = useSetRecoilState(diabetesResponseAtom);

  const handleFileUpload = async () => {
    console.log(props.disease)
    if (!selectedFile) {
      alert('Please select a file.');
      return;
    }

    try {
      setIsLoading(true); // Start loading

      const formData = new FormData();
      formData.append('file', selectedFile);

      const response = await axios.post('http://127.0.0.1:5000/api/extract_data', formData, {
        headers: {
          'Content-Type': 'application/pdf'
        }
      });

      if(props.disease == "heart"){
        console.log(props.disease)
        setHeartResponseData(response);
      }
      else if(props.disease == "diabetes"){
        console.log(props.disease)
        setDiabetesResponseData(response);
      }

      console.log('Text extracted from PDF:', response.data.text);
    } catch (error) {
      console.error('Error occurred while uploading file:', error);
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  return (
    <div>
      <div className="upload-container">
        <input type="file" onChange={(e) => setSelectedFile(e.target.files[0])} />
        <button onClick={handleFileUpload} disabled={isLoading}>
          {isLoading ? 'Uploading...' : 'Upload'}
        </button>
      </div>
      {isLoading && (
        <div className="loader-container">
          <div className="loader"></div>
          <div>Loading...</div>
        </div>
      )} {/* Conditional rendering of loader */}
    </div>
  );
};

export default FileUpload;
