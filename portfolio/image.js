class myRange{
    constructor(range){
        this.length = parseInt(range);
        this.array = new Array();
        for (let i = 0 ; i < this.length ; i++){
            this.array.push(i);
        }
        return this.array;
    }
}

async function fetchJson (url = '') {
    const response = await fetch(url);
    const data = await response.json();
    return Promise.resolve(data);
}

const json = fetchJson('https://raw.githubusercontent.com/DaemosOriginal/DaemosOriginal.github.io/main/portfolio/src/general.json');

const result = fetchJson('https://api.github.com/repos/daemosoriginal/daemosoriginal.github.io/contents/portfolio/src/images');
result
.then(
    value =>{
        let imageArray = new Array();
        value.forEach(
            Image => {
                let obj = {
                    name: Image.name,
                    url: Image.download_url
                };

                imageArray.push(obj);
            }
        );

        return Promise.resolve(imageArray);
    }
)

.then(
    value =>{
        const loader = loadImages(value);
        loader
        .then(
            value =>{
                const agend = navigator.userAgent
                let firefoxAgent = agend.indexOf("Firefox") > -1
                if (firefoxAgent){
                    galleryFirefox(value);
                }
                else{
                    galleryElse(value);
                }
            }
        )
    }
)

async function loadImages(value){
    const imageArray = [];
    const promiseArray = [];
    for (const img of value){
        promiseArray.push( new Promise( 
                resolve =>{
                    const image = new Image();
                    image.src = img.url
                    image.name = img.name
                    image.onload = resolve;
                    imageArray.push(image);
                }
            )
        ) 
    }
    await Promise.all(promiseArray);
    return imageArray
}

function galleryFirefox (objs) {
    let onPhone = false

    if (window.innerHeight > window.innerWidth){
        onPhone = true;
    }

    const height = 300;
    const margin = 20;

    const screenWidth = window.innerWidth;

    let imageArray = new Array();
    const gallery = document.getElementById('gallery');
    const galleryArray = new Array();

    for (obj of objs) {
        const img = obj;
        img.width = img.width/img.height*height;
        img.classList.add('image');	 
        imageArray.push(img);
    }

    for(let i = 0; true; i++) {
        const length = imageArray.length;
        let width = 0;
        const rowArray = new Array();

        for(let imgIndex = 0; imgIndex < length; imgIndex++){
            const img = imageArray[0];
            width += img.width;
            if ((width > screenWidth)&&(imgIndex > 0)){break}
            rowArray.push(img);
            imageArray.shift(0,1);
            if (onPhone){break}
        }
        if (rowArray.length >= 1){galleryArray.push(rowArray);}
        if (length == 0){break}
    }

    for(let i = 0; i < galleryArray.length; i++){
        if (onPhone){break}
        const obj = galleryArray[i];
        if ((obj.length <= 2) && (i>=1)){
            galleryArray[i-1].push(galleryArray[i][0]);
            galleryArray.splice(i,1);
        }
    }

    galleryArray.forEach(
        value =>{
            let width = 0;
            let anz = 0;
            value.forEach(
                value => { 
                    width += value.width;
                    anz += 1;
                }
            )
            width += anz * margin; 
            let scale = screenWidth / width;

            value.forEach( 
                value =>{
                    value.style.width = ` ${value.width*scale}%`;
                    value.style.marginInline = `${margin/2}px`;
                    value.classList.add('gallery');

                    addTitleEtc(value)
                    value.addEventListener('click', MyImageOnClick)
                })

        } 
    )

    for (let i = 0; i < galleryArray.length; i++){
        if (i != (galleryArray.length -1)){
            galleryArray[i].forEach(
                e =>{
                    e.style.marginBottom = '10px';

                    
                }
            )
        }
        for(let e = 0; e < galleryArray[i].length; e++){
            if (e == 0){
                galleryArray[i][e].style.marginLeft = 0;
            }
            else if (e == (galleryArray[i].length - 1)){
                galleryArray[i][e].style.marginRight = 0;
            }
        }
    }

    for(let i = 0; true; i++){
        const div = document.createElement('div');
        div.classList.add('gallery');

        galleryArray[0].forEach(
            (e)=>{
                div.appendChild(e);
            }
        )
        galleryArray.shift(0,1);
        gallery.appendChild(div);
        if (galleryArray.length == 0){break};
    }
}

