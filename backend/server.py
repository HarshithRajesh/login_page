from flask import Flask,redirect,request,jsonify
from flask_wtf import FlaskForm
import psycopg2
from flask_cors import CORS
import os
import psycopg2
from dotenv import load_dotenv
import json

load_dotenv()
database_password = os.getenv('DATABASE_PASSWORD')
secret_key = os.getenv("SECRET_KEY")
def get_db_connection():
    conn = psycopg2.connect(
        host='aws-0-ap-south-1.pooler.supabase.com',
        port=5432,
        database="postgres",
        user="postgres.uodmrwwhsbtuhqixczez",
        password=database_password
    )
    return conn
# def get_db_connection():
#     conn = psycopg2.connect(
#         host='localhost',
#         port=5432,
#         database="postgres",
#         user="postgres",
#         password="babe"
#     )
#     return conn

app = Flask(__name__)
app.config['SECRET_KEY']=secret_key
CORS(app)

@app.route('/')
def hello():
    return {'status':1}
   
@app.route('/Register/',methods=['GET','POST'])
def register():
    conn = get_db_connection()
    if request.method =='POST':
        cursor = conn.cursor()
        data = request.get_json()
        name = data.get('name')
        email = data.get('email')
        phonenumber = data.get('phoneNumber')
        password = data.get('password')
        query = f"SELECT * FROM users WHERE email='{email}' OR phonenumber='{phonenumber}';"
        cursor.execute(query)

        user = cursor.fetchone()
        if user:
            return{"status":0,"message":"User already exists"}
        else:
            sql = '''INSERT INTO users
                    (name,email,phonenumber,password)
                    VALUES (%s,%s,%s,%s);'''
            cursor.execute(sql,(name,email,phonenumber,password))
            conn.commit()
            return {"status":1,'message':'User Registerd'}
    


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

            return {"status":0,"message":"Wrong password"}

        else:
            response =  {"status":1,"user":user[1]}
            return jsonify(response)
        return
@app.route("/Admin",methods=['GET','POST'])
def admin():
    conn =get_db_connection()
    if request.method=='GET':
        cursor = conn.cursor()
        query = f"SELECT id,name,email,phonenumber FROM users ;"
        cursor.execute(query)
        users = cursor.fetchall()
        query_count = f"SELECT COUNT(*) FROM users"
        cursor.execute(query_count)
        count = cursor.fetchall()
        columns = ['id', 'name', 'email', 'phonenumber']
        users_json = [dict(zip(columns, user)) for user in users]
        # return json.dumps(users_json)
        return {"count":count,"users":users_json}

@app.route("/Webinar/Admin",methods=['GET','POST'])
def webniar():
    conn =get_db_connection()
    if request.method=='POST':
        cursor = conn.cursor()
        data = request.get_json()
        title = data.get('Title')
        description = data.get('description')
        link = data.get('LinkURL')
        date = data.get('date')
        time = data.get('time')
        id = data.get('userType')
        if id=="Premium Users":
            id = 2
        if id=="Lite Users":
            id = 1
        sql = '''UPDATE webinars 
            SET title = %s, description = %s, link = %s, date = %s, time = %s 
            WHERE ID = %s;'''
        cursor.execute(sql,(title,description,link,date,time,id))
        conn.commit()
        return {"status":1,'message':'Webinar link update'}
if __name__=='__main__':
    app.run(host='0.0.0.0',debug=True)