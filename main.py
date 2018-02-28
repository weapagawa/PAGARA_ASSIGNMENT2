#!flask/bin/python
from flask import Flask, jsonify, url_for, request
from flask_httpauth import HTTPBasicAuth
import sys, os
import flask
import model

app = Flask(__name__)
auth = HTTPBasicAuth()

def spcall(qry, param, commit=False):
    try:
        dbo = model.DBconn()
        cursor = dbo.getcursor()
        cursor.callproc(qry, param)
        res = cursor.fetchall()
        if commit:
            dbo.dbcommit()
        return res
    except:
        res = [("Error: " + str(sys.exc_info()[0]) + " " + str(sys.exc_info()[1]),)]
    return res


@auth.get_password
def getpassword(username):
    return 'akolagini'



@app.route('/displaymenu',methods=['GET'])
def displaymenu():
    res = spcall('displaymenu', (), True)

    if 'Error' in str(res[0][0]):
        return jsonify({'status': 'error', 'message': res[0][0]})
    recs = []
    for r in res:
        recs.append({"name": str(r[0]),  "ingredients": str(r[1]), "price": str(r[2])})
    return jsonify({'status': 'ok', 'entries': recs, 'count': len(recs)})



@app.route('/brewthis/', methods=['POST'])
def brewthis():

    params = request.get_json()
    name = params["name"]
    coffee = params["coffee"]
    quantity = params["quantity"]

    res = spcall("brewthis", (name, coffee, quantity), True)

    if 'Error' in res[0][0]:
        return jsonify({'status': 'error', 'message': res[0][0]})
    return jsonify({'status': 'ok', 'message': res[0][0]})



@app.route('/displayorder/', methods=['GET'])
def displayorder():
    res = spcall('displayorder', (), True)

    if 'Error' in str(res[0][0]):
        return jsonify({'status': 'error', 'message': res[0][0]})
    recs = []
    for r in res:
        recs.append({"name": str(r[0]), "coffee": str(r[1]),  "quantity": str(r[2])})
    return jsonify({'status': 'ok', 'entries': recs, 'count': len(recs)})



@app.route('/deleteorder', methods=['POST'])
def deleteorder():

    res = spcall("deleteorder", ('1'), True)

    return jsonify({'status': 'ok', 'message': res[0][0]})



@app.route('/editorder', methods=['POST'])
def editorder():

    params = request.get_json()
    name = params["name"]
    coffee = params["coffee"]
    quantity = params["quantity"]

    res = spcall("editorder",(name, coffee, quantity), True)

    if 'Error' in res[0][0]:
        return jsonify({'status': 'error', 'message': res[0][0]})
    return jsonify({'status': 'ok', 'message': res[0][0]})



@app.after_request
def add_cors(resp):
    resp.headers['Access-Control-Allow-Origin'] = flask.request.headers.get('Origin', '*')
    resp.headers['Access-Control-Allow-Credentials'] = True
    resp.headers['Access-Control-Allow-Methods'] = 'POST, OPTIONS, GET, PUT, DELETE'
    resp.headers['Access-Control-Allow-Headers'] = flask.request.headers.get('Access-Control-Request-Headers','Authorization')
    # set low for debugging

    if app.debug:
        resp.headers["Access-Control-Max-Age"] = '1'
    return resp


if __name__ == '__main__':
    app.run(threaded=True,debug=True)
