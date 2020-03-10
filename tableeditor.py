#-Import of required modules----------------------------------
import psutil
import json
import time
import os

from flask import Flask, render_template, send_from_directory,request
app = Flask(__name__, static_url_path='/static')
app.debug = True

#-App Routing-------------------------------------------------
@app.route('/')
def html_helloworld():
    return render_template('helloworld.html')

@app.route('/table')
def html_table():
    jsonObj = open('conf/contacts.json')    # ein File für conf/contacts.json wird geöffnet und in jsonObj gespeichert
    jsonStr = jsonObj.read()                # jsonObj wird eingelesen und in jsonStr gespeichert
    tableDef = json.loads(jsonStr)          # der jsonStr wird in in das JSON Format umgewandelt und in tableDef gespeichert
    
    jsonObj = open('data/contacts.json')    # das gleiche passiert für für data/contacts.json
    jsonStr = jsonObj.read()
    tableData = json.loads(jsonStr)

    return render_template(                 # unter der route /table wird table.html gerendert mit den von oben übergebenen tableDef und tableData
        'table.html',
        tableDef=tableDef,
        tableData=tableData
    )


#-Application runner--------------------------------------------
if __name__ == '__main__':
    app.run(host="0.0.0.0")
