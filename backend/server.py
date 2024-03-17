from flask import Flask,request,jsonify
import psycopg2
app = Flask(__name__)
app.config['SECRET_KEY']="LOGIN"

conn = psycopg2.connect(
        host = "localhost",
    port = 5432,
    database = "medical-mitra",
    user = "postgres",
    password = "babe"
)

@app.route('/register',methods=['GET','POST'])
def register():
    if request.method =='POST':
        cursor = conn.cursor()
        name = request.args.get('name')
        password = request.args.get('password')
        email = request.args.get('email')
        phonenumber = request.args.get('phonenumber')
        sql = '''INSERT INTO users(name,email,phonenumber,password)
                VALUES (%s,%s,%s,%s)'''
        cursor.execute(sql,(name,email,phonenumber,password))
        conn.commit()
        cursor.close()
        return {'status':'Successful'}

@app.route('/')
def home():
    return {'status':1}

if __name__=='__main__':
    app.run(host='0.0.0.0',debug=True)