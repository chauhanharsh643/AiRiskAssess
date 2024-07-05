from flask import Blueprint, jsonify, request
import pickle
import numpy as np
from PyPDF2 import PdfReader
import logging
import io
import re

import os

os.environ['CURL_CA_BUNDLE'] = ''


logging.basicConfig(level=logging.DEBUG)
extract_data = Blueprint("extract_data", __name__)

@extract_data.route('/api/extract_data', methods=['POST'])
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

            
            text_without_newlines = text.replace('\n', ' ')

            
            text = re.sub(r'\s+', ' ', text_without_newlines)
            res = gen1(text)
            print(res)

            res = extractInformation(res)

            # text = gen(text)
        return jsonify({'text': res})
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    

from transformers import GPT2LMHeadModel, GPT2Tokenizer

def gen1(text):
    model = GPT2LMHeadModel.from_pretrained("gpt2")
    tokenizer = GPT2Tokenizer.from_pretrained("gpt2")

    prompt = f"""
Extract the following information from the medical report:

- Age
- Sex
- Chest Pain
- Cholesterol
- Resting Blood Pressure (trestbps)
- Blood Sugar
- Resting ECG (restecg)
- Maximum Heart Rate Achieved (thalach)
- Exercise Induced Angina (exang)
- ST Depression (oldpeak)

Report Text:
{text}

"""
    inputs = tokenizer(prompt, return_tensors="pt", max_length=1024, truncation=True)

    in_ids = model.generate(inputs.input_ids, max_length=1024, pad_token_id=tokenizer.eos_token_id)
    response = tokenizer.decode(in_ids[0], skip_special_tokens=True, clean_up_tokenization_spaces=False)

    return response

def extractInformation(res):
    report = res

    # Splitting the report into parts to easily locate needed values
    parts = report.split()

    # Define a function to get the value after a given keyword
    def get_value_after_keyword(parts, keyword):
        for i, part in enumerate(parts):
            if keyword in part:
                # The value is the next item in the list
                return parts[i + 1]
        return ""

    # Extracting the values
    def extract_age_sex(parts):
        for i, part in enumerate(parts):
            if "Age/Sex" in part:
                age_sex_str = parts[i].split(":")[1]  # Split based on ':'
                age_sex_list = age_sex_str.split("/")
                if len(age_sex_list) == 2:
                    return age_sex_list[0], age_sex_list[1]
        return None, None

    # Use the function to get age and sex
    age, sex = extract_age_sex(parts)
    cholesterol = get_value_after_keyword(parts, "Cholesterol(chol)")
    mean_platelet_volume = get_value_after_keyword(parts, "MeanPlateletVolume")
    thalach = get_value_after_keyword(parts, "Thalach")
    restecg = get_value_after_keyword(parts, "Restecg")
    trestbps = get_value_after_keyword(parts, "Trestbps")
    
    ca = get_value_after_keyword(parts, "Ca")
    cp = get_value_after_keyword(parts, "Chest Pain")
    fbs = get_value_after_keyword(parts, "fps")
    exange = get_value_after_keyword(parts, "exange")
    oldpeak = get_value_after_keyword(parts, "Oldpeak")
    slope = get_value_after_keyword(parts, "Slope")
    thal = get_value_after_keyword(parts, "Thalassemia")

    # Print extracted values

    sex_int = "male"
    if sex == "F":
        sex_int = "female"
    response = {
        "age" : age,
        "sex" : sex_int,
        "chol" : cholesterol,
        "cp": cp,
        "fbs": fbs,
        "restecg": restecg,
        "thalach": thalach,
        "exang": exange,
        "oldpeak": oldpeak,
        "slope": slope,
        "ca": ca,
        "thal": thal,
        "trestbps": trestbps
    }
    print("Age:", age)
    print("Sex:", sex)
    print("Cholesterol:", cholesterol)
    print("Mean Platelet Volume:", mean_platelet_volume)
    return response
