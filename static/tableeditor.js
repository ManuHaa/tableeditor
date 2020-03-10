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


