from flask import Flask, jsonify, request
import pickle
import numpy as np
import requests
from flask_cors import CORS
from PyPDF2 import PdfReader
import logging
import io

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

logging.basicConfig(level=logging.DEBUG)
    
@app.route('/api/heart_disease', methods = ['POST'])
def get_details():
    # return jsonify(books)
    data = request.json
    
    # Define default healthy values
    default_values = {
        'age': 50,
        'cp': 0,
        'trestbps': 120,
        'chol': 200,
        'fbs': 100,
        'restecg': 0,
        'thalach': 150,
        'exang': 0,
        'oldpeak': 0,
        'slope': 0,
        'ca': 0,
        'thal': 2
    }
    
    # Convert values to float and use default if missing or empty
    age = float(data.get('age', default_values['age']) or default_values['age'])
    cp = float(data.get('cp', default_values['cp']) or default_values['cp'])
    trestbps = float(data.get('trestbps', default_values['trestbps']) or default_values['trestbps'])
    chol = float(data.get('chol', default_values['chol']) or default_values['chol'])
    fbs = float(data.get('fbs', default_values['fbs']) or default_values['fbs'])
    restecg = float(data.get('restecg', default_values['restecg']) or default_values['restecg'])
    thalach = float(data.get('thalach', default_values['thalach']) or default_values['thalach'])
    exang = float(data.get('exang', default_values['exang']) or default_values['exang'])
    oldpeak = float(data.get('oldpeak', default_values['oldpeak']) or default_values['oldpeak'])
    slope = float(data.get('slope', default_values['slope']) or default_values['slope'])
    ca = float(data.get('ca', default_values['ca']) or default_values['ca'])
    thal = float(data.get('thal', default_values['thal']) or default_values['thal'])
    
    # Determine the value of 'sex'
    sex = 1 if data.get('sex', '').lower() == 'male' else 0

    print(age,sex,cp,trestbps,chol,fbs,restecg,thalach,exang,oldpeak,slope,ca,thal)
    
    with open('E:\collegeProject\python\model\heart_disease_model.pkl', 'rb') as f:
        model = pickle.load(f)

    input_data = (age,sex,cp,trestbps,chol,fbs,restecg,thalach,exang,oldpeak,slope,ca,thal)

    # change the input data to a numpy array
    input_data_as_numpy_array= np.asarray(input_data)

    # reshape the numpy array as we are predicting for only on instance
    input_data_reshaped = input_data_as_numpy_array.reshape(1,-1)

    prediction = model.predict(input_data_reshaped)
    print(prediction)

    if (prediction[0]== 0):
        print('The Person does not have a Heart Disease')
        return jsonify({"result" : "0heart"})
    else:
        print('The Person has Heart Disease')
        return jsonify({"result" : "1heart"})
    



    
import re

    
@app.route('/extract-text', methods=['POST'])
def extract_text_from_pdf():
    try:
        # Get the uploaded file
        uploaded_file = request.files['file']
        
        # Create a file-like object from the uploaded file's content
        file_content = io.BytesIO(uploaded_file.read())
        
        logging.debug("Before PdfReader")
        # Open the PDF file without using a context manager
        reader = PdfReader(file_content)
        logging.debug("After PdfReader")
        
        text = ''
        for i, page in enumerate(reader.pages, start=1):
            logging.debug(f"Extracting text from page {i}")
            page_text = page.extract_text()
            if page_text:
                text += page_text
            # text_without_newlines = text.replace('\n', ' ')

            # # Remove continuous space characters
            # text_without_continuous_spaces = re.sub(r'\s+', ' ', text_without_newlines)
            # text = gen(text)
        return jsonify({'text': text})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# import transformers
# import torch

# def gen(text):

#     model_id = "meta-llama/Meta-Llama-3-8B"

#     pipeline = transformers.pipeline(
#         "text-generation", model=model_id, model_kwargs={"torch_dtype": torch.bfloat16}, device_map="auto"
#     )
#     pipeline("Hey how are you doing today?")



if __name__ == '__main__':
    app.run(debug=True)
