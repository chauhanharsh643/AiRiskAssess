from flask import Flask
from flask_cors import CORS
from heart_disease import heart_disease_route
from extract_text import extract_data
from diabeties import diabetes_route

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

app.register_blueprint(heart_disease_route)
app.register_blueprint(diabetes_route)
app.register_blueprint(extract_data)

if __name__ == "__main__":
    app.run(debug=True)
