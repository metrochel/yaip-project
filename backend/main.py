from flask import Flask, Response
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/api/<func>")
def api_function(func):
    return func

if __name__ == "__main__":
    app.run(debug=True, port=5173)