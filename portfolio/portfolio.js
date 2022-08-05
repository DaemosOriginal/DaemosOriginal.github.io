const dir = "/src/images"
var numberOfImages = 13
numberOfImages += 1;
let screenWidth = screen.width;
let screenHeight = screen.height;

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
    var image = document.createElement('img');
    image.src = "src/images/"+id+".jpg";
    image.classList.add('bigImage');
    image.id = "image";

    var bigLayer = document.createElement('div');
    bigLayer.classList.add('bigLayer');
    bigLayer.id = "block";

    var pos = document.getElementById("layer2")
    document.body.appendChild(bigLayer);
    pos.appendChild(image);

    document.getElementById("block").addEventListener("click",myClose);
  }

  function myClose(){
    var image = document.getElementById("image");
    image.remove();
    var bigLayer = document.getElementById("block");
    bigLayer.remove();
  }
}
