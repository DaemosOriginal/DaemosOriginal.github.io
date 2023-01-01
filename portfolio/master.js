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
    //UserAgentCheck();
    createNaveBarAndNavBarLogic();
    OnlyDisplayMainPageViaTheNewAtrubuteSystem();
    DoingTheApiRequestForTheTranslateNode();
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
        alert(`the web page is currently best supported by firefox. please switch to firefox for the best user experience and a fully functioning website. (we are working on fixing the issues)`)
        //window.location.href = 'https://www.mozilla.org/en-US/firefox/new/';
    }
}

function createNaveBarAndNavBarLogic(){
    const objects = document.getElementsByClassName('nav');
    for(const object of objects){
        const classList = object.classList
        let hasButton = false
        classList.forEach(
            e=>{
                if (e == 'button'){
                    hasButton = true
                }
            }
        )
        if (hasButton){
            const inner = object.innerHTML
            object.innerHTML = ''
            const button = document.createElement('div')
            button.innerHTML = inner
            button.classList.add('nav','innerButton')
            object.append(button)
            object.addEventListener('click',IfSomeoneClicksOnAButtonIntheNavBarTheThingsInThisFunctionWillBeExecutetItWillOpenThePageAndCloseAllOthers)
        }
    }
}

function IfSomeoneClicksOnAButtonIntheNavBarTheThingsInThisFunctionWillBeExecutetItWillOpenThePageAndCloseAllOthers(){
    const pageName = this.getAttribute('name')
    const pageArray = document.getElementsByTagName('PAGE')
    for(const e of pageArray){
        if (e.id == pageName){
            e.style.display = ''
        }
        else{
            e.style.display = 'none'
        }
    }
}

function OnlyDisplayMainPageViaTheNewAtrubuteSystem(){
    const pageArray = document.getElementsByTagName('PAGE');
    for(const e of pageArray){
        let data = e.getAttribute('--data')
        data = data.split(' ')
        data.forEach(value =>{
            if(value == 'Defaultpage'){
                const Defaultpage = e.getAttribute('Defaultpage')
                if(Defaultpage){
                    e.style.display = ''
                }
                else{
                    e.style.display = 'none'
                }
            }
            else{
                e.style.display = 'none'
            }
        })
    }
}

function DoingTheApiRequestForTheTranslateNode(){
    let lang 
    const nodes =document.getElementsByTagName('TRANSLATE')
    for(const node of nodes){
        const lngArray = node.lang.split(' ')
        if (lngArray[1] == 'auto'){
            lang = navigator.language || navigator.userLanguage
        }
        else{
            lang = lngArray[1]
        }
        const text = node.innerHTML

        if (lngArray[0] != lang){
            const result = trnsalteAPI(text,lngArray[0], lang)
            result.then(value => {
                node.innerHTML = value
            })
        }
    }
}

async function trnsalteAPI(text, origLang, newLang){
    const res = await fetch(`https://api.mymemory.translated.net/get?q=${text}!&langpair=${origLang}|${newLang}`)
    const json = await res.json()
    const newText = await json.responseData.translatedText
    return await newText 
}