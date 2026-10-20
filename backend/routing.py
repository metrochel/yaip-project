from flask import Flask, Response, request
from flask_cors import CORS
import json
import disciplines_api, tests_api

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


def tests_handle(func):
    if func == "list":
        lst = tests_api.list_tests()
        
        if not lst:
            # Если не найдено тестов, вернуть код 204 No Content.
            return Response(status=204)
        
        jsoned_list = json.dumps(lst, ensure_ascii=False, indent=4)
        return Response(status=200, response=jsoned_list, content_type="application/json")
    else:
        # Если нет такой функции, вернуть 404 Not Found.
        return Response(status=404)


# === Маршруты ===

# Маршрут /api/disciplines
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


# Маршрут /api/tests
@app.route("/api/tests/<func>")
def api_tests(func):
    try:
        return tests_handle(func)
    except FileNotFoundError:
        # Если нет необходимого содержимого, вернуть 404 Not Found.
        return Response(status=404)
    except Exception as e:
        # В прочих случаях вернуть 500 Internal Server Error.
        print(e)
        return Response(status=500)


if __name__ == "__main__":
    app.run(debug=True)