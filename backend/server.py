from flask import Flask,request,jsonify

app = Flask(__name__)
app.config['SECRET_KEY']="LOGIN"

@app.route('/register',methods=['GET','POST'])
def register():
    if request.method =='POST':
        name = request.args.get('name')
        password = request.args.get('password')
        email = request.args.get('email')
        phone = register.args.get('phone')

        return {'status':'Successful','name':name,
        'password':password,'emai':email,'phone':phone}

if __name__=='__main__':
    app.run(host='0.0.0.0',debug=True)