function galleryElse (objs) {
    let onPhone = false

    if (window.innerHeight > window.innerWidth){
        //onPhone = true;
    }

    const height = 300;
    const margin = 20;

    const screenWidth = window.innerWidth;

    let imageArray = new Array();
    const gallery = document.getElementById('gallery');
    const galleryArray = new Array();

    for (obj of objs) {
        const img = obj;
        img.width = img.width/img.height*height;
        img.classList.add('image');	 
        imageArray.push(img);
    }

    for(let i = 0; true; i++) {
        const length = imageArray.length;
        let width = 0;
        const rowArray = new Array();

        for(let imgIndex = 0; imgIndex < length; imgIndex++){
            const img = imageArray[0];
            width += img.width;
            if ((width > screenWidth)&&(imgIndex > 0)){break}
            rowArray.push(img);
            imageArray.shift(0,1);
            if (onPhone){break}
        }
        if (rowArray.length >= 1){galleryArray.push(rowArray);}
        if (length == 0){break}
    }

    for(let i = 0; i < galleryArray.length; i++){
        if (onPhone){break}
        const obj = galleryArray[i];
        if ((obj.length <= 2) && (i>=1)){
            galleryArray[i-1].push(galleryArray[i][0]);
            galleryArray.splice(i,1);
        }
    }

    galleryArray.forEach(
        value =>{
            let width = 0;
            let anz = 0;
            value.forEach(
                value => { 
                    width += value.width;
                    anz += 1;
                }
            )
            width += anz * margin; 
            let scale = screenWidth / width;

            value.forEach( 
                value =>{
                    value.style.width = ` ${value.width*scale/100}%`;
                    value.style.marginInline = `${margin/2}px`;
                    value.classList.add('gallery');

                    addTitleEtc(value)
                    value.addEventListener('click', MyImageOnClick)
                })

        } 
    )

    for (let i = 0; i < galleryArray.length; i++){
        if (i != (galleryArray.length -1)){
            galleryArray[i].forEach(
                e =>{
                    e.style.marginBottom = '10px';

                    
                }
            )
        }
        for(let e = 0; e < galleryArray[i].length; e++){
            if (e == 0){
                galleryArray[i][e].style.marginLeft = 0;
            }
            else if (e == (galleryArray[i].length - 1)){
                galleryArray[i][e].style.marginRight = 0;
            }
        }
    }

    for(let i = 0; true; i++){
        const div = document.createElement('div');
        div.classList.add('gallery');

        galleryArray[0].forEach(
            (e)=>{
                div.appendChild(e);
            }
        )
        galleryArray.shift(0,1);
        gallery.appendChild(div);
        if (galleryArray.length == 0){break};
    }
}



const galleryObj = document.getElementById('gallery')
if(window.innerHeight > window.innerWidth){
    galleryObj.style.width = 'calc(100% - 40px)'
}


function addTitleEtc(e){
    json.then(value => {
        value.images.forEach(
            eJson => {
                if (eJson.name == e.name){
                    e.title = eJson.title
                    e.alt = `An image with the name \"${eJson.title}\" and the description \"${eJson.description}\" from the author${value.general[0].author}`
                }
            }
        )
    });
}

function MyImageOnClick(){
    document.getElementById('galleryOverlay').style.display = '';
    document.getElementsByTagName('html')[0].style.overflow = 'hidden';
    document.getElementById('imageSrc').srcset = this.src;
    const caption = document.getElementById('imgCaption');
    const cite = document.createElement('cite');
    cite.innerHTML = this.title;
    caption.append(cite);
    LogicInvolvingTheJsonFileForDataToAddTheNameOfTheAuthor(caption);
    const description = document.getElementById('description');
    json.then(value =>{
        value.images.forEach(eJson =>{
            if(this.name == eJson.name){
                description.innerHTML ="<b>Description:</b> <br>" + eJson.description + description.innerHTML;
            }
        })
    })

    const imageDetails = document.getElementById("imageDetails")
    imageDetails.innerHTML += "<u>name</u>: " + this.name;
    const loadedImage = loadImages2(this.src)
    loadedImage.then(value => {
        const imageDetails = document.getElementById("imageDetails")
        imageDetails.innerHTML += "<br> <u>width</u>: " + value.width + "px";
        imageDetails.innerHTML += "<br> <u>height</u>: " + value.height + "px";
    })
}

function LogicInvolvingTheJsonFileForDataToAddTheNameOfTheAuthor(e){
    json.then(value => {
        const author = value.general[0].author
        e.innerHTML += ' by ' + author;
    })
}

function MyFancyImageLayerGetsClosedOnClickOrOnMouseOver(){
    document.getElementById('galleryOverlay').style.display = 'none';
    document.getElementsByTagName('html')[0].style.overflow = '';
    document.getElementById('imgCaption').innerHTML = '';
    document.getElementById('imageDetails').innerHTML = `<summary class="details">Image Details</summary>`;
    document.getElementById('description').innerHTML = `<p></p>
    <details id="imageDetails" title="some data about the image">
        <summary class="details">Image Details</summary>
    </details>`;
}

async function loadImages2(url){
    let saveImage
        await new Promise( 
                resolve =>{
                    const image = new Image();
                    image.src = url
                    image.onload = resolve;
                    saveImage = image
                }
            )
    return saveImage
}

function MyFancyImageLayerGetsBigWhenIClickOnItSoThatUCanSeeTheImageBigger(){
    const image = new Image();
    image.src = this.srcset
    image.classList.add('bigerImage')
    image.id = 'destroyableID'

    const div = document.createElement('div')
    div.classList.add('bigerImage')
    div.id = 'destroyableID'
    AddClickEventToDomObjectsWithTheIdDestroyableIdToDestroyThemAgain(div)

    div.append(image)
    document.getElementById('image').append(div)
}

function AddClickEventToDomObjectsWithTheIdDestroyableIdToDestroyThemAgain(e){
    e.addEventListener('click',() => {
        document.getElementById('destroyableID').remove();
    })
}

document.getElementById('closeText').addEventListener('click',MyFancyImageLayerGetsClosedOnClickOrOnMouseOver)

//document.getElementById('galleryOverlay').addEventListener('click', MyFancyImageLayerGetsClosedOnClickOrOnMouseOver);
document.getElementById('imageSrc').addEventListener('click', MyFancyImageLayerGetsBigWhenIClickOnItSoThatUCanSeeTheImageBigger);