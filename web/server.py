from flask import Flask,render_template, request, session, Response, redirect
from database import connector
from model import entities
import json
import time

db = connector.Manager()
engine = db.createEngine()

app = Flask(__name__)


@app.route('/static/<content>')
def static_content(content):
    return render_template(content)

@app.route('/login', methods=['POST'])
def login():
    print(request.form.get('username'))
    username = request.form.get('username')
    password = request.form.get('password')
    #key = 'username'
    #if key in session:
        #return str(request.form.get('username')) + " you already logged"
    db_session = db.getSession(engine)
    respuesta = db_session.query(entities.User).filter(
        entities.User.username == username
    ).filter(entities.User.password == password)

    users = respuesta[:]
    if len(users)>0:
        #session[key] = username
        #print(session[key])
        return "Login successful"
    return "Login fail"

@app.route('/', methods = ['GET'])
def get_index():
    return redirect('static/html/index.html')


#create
@app.route('/users', methods = ['POST'])
def create_users():
    print(request.data)
    body = json.loads(request.data.decode('utf-8'))
    user = entities.User(
        username = body['username'],
        name = body['name'],
        fullname = body['fullname'],
        password = body['password']
    )
    db_session = db.getSession(engine)
    db_session.add(user)
    db_session.commit()
    message = {'msg': 'User created'}
    json_message = json.dumps(message, cls = connector.AlchemyEncoder)
    return Response(json_message, status=201, mimetype='application/json')

#read
@app.route('/users', methods = ['GET'])
def read_users():
    db_session = db.getSession(engine)
    response = db_session.query(entities.User)
    users = response[:]
    json_message = json.dumps(users, cls = connector.AlchemyEncoder)
    return Response(json_message, status=201, mimetype='application/json')


if __name__ == '__main__':
    app.secret_key = ".."
    app.run(port=8080, threaded=True, host=('127.0.0.1'))
