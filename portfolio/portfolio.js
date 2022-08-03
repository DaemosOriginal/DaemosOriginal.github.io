const dir = "/src/images"
var numberOfImages = 9
numberOfImages += 1;

window.onload = function() {
  var pos = document.getElementById("layer1")

  for (var i = 1; i < numberOfImages; i++) {
    var div = document.createElement('div');
    div.classList.add('image');
    div.style.backgroundImage = "url(src/images/"+i+".jpg)";
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

    document.getElementById("input" + i).addEventListener("click",myFunction);
  }

  function myFunction(){
    var id = this.id;
    var list = id.split('');
    var length  = list.length;
    var len = length -= 5;
    id = ""
    for(var i = 0; i < len; i++){
      var inew = i+5
      id = id + list[inew];
    }
    console.log(id);
  }
}
