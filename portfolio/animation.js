const background = document.getElementById('background');
const scale = 250;

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