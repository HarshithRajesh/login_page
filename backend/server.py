from flask import Flask,redirect,request,jsonify
from flask_wtf import FlaskForm
import psycopg2
from flask_cors import CORS
import os
import psycopg2

def get_db_connection():
    conn = psycopg2.connect(
        host='localhost',
        port=5432,
        database="medical-mitra",
        user="postgres",
        password="cks004"
    )
    return conn
app = Flask(__name__)
app.config['SECRET_KEY']="LOGIN"
CORS(app)

@app.route('/')
def hello():
    return {'status':1}
    """
#     from flask import Flask, redirect, request, jsonify
# from flask_wtf import FlaskForm
# import psycopg2
# from flask_cors import CORS
# import os

# app = Flask(__name__)
# app.config['SECRET_KEY'] = "LOGIN"
# CORS(app)

# def get_db_connection():
#     conn = psycopg2.connect(
#         host='localhost',
#         port=5432,
#         database="medical-mitra",
#         user="postgres",
#         password="cks004"
#     )
#     return conn

# @app.route('/')
# def hello():
#     return 'Hello, World!'

# @app.route('/Form/', methods=['POST'])
# def register():
#     conn = get_db_connection()
#     try:
#         cursor = conn.cursor()
#         email = request.args.get('email')
#         name = request.args.get('name')
#         password = request.args.get('password')
#         phonenumber = request.args.get('phonenumber')
#         sql = '''INSERT INTO users (name, email, phonenumber, password) VALUES (%s, %s, %s, %s);'''
#         cursor.execute(sql, (name, email, phonenumber, password))
#         conn.commit()
#         return jsonify({'status': 1, 'message': 'Registration successful'})
#     except Exception as e:
#         return jsonify({'status': 0, 'message': str(e)}), 500
#     finally:
#         cursor.close()
#         conn.close()

# if __name__ == '__main__':
#     app.run(host='0.0.0.0', debug=True)
#     """

@app.route('/Form/',methods=['GET','POST'])
def register():
    conn = get_db_connection()
    if request.method =='POST':
        cursor = conn.cursor()
        data = request.get_json()
        name = data.get('name')
        email = data.get('email')
        phonenumber = data.get('phoneNumber')
        password = data.get('password')
        # email = request.args.get('email')
        # name=request.args.get('name')
        # password=request.args.get('password')
        # phonenumber =request.args.get('phoneNumber')
        sql = '''INSERT INTO users
                (name,email,phonenumber,password)
                VALUES (%s,%s,%s,%s);'''
        cursor.execute(sql,(name,email,phonenumber,password))
        conn.commit()
        return {"status":1,'conn':'Good Connection'}
        # query = f"SELECT * FROM users WHERE email='{email}';"
        # cursor.execute(query)
    else:
        return {'status':'Bad Connection'}

if __name__=='__main__':
    app.run(host='0.0.0.0',debug=True)