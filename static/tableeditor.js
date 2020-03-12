// setTimeout(function(){document.body.onclick=function(){alert("hallo welt");}},100)

function editTable(){
    var tableContent = document.getElementById("tr");
    tableContent.contentEditable ="true";
    showSaveBtn();
}

function saveEdit(){
    var tableContent = document.getElementById("tr");
    tableContent.contentEditable="false";
    hideSaveBtn();
}

function hideSaveBtn(){
    document.getElementById("saveBtns").style.visibility = "hidden";
}

function showSaveBtn(){
    document.getElementById("saveBtns").style.visibility = "visible";
}


addEventListener("click",
function (event){
    //event.target.style.display = 'none';
    if(!event.target.classList.contains('actionBtn')){
        clear_elements_by_class("menuBox"); 
    }
    
}

)

// Aufruf des Drop-Down Menüs
function actionmenu_call(targetElm,rowId){      // Zielelement und ZeilenId werden als Parameter übergeben
    var actAry = ["edit","delete","copy","add"];      // alle möglichen Aktionen werden im actAry gespeichert
    var targetUrl = "/row/"                     // Ziel Url wird definiert
    clear_elements_by_class("menuBox",buildBtns);                   // Funktion zum einklappen des Menüs
    
    function  buildBtns(){                                          // Funktion zum Button bauen
        var menuBox = document.createElement("div");                // für die Menü Box sollen divs generiert werden
        menuBox.classList.add("menuBox");                           // menuBox wird der Klasse zugeordnet
        targetElm.appendChild(menuBox);                             // Zielelement wird zum Kind der menuBox

        for(var prop in actAry){                                    // für jeden prop aus dem Act Array
            var menuBtn = document.createElement("div");            // wird ein menuBtn als div generiert
            menuBtn.innerHTML = actAry[prop];                       // werden die HTML Eigenschaften übergeben
            menuBtn.onclick = function(){                           // wird eine Fuktion definiert, die
                clear_elements_by_class("menuBox");                 // die Funktion clear_elements_by_class aufruft, damit die Elemente wieder verschwinden
                location.href=targetUrl+this.innerHTML+"/"+rowId;   // eine location, für den jeweiligen ausgewählten prop generiert bsp. extra page für edit
            };
            menuBox.appendChild(menuBtn);                           // menuBox wird zum Kind von menuBtn
        }
    }
}

// Funktion zum einklappen des Menüs
function clear_elements_by_class(clName,callBack=false){        // Klassenname und callBack mit false Wert werden übergeben
    var elmAry = document.getElementsByClassName(clName);       // Element Array mit allen Elementen des gleichen Klassennamen

    for (var i = 0; i < elmAry.length; i++) {                   // für jedes Element aus elmAry
        elmAry[i].parentNode.removeChild(elmAry[i]);            // wird vom jeweiligen Parent das Child entfernt
    }
    if(callBack!=false){                                        // falls der callBack nicht false ist
        callBack();                                             // soll der callBack ausgeführt werden (erst dann wird dieser Code ausgeführt)
    }
}

// Kopier-FUnktion
function deleteRow(stdTable){
    try{
        var table = document.getElementById(stdTable);
        var rowRange = table.rows.length;

        for(var i=0;i<rowRange;i++){
            var row = table.rows[i];
            var checkBox = row.cells[0].childNodes[0];
            if( null != checkBox && true == checkBox.checked){
                if(rowRange <= 1){
                    alert("eine Reihe muss bestehen!");
                    break;
                }
                table.deleteRow(i);
                rowRange--;
                i--;
            }
        }
    } catch(e){
        alert(e);
    }
}

/*function copyContent(){
    var copyRow = document.getElementById("tr").;
    copyRow.select();
    document.execCommand("copy");
    alert(copyRow.value);
}*/

function deleteContent(){
    var table = document.getElementById("stdTable");
    var rowsNumber = table.rows.length;
    var deleteTarget = document.getElementById("tr");
    //deleteTarget.remove();
    //alert("row removed");

   
    if(rowsNumber>2){
        deleteTarget.remove();
        rowsNumber--;
        alert("row removed");
        
    } else{
        alert("at least one row has to exist");
        }
}



function addRow(){
    var tableRef = document.getElementById('tr');
    var newRow = tableRef.insertcell(0);
    var newCell = newRow.insertCell(0);
    var newContent = document.createTextNode('New row');
    newCell.appendChild(newContent);
}

function editRow(){
    var editTarget = document.getElementById("stdTable");
    if(onclick==true){
        editTarget.contentEditable='true';
    }
}

function cloneRow(){
    var table = document.getElementById('stdTable');
    var rowsNumber = table.rows.length;
    var addTarget = document.getElementById("tr");
    var newRow ;
    

    if(rowsNumber<=10){
   addTarget.appendChild(newRow);
    rowsNumber++;
    }
}


