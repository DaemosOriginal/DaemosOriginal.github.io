const dir = "/src/images"
var numberOfImages = 9
numberOfImages += 1;
window.onload = function() {
  var pos = document.getElementById("test")
  for (var i = 1; i < numberOfImages; i++) {
    var div = document.createElement('div')
    div.classList.add('image');
    div.style.backgroundImage = "url(src/images/"+i+".jpg)";
    div.id = i;

    var input = document.createElement('input')
    input.id = "input" + i;
    input.type = "button";
    //input.hidden = true;

    var label = document.createElement('label')
    label.htmlFor = "input" + i;
    label.id = "label" + i;

    var script = document.createElement('script')
    script.innerHTML = "console.log(\"Test\")";
    document.body.appendChild(script)

    pos.appendChild(input);
    pos.appendChild(label);
    label = document.getElementById("label" + i)
    label.appendChild(div);
  }

}
