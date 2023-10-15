from flask import Flask, request, jsonify
import openai
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

openai.api_key = "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"

@app.route('/chat', methods=['POST'])
def chat():
    user_input = request.json.get('user_input')
    if user_input:
        response = chat_with_gpt3(user_input)
        return jsonify({"response": response})
    else:
        return jsonify({"error": "No user input provided."}), 400

def chat_with_gpt3(prompt):
    response = openai.Completion.create(
        engine="text-davinci-003",
        prompt=prompt,
        max_tokens=50
    )
    return response.choices[0].text

if __name__ == '__main__':
    app.run(debug=True)
