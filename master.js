Object.values(document.querySelectorAll('[data-translate]')).forEach(node => {
    const text = node.textContent
    
    const autoText = 'This text has been automatically translated. Therefore, there may be translation errors.'

    let value = new String()
    value += node.dataset.translate
    value = value.split('|')
    const origLang = value[0]
    let newLang
    if(value[1] == 'auto'){
        newLang = new Intl.DateTimeFormat().resolvedOptions().locale
        if (newLang.length < 4){
            newLang = `${newLang}-${new Intl.Locale(newLang).region}`
            
        }
    }
    else{
        newLang = value[1]
    }

    if(origLang != newLang){
        trnsalteAPI(text,origLang,newLang).then(value => { 
            node.textContent = `${value}`;
            const translationNote = document.createElement('span')
            translationNote.textContent = `${autoText}`
            translationNote.dataset.transText = true
            node.appendChild(document.createElement('br'))
            node.appendChild(translationNote)
        })
    }
})

async function trnsalteAPI(text, origLang, newLang){
    const res = await fetch(`https://api.mymemory.translated.net/get?q=${text}!&langpair=${origLang}|${newLang}`)
    const json = await res.json()
    const newText = await json.responseData.translatedText
    return await newText 
}
console.log(isOnMobile());
footer();

function isOnMobile() {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)) {
        return true
    }
    else{
        return false
    }
}

function footer(){
    const footer = document.getElementsByTagName('FOOTER')[0];
    const year = new Date().getFullYear();
    let lang = new Intl.DateTimeFormat().resolvedOptions().locale

    footer.innerHTML += `<a href="https://github.com/DaemosOriginal" target="_blank" class="copyright">Copyright © ${year} DaemosOriginal</a>`
}

Object.values(document.querySelectorAll("#backButton")).forEach(node => {
    node.addEventListener("click", () => {
        Object.values(document.querySelectorAll("#menuText")).forEach(
          (menu) => {
            if (menu.classList == "move") {
              menu.style.transition = `${1}s`;
              menu.classList.remove("move");
            } else {
              menu.style.display = "";
            }
          }
        );
        Object.values(document.querySelectorAll("[data-page]")).forEach(page =>{
            page.style.display = 'none';
            document.body.style.display = '';
        })
        //document.getElementById("about").style.display = "none";
      });
})
