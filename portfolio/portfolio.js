var pathList = []
var http = new XMLHttpRequest();
http.open("GET", "https://api.github.com/repos/daemosoriginal/daemosoriginal.github.io/contents/portfolio/src/images", false);
http.send();
var string = JSON.parse(http.responseText);

var pathList = []
for (file of string)[pathList.push(file.download_url)]

var pos = document.getElementById("0")

  for (var i = 1; i < pathList.length; i++) {
    var div = document.createElement('div');
    div.classList.add('image');
    div.style.backgroundImage = `url(${pathList[i]})`;
    div.id = i;

    var input = document.createElement('input')
    input.id = "input" + i;
    input.type = "button";
    input.name = "input";
    input.hidden = true;

    var label = document.createElement('label')
    label.htmlFor = "input" + i;
    label.id = "label" + i;

    pos.appendChild(input);
    pos.appendChild(label);
    label = document.getElementById("label" + i);
    label.appendChild(div);

    document.getElementById("input" + i).addEventListener("click",myButton);
  }

/*function gteFilePa() {
    var pathList = []
    var http = new XMLHttpRequest();
    http.open("GET", "https://api.github.com/repos/daemosoriginal/daemosoriginal.github.io/contents/portfolio/src/images", false);
    http.send();
    var string = http.responseText;

    var pathListRaw = new Array;

    var fileList = string.split('\n');
    for (i = 0; i < fileList.length; i++) {
        var fileinfo = fileList[i].split(' ');
        for (ii = 0; ii < fileList.length; ii++) {
            if (fileinfo[ii] != "") {
                if (fileinfo[ii] == "\"download_url\":" && fileinfo[ii + 1] != "null,") {
                    pathListRaw.push(fileinfo[ii + 1]);
                }
            }
        }
    }

    var pathData;
    var pathList = [];
    for (i = 0; i < pathListRaw.length; i++) {
        var dataRaw = pathListRaw[i].split("");
        var dataLength = pathListRaw[i].split("").length;
        dataLength -= 2;
        pathData = "";
        for (ii = 0; ii < dataLength; ii++) {
            if (ii > 0) {
                pathData += dataRaw[ii];
            }
        }
        pathList.push(pathData);
    }
    return pathList;
}*/

  function myButton(){
    var id = this.id;
    var list = id.split('');
    var length  = list.length;
    var len = length -= 5;
    id = ""
    for(var i = 0; i < len; i++){
      var inew = i+5
      id = id + list[inew];
    }
    var image = document.createElement('img');
    image.src = "src/images/"+id+".jpg";
    image.classList.add('bigImage');
    image.id = "image";

    var bigLayer = document.createElement('div');
    bigLayer.classList.add('bigLayer','center');
    bigLayer.id = "block";

    var pos = document.getElementById("layer2")
    pos.appendChild(bigLayer);
    var pos = document.getElementById("block")
    pos.appendChild(image);

    document.getElementById("block").addEventListener("click",myClose);
  }

  function myClose(){
    var image = document.getElementById("image");
    image.remove();
    var bigLayer = document.getElementById("block");
    bigLayer.remove();
  }