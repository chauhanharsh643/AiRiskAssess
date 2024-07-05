from flask import Blueprint, jsonify, request
import pickle
import numpy as np

diabetes_route = Blueprint("diabetes_route", __name__)

@diabetes_route.route('/api/diabetes', methods=['POST'])
def get_details():
    data = request.json
    
    default_values = {
        'pregnancies': 50, 'glucose': 0, 'bloodPressure': 120, 'skinThickness': 200, 'insulin': 100,
        'bmi': 0, 'diabetesPedigreeFunction': 150, 'age': 0, 
    }
    
    pregnancies = float(data.get('pregnancies', default_values['pregnancies']) or default_values['pregnancies'])
    glucose = float(data.get('glucose', default_values['glucose']) or default_values['glucose'])
    bloodPressure = float(data.get('bloodPressure', default_values['bloodPressure']) or default_values['bloodPressure'])
    skinThickness = float(data.get('skinThickness', default_values['skinThickness']) or default_values['skinThickness'])
    insulin = float(data.get('insulin', default_values['insulin']) or default_values['insulin'])
    bmi = float(data.get('bmi', default_values['bmi']) or default_values['bmi'])
    diabetesPedigreeFunction = float(data.get('diabetesPedigreeFunction', default_values['diabetesPedigreeFunction']) or default_values['diabetesPedigreeFunction'])
    age = float(data.get('age', default_values['age']) or default_values['age'])
    
    

    with open('E:\collegeProject\python\model\diabetes.pkl', 'rb') as f:
        model = pickle.load(f)

    input_data = (pregnancies, glucose, bloodPressure, skinThickness, insulin, bmi, diabetesPedigreeFunction, age)

    input_data_as_numpy_array = np.asarray(input_data)
    input_data_reshaped = input_data_as_numpy_array.reshape(1, -1)

    prediction = model.predict(input_data_reshaped)

    if prediction[0] == 0:
        return jsonify({"result": "0diabetes"})
    else:
        return jsonify({"result": "1diabetes"})
