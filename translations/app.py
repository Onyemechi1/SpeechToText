from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
import requests
import os

app = Flask(__name__)
CORS(app)  # Enable CORS

# Endpoint to handle text translation
@app.route('/', methods=['POST'])
def translate_text():
    data = request.json
    text = data['text']
    target_language = data['language']

    # Use Google Translate API or equivalent for translation
    translated_text = translate(text, target_language)

    return jsonify({'translated_text': translated_text})

def translate(text, target_language):
    # This function should call Google Translate API or any other translation API.
    # Example: replace this with actual API call YOUR_API_KEY.
    API_KEY = 'AIzaSyA_1z1SBk9tjgiYB_aRNyfjjpHcnJMP_tQ'
    url = f'https://translation.googleapis.com/language/translate/v2'
    params = {
        'q': text,
        'target': target_language,
        'key': API_KEY
    }
    response = requests.get(url, params=params)
    result = response.json()

    return result['data']['translations'][0]['translatedText']

# Endpoint to download translated text
@app.route('/download', methods=['POST'])
def download_text():
    data = request.json
    translated_text = data['translated_text']
    language = data['language']

    # Create a file and save the translated text
    file_path = f'translation_{language}.txt'
    with open(file_path, 'w') as f:
        f.write(translated_text)

    return send_file(file_path, as_attachment=True)

if __name__ == '__main__':
    app.run(debug=False)
