function loadJson(filePath){
    const json = loadTextFileAjaxSync(filePath,"application/json");
    return JSON.parse(json);
}

function loadTextFileAjaxSync(filePath,mimeType){
    const xmlhttp =new XMLHttpRequest();
    xmlhttp.open("GET",filePath,false);
    if(mimeType != null){
        if(xmlhttp.overrideMimeType){
            xmlhttp.overrideMimeType(mimeType)
        }
    }
    xmlhttp.send();
    if(xmlhttp.status == 200){
        return xmlhttp.responseText;
    }else{
        return null;
    }
}


export class AppConstants {
    public static readonly Api =loadJson("/assets/config.json").api
}
