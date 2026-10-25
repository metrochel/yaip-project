from flask import Flask, Response, request
import json
import disciplines_api, tests_api
import flask_sqlalchemy

from app import app, db


def code(status: int): return Response(status=status)

def reply(response: str, status=200): return Response(status=status, response=response)


def disciplines_handle(func):
    if func == "list":
        lst = disciplines_api.get_disciplines_list()
        if not lst:
            # Если не найдено дисциплин, вернуть код 204 No Content.
            return code(204)
        
        jsoned_list = json.dumps(lst, ensure_ascii=False, indent=4)
        return reply(jsoned_list)
    elif func == "create":
        if request.method != 'POST':
            # /discipline/create поддерживает только POST.
            return code(405)

        body = request.get_json()
        name = body['name']
        teacher = body['teacher']

        try:
            discipline_id = disciplines_api.create_discipline(name, teacher)
            payload = {
                'created': True,
                'id': discipline_id
            }
            return reply(json.dumps(payload), 201)
        except Exception as e:
            print(e)
            return code(500)
    else:
        # Если нет такой функции, вернуть 404 Not Found.
        return code(404)


def tests_handle(func):
    if func == "list":
        lst = tests_api.list_tests()
        
        if not lst:
            # Если не найдено тестов, вернуть код 204 No Content.
            return code(204)
        
        jsoned_list = json.dumps(lst, ensure_ascii=False, indent=4)
        return reply(jsoned_list)
    else:
        # Если нет такой функции, вернуть 404 Not Found.
        return code(404)


# === Маршруты ===

# Маршрут /api/disciplines
@app.route("/api/disciplines/<func>", methods=['GET', 'POST'])
def api_disciplines(func):
    try:
        return disciplines_handle(func)
    except FileNotFoundError:
        # Если нет необходимого содержимого, вернуть 404 Not Found.
        return code(404)
    except Exception as e:
        print(e)
        # В прочих случаях вернуть 500 Internal Server Error.
        return code(500)


# Маршрут /api/tests
@app.route("/api/tests/<func>")
def api_tests(func):
    try:
        return tests_handle(func)
    except FileNotFoundError:
        # Если нет необходимого содержимого, вернуть 404 Not Found.
        return code(404)
    except Exception as e:
        # В прочих случаях вернуть 500 Internal Server Error.
        print(e)
        return code(500)


if __name__ == "__main__":
    app.run(debug=True)