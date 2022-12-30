window.onscroll = (() =>{
    scrollbar(500);
});

function scrollbar(time) {
    const html = document.getElementsByTagName('html')[0];
    let timer;
    html.classList.add('scroll');
    html.classList.remove('noScroll');
    clearTimeout(timer);
    new Promise(
        resolve => {
            timer = setTimeout(() => {
                html.classList.remove('scroll');
                resolve
            }, time);
        }
    )
}

window.onload = (() => {
    background();
    footer();
    UserAgentCheck();
})


// logic for the background animation
function background() {
    const scale = 250;

    // check's the image size to figure out if its a phone or a pc to decide whether to animate the background
    if (window.innerHeight < window.innerWidth) {
        window.addEventListener("mousemove", (e) => {
            let pos;
            if (window.innerWidth < window.innerHeight) {
                pos = [e.clientX / window.innerHeight * scale, e.clientY / window.innerHeight * scale];
            }

            else {
                pos = [e.clientX / window.innerWidth * scale, e.clientY / window.innerWidth * scale];
            }

            document.body.style.backgroundPosition = `${-pos[0]}px ${-pos[1]}px`;
        });
    }
}

function footer(){
    const footer = document.getElementsByTagName('FOOTER')[0];
    footer.innerHTML += ` <a href="https://github.com/DaemosOriginal" target="_blank" class="copyright">Copyright © 2022 DaemosOriginal</a>`
}

function UserAgentCheck(){
    const agend = navigator.userAgent
    if (agend.indexOf("Firefox") > -1 == false){
        alert(`Your browser probably does not support this page. Please switch to Firefox. (https://www.mozilla.org/en-US/firefox/new/) We are working on supporting other browsers as well.  `)
        window.location.href = 'https://www.mozilla.org/en-US/firefox/new/';
    }
}