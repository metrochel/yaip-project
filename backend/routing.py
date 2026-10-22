from flask import Flask, Response, request
import json
import disciplines_api, tests_api

from app import app, db

def disciplines_handle(function):
    if function == "list":
        lst = disciplines_api.get_disciplines_list()
        if not lst:
            # Если не найдено дисциплин, вернуть код 204 No Content.
            return 204
        
        jsoned_list = json.dumps(lst, ensure_ascii=False, indent=4)
        return jsoned_list
    else:
        # Если нет такой функции, вернуть 404 Not Found.
        return 404


def tests_handle(func):
    if func == "list":
        lst = tests_api.list_tests()
        
        if not lst:
            # Если не найдено тестов, вернуть код 204 No Content.
            return 204
        
        jsoned_list = json.dumps(lst, ensure_ascii=False, indent=4)
        return jsoned_list
    else:
        # Если нет такой функции, вернуть 404 Not Found.
        return 404


# === Маршруты ===

# Маршрут /api/disciplines
@app.route("/api/disciplines/<func>")
def api_disciplines(func):
    try:
        result = disciplines_handle(func)
        if result is int:
            return Response(status=result)
        if type(result)==type(""):
            return Response(status=200, response=result, content_type="application/json")
        else:
            print(type(result))
            return Response(status=500)
    except FileNotFoundError:
        # Если нет необходимого содержимого, вернуть 404 Not Found.
        return Response(status=404)
    except Exception as e:
        print(e)
        # В прочих случаях вернуть 500 Internal Server Error.
        return Response(status=500)


# Маршрут /api/tests
@app.route("/api/tests/<func>")
def api_tests(func):
    try:
        result = tests_handle(func)
        if result is int:
            return Response(status=result)
        if type(result)==type(""):
            return Response(status=200, response=result, content_type="application/json")
        else:
            print(type(result))
            return Response(status=500)
    except FileNotFoundError:
        # Если нет необходимого содержимого, вернуть 404 Not Found.
        return Response(status=404)
    except Exception as e:
        # В прочих случаях вернуть 500 Internal Server Error.
        print(e)
        return Response(status=500)


if __name__ == "__main__":
    app.run(debug=True)