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
        password="babe"
    )
    return conn
app = Flask(__name__)
app.config['SECRET_KEY']="LOGIN"
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

        # elif not check_password_hash(userpass,password):

        #     return {"status":0,"message":"Password is not matching"}
        else:
            # # login_user(user)
            # # id = str(id)
            # uid = str(user.id)
            # additionals_claims = {
            #     "name": user.name,
            #     "phoneNumber" :user.phoneNumber,
            #     "email":user.email
                   
            # }
            
            response =  {"status":1,"user":user[1]}
            return jsonify(response)
        return

if __name__=='__main__':
    app.run(host='0.0.0.0',debug=True)