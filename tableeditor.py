#-Import of required modules----------------------------------
import psutil
import json
import time
import os

from flask import Flask, render_template, send_from_directory,request,redirect
app = Flask(__name__, static_url_path='/static')
app.debug = True



#-Global variables and definitions-----------------------------
tableName = 'contacts'
jsonObj = open('conf/'+tableName+'.json')    # ein File für conf/contacts.json wird geöffnet und in jsonObj gespeichert
jsonStr = jsonObj.read()                # jsonObj wird eingelesen und in jsonStr gespeichert
tableDef = json.loads(jsonStr)          # der jsonStr wird in in das JSON Format umgewandelt und in tableDef gespeichert
    
jsonObj = open('data/'+tableName+'.json')    # das gleiche passiert für für data/contacts.json
jsonStr = jsonObj.read()
tableData = json.loads(jsonStr)

#-App Routing-------------------------------------------------
@app.route('/')
def html_helloworld():
    return render_template('helloworld.html')

@app.route('/table' )
def html_table():
    
    return render_template(                 # unter der route /table wird table.html gerendert mit den von oben übergebenen tableDef und tableData
        'table.html',
        tableDef=tableDef,
        tableData=tableData
    )

@app.route('/row/edit/<rowId>')
def html_edit(rowId):
    rowId = int(rowId)
    #print(tableData[rowId])
    try: 
        rowData = tableData[rowId]
    except: 
        return 'row not found', 404
    return render_template(                 # unter der route /table wird table.html gerendert mit den von oben übergebenen tableDef und tableData
        'edit.html',
        tableDef=tableDef,
        rowData=rowData,
        rowId = rowId
    )
@app.route('/api/row/edit/<rowId>', methods=["POST"])  
def api_edit(rowId):
    rowId = int(rowId)
    dataIn = request.form
    newTableData = tableData
    newTableData[rowId] = dataIn 
    jsonOut = json.dumps(newTableData)
    jsonFile = open('data/'+tableName+'.json','w')    # das gleiche passiert für für data/contacts.json
    jsonFile.write(jsonOut)

    return redirect('/table',code=302)

@app.route('/row/delete/<rowId>')
def html_delete(rowId):


    return render_template(                 # unter der route /table wird table.html gerendert mit den von oben übergebenen tableDef und tableData
        'delete.html',
        tableDef=tableDef,
        tableData=tableData
    )

@app.route('/row/copy/<rowId>')
def html_copy(rowId):
    print(rowId)
    
    return render_template(                 # unter der route /table wird table.html gerendert mit den von oben übergebenen tableDef und tableData
        'copy.html',
        tableDef=tableDef,
        tableData=tableData
    )

#@app.route('/dropdowntester')
#def html_dropdowntester():
#    jsonObj = open('conf/contacts.json')    # ein File für conf/contacts.json wird geöffnet und in jsonObj gespeichert
#    jsonStr = jsonObj.read()                # jsonObj wird eingelesen und in jsonStr gespeichert
#    tableDef = json.loads(jsonStr)          # der jsonStr wird in in das JSON Format umgewandelt und in tableDef gespeichert
    
#    jsonObj = open('data/contacts.json')    # das gleiche passiert für für data/contacts.json
#    jsonStr = jsonObj.read()
#    tableData = json.loads(jsonStr)

#    return render_template(
#        'dropdowntester.html',
#        tableDef=tableDef,
#        tableData=tableData
#        )
        

#@app.route('/row/add/<rowId>')
#def html_add(rowId):
#    print(rowId)
#    jsonObj = open('conf/contacts.json')    # ein File für conf/contacts.json wird geöffnet und in jsonObj gespeichert
 #   jsonStr = jsonObj.read()                # jsonObj wird eingelesen und in jsonStr gespeichert
#    tableDef = json.loads(jsonStr)          # der jsonStr wird in in das JSON Format umgewandelt und in tableDef gespeichert
#    
#    jsonObj = open('data/contacts.json')    # das gleiche passiert für für data/contacts.json
#    jsonStr = jsonObj.read()
#    tableData = json.loads(jsonStr)
#
#    return render_template(                 # unter der route /table wird table.html gerendert mit den von oben übergebenen tableDef und tableData
#        'add.html',
#        tableDef=tableDef,
#        tableData=tableData
#    )

#-Application runner--------------------------------------------
if __name__ == '__main__':
    app.run(host="0.0.0.0")
