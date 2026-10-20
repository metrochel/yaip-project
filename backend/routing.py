from flask import Flask, Response
from flask_cors import CORS
import disciplines_api
import json

app = Flask(__name__)
CORS(app)


def disciplines_handle(function):
    if function == "list":
        lst = disciplines_api.get_disciplines_list()
        if not lst:
            # Если не найдено дисциплин, вернуть код 204 No Content.
            return Response(status=204)
        
        jsoned_list = json.dumps(lst, ensure_ascii=False, indent=4)
        return Response(status=200, response=jsoned_list, content_type="application/json")
    else:
        # Если нет такой функции, вернуть 404 Not Found.
        return Response(status=400)


@app.route("/api/disciplines/<func>")
def api_disciplines(func):
    try:
        return disciplines_handle(func)
    except FileNotFoundError:
        # Если нет необходимого содержимого, вернуть 404 Not Found.
        return Response(status=404)
    except:
        # В прочих случаях вернуть 500 Internal Server Error.
        return Response(status=500)


if __name__ == "__main__":
    app.run(debug=True)