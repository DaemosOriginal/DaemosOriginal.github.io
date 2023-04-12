// to more quickly generate sides for randumm shitt.

let p =  Object.values(document.querySelectorAll("page"))
let OBJ_title = Object.values(document.querySelectorAll("title"))[0]

p.forEach((page) => {
    if (page.getAttribute("main") == null){
        page.style.display = "none"
    }
    else{
        OBJ_title.innerHTML = "UKPH/" + page.dataset.title
    }

    let head = document.createElement("header")
    let main = document.createElement("main")

    

    let content = page.innerHTML
    main.innerHTML = content
    page.innerHTML = ""

    let h = document.createElement('h1')
    h.textContent = page.dataset.title
    head.appendChild(h)


    page.append(head)
    page.append(main)
})

let buttons =  Object.values(document.querySelectorAll("[data-page]"))

buttons.forEach(
    button =>{
        button.addEventListener("click",
            () =>{
                p.forEach(
                    page => {
                        if (page.dataset.title != button.dataset.page){
                            page.style.display = "none"
                        }
                        else{
                            page.style.display = ""
                            OBJ_title.innerHTML = "UKPH/" + page.dataset.title
                            console.log("UKPH/" + page.dataset.title)
                        }
                    }
                )
            }
        )

        // add a to change window adress anme

        let a = document.createElement("a")
        a.href = `#${button.dataset.page}`
        a.innerHTML = button.innerHTML
        button.innerHTML = ""
        button.append(a)
    }
)

window.onload = () => {

    // gat domain name to find starter page

    let pageName = window.location.href.split(/[#]/)
    let url = pageName.splice(0,1)
    let domainTmp = pageName
    pageName = ""
    for (i in domainTmp){
        if ((i+1) < domainTmp.length){pageName += domainTmp[i]+"#"}
        else{pageName += domainTmp[i]}
    }

    // go to page

    if((pageName != "")){
        p.forEach(
            (page) =>{
                if (page.dataset.title != pageName){
                    page.style.display = "none"
                }
                else{
                    page.style.display = ""
                    OBJ_title.innerHTML = "UKPH/" + page.dataset.title
                    console.log("UKPH/" + page.dataset.title)
                }
            }
        )
    }
}