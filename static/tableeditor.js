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

function actionmenu_call(targetElm,rowId){
    var actAry = ["edit","delete","copy"];
    var targetUrl = "/row/"
    clear_elements_by_class("menuBox",buildBtns);
    
    function  buildBtns(){ 
        var menuBox = document.createElement("div");
        menuBox.classList.add("menuBox");
        targetElm.appendChild(menuBox);

        for(var prop in actAry){
            var menuBtn = document.createElement("div");
            menuBtn.innerHTML = actAry[prop];
            menuBtn.onclick = function(){
                clear_elements_by_class("menuBox");
                location.href=targetUrl+this.innerHTML+"/"+rowId;
            };
            menuBox.appendChild(menuBtn);
        }
    }


}

function clear_elements_by_class(clName,callBack=false){
    var elmAry = document.getElementsByClassName(clName);

    for (var i = 0; i < elmAry.length; i++) {
        elmAry[i].parentNode.removeChild(elmAry[i]);
    }
    if(callBack!=false){
        callBack();
    }
}


