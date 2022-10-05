function sleep(miliseconds) {
     var currentTime = new Date().getTime();
  
     while (currentTime + miliseconds >= new Date().getTime()) {
     }
  }


const background = document.getElementById('background');
const scale = 250;
if(window.innerHeight < window.innerWidth){
     window.addEventListener("mousemove", (e) => {
     let pos;
     if (window.innerWidth < window.innerHeight)
     {
          pos = [e.clientX/window.innerHeight*scale,e.clientY/window.innerHeight*scale];
     }
     else
     {
          pos = [e.clientX/window.innerWidth*scale,e.clientY/window.innerWidth*scale];
     }

     background.style.backgroundPosition = `${-pos[0]}px ${-pos[1]}px`;
     });
}
function tab (tabId, c,id)
{
     document.getElementById(tabId)?.addEventListener('click',(e) =>{
          document.getElementById(id).classList = c;
     })
}

document.getElementById('about').classList = 'removed';

tab('tabA', 'removed','art');
tab('tabB', '','art');
tab('tabA', '','about');
tab('tabB', 'removed','about');
