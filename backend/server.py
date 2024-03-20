from flask import Flask,redirect,request,jsonify
from flask_wtf import FlaskForm
import psycopg2
from flask_cors import CORS
import os
import psycopg2
from dotenv import load_dotenv


load_dotenv()
database_password = os.getenv('DATABASE_PASSWORD')
secret_key = os.getenv("SECRET_KEY")
def get_db_connection():
    conn = psycopg2.connect(
        host='localhost',
        port=5432,
        database="medical-mitra",
        user="postgres",
        password=database_password
    )
    return conn
app = Flask(__name__)
app.config['SECRET_KEY']=secret_key
CORS(app)

@app.route('/')
def hello():
    return {'status':1}
   
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
        sql = '''INSERT INTO users
                (name,email,phonenumber,password)
                VALUES (%s,%s,%s,%s);'''
        cursor.execute(sql,(name,email,phonenumber,password))
        conn.commit()
        return {"status":1,'conn':'Good Connection'}
    else:
        return {'status':'Bad Connection'}

@app.route('/Login',methods=['GET','POST'])
def login():
    conn =get_db_connection()
    if request.method=='POST':
        
        cursor = conn.cursor()
        data = request.get_json()
        login_cred = data.get('login_cred')
        password = data.get('password')
        query = f"SELECT * FROM users WHERE email='{login_cred}' OR name='{login_cred}' OR phonenumber='{login_cred}';"
        cursor.execute(query)

        user = cursor.fetchone()

        if not user:

            return {"status":0,"message":"User not found,Please register"}
        
        elif password!=user[4]:

            return {"status":0,"message":"Password is not matching","password":password,"database_pass":user[2]}

        else:
            response =  {"status":1,"user":user[1]}
            return jsonify(response)
        return

if __name__=='__main__':
    app.run(host='0.0.0.0',debug=True)