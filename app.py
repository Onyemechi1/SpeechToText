# from flask import Flask, render_template, request, send_file
# import speech_recognition as sr
# from google.cloud import translate_v2 as translate
# import os

# app = Flask(__name__)
# translate_client = translate.Client()

# @app.route('/')
# def index():
#     return render_template('index.html')

# @app.route('/upload', methods=['POST'])
# def upload():
#     if 'file' not in request.files:
#         return 'No file part'
#     file = request.files['file']
#     if file.filename == '':
#         return 'No selected file'
#     if file:
#         recognizer = sr.Recognizer()
#         audio_file = sr.AudioFile(file)
#         with audio_file as source:
#             audio = recognizer.record(source)
#         text = recognizer.recognize_google(audio)
#         target_language = request.form['language']
#         translation = translate_client.translate(text, target_language=target_language)
#         translated_text = translation['translatedText']
#         file_path = os.path.join('translations', 'translated.txt')
#         with open(file_path, 'w') as f:
#             f.write(translated_text)
#         return send_file(file_path, as_attachment=True)

# if __name__ == '__main__':
#     app.run(debug=True)


import googletrans

print(googletrans.LANGUAGES)