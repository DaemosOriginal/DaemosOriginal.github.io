Object.values(document.querySelectorAll('[data-translate]')).forEach(node => {
    const text = node.textContent
    
    const autoText = 'This text has been automatically translated. Therefore, there may be translation errors.'

    let value = new String()
    value += node.dataset.translate
    value = value.split('|')
    const origLang = value[0]
    let newLang
    if(value[1] == 'auto'){
        newLang = navigator.language || navigator.userLanguage
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


function isOnMobile() {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)) {
        return true
    }
    else{
        return false
    }
}
