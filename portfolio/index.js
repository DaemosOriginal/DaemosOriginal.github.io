// manchaml wichtig
function sleep(miliseconds) {
    var currentTime = new Date().getTime();
 
    while (currentTime + miliseconds >= new Date().getTime()) {
    }
 }
//v1
async function f(url){
    await fetch(url)
    .then(res => res.json())
    .then(function(value)
    {
        const num = 5;
        let num_;
        let widths = [];
        let pathlist = [];
        value.forEach(i =>
        {
            if (i.download_url != null)
            {   
                const image = new Image(); 
                image.onload = function(){sleep(10);console.log('loaded')}
                image.src = i.download_url;
                pathlist.push(i.download_url);
                widths.push(image.naturalWidth / image.naturalHeight);
            }
        });
        num_ = Math.ceil(pathlist.length/num);
        let i1 = 0;
        let widthlsit  = [];
        while (i1 < num_)
        {
            let i2 = 0;
            let width = 0;
            while(i2 < num)
            {   
                if((i2+i1*num) < pathlist.length)
                {
                    width += widths[i2+i1*num];
                }
                i2 += 1;
            }
            widthlsit.push(width);
            i1 += 1;
        }
        i1 = 0;
        while (i1 < num_)
        {
            const div = document.createElement('div');
            div.id = `d${i1}`;
            div.classList = 'center';
            document.getElementById("c1")?.appendChild(div);
            let i2 = 0;
            while(i2 < num)
            {   
                if((i2+i1*num) < pathlist.length)
                {
                    const image = document.createElement('img'); 
                    image.src = pathlist[i2+i1*num];
                    image.classList = 'img';
                    image.id = 'img'
                    image.addEventListener("click",myButton);
                    image.style.maxHeight = `${1/widthlsit[i1]*window.innerWidth*.9}px`;
                    image.style.maxWidth = '100vw'
                    document.getElementById(`d${i1}`)?.appendChild(image);
                }
                i2 += 1;
            }
            i1 += 1
        }
    });
}
//iamgeloader for v2
async function loadImages(imageUrlList)
{
    const promiseArray = []; // create an array for promises
    const imageArray = []; // array for the images
    for (let imageUrl of imageUrlList) {
        promiseArray.push(new Promise(resolve => {
            const img = new Image();
            img.onload = function() {
                resolve();
            };
            img.src = imageUrl;
            imageArray.push(img);
        }));
    }

    await Promise.all(promiseArray); // wait for all the images to be loaded
    console.log("all images loaded");
    return imageArray;
}
//v2
async function d(url,num, scale){
    await fetch(url)
    .then(res => res.json())
    .then(function(value)
    {
        let imageUrlList = [];
        value.forEach(i => {
            if (i.download_url != null){
                imageUrlList.push(i.download_url);
            }
        
            
        });
        let widths = [];
        loadImages(imageUrlList).then((value)=>{
            value.forEach(i => {
                widths.push(i.naturalWidth/i.naturalHeight);
            });
            let num_;
            num_ = Math.ceil(widths.length/num);
            let widthLsit = [];

            let i1 = 0;
            while(i1 < num_)
            {
                let width = 0;

                let i2 = 0;
                while(i2 < num)
                {
                    if((i2+i1*num) < widths.length)
                    {
                        width += widths[i2+i1*num];
                    }
                    i2 += 1;
                }
                widthLsit.push(width);
                i1 += 1;
            }

            i1 = 0;
            while(i1 < num_)
            {
                const div = document.createElement('div');
                div.id = `d${i1}`;
                div.classList = 'center container';
                document.getElementById("c1")?.appendChild(div)

                let i2 = 0;
                while(i2 < num)
                {
                    if((i2+i1*num) < widths.length)
                    {
                        const image = value[i2+i1*num] 
                        image.classList = 'img';
                        image.id = 'img';
                        image.style.maxHeight = `${1/widthLsit[i1]*window.innerWidth*scale}px`;
                        image.style.maxWidth = '100vw'
                        image.addEventListener("click",myButton);
                        document.getElementById(`d${i1}`)?.appendChild(image);
                    }
                    i2 += 1;
                }
                i1 += 1;
            }
        });
    });
}
// -> clicklogick für v1 und v2
function myButton(){
    console.log(this.src);
    const layer = document.createElement('div');
    layer.classList = 'layer';
    layer.addEventListener("click",myLayer);
    layer.id = 'layer'
    document.body.appendChild(layer);
    const img = document.createElement('img');
    img.src = this.src;
    img.id = 'layer_img';
    img.classList = 'layer';
    document.getElementById('layer').appendChild(img);
    // fix scrolling wärend des großen bildes 
    document.body.style.overflow = 'hidden';
}

function myLayer(){
    document.getElementById(this.id)?.remove();
    document.getElementById('layer_img')?.remove();
    // fix scrolling wärend des großen bildes 
    document.body.style.overflow = '';
}

//die spracherkennung für unten
function getLanguage()
{
    const userLnag = navigator.language || navigator.userLanguage; 
    console.log(userLnag);
    return userLnag;
}

// zum groben unterscheiden zwishcen handy und pc
if(window.innerHeight < window.innerWidth)
{
    d('https://api.github.com/repos/daemosoriginal/daemosoriginal.github.io/contents/portfolio/src/images',5, .9);
}
else
{
    d('https://api.github.com/repos/daemosoriginal/daemosoriginal.github.io/contents/portfolio/src/images',1, .9);
}

//text anhant der spracherkennung
// bekommt den text aus den html dokument.
if (getLanguage() == 'de')
{
    let text = '';
    document.getElementById('beschreibung').innerHTML.split('\\n').forEach(e => {
        if (e != '')
        {   
            text +=(e+'<br>');
        }
        
    });
    document.getElementById('beschreibung').innerHTML = '<p>'+text+'</p>';
    document.getElementById('description').remove();
}
else
{
    let text = '';
    document.getElementById('description').innerHTML.split('\\n').forEach(e => {
        if (e != '')
        {   
            text +=(e+'<br>');
        }
    });
    document.getElementById('description').innerHTML = '<p>'+text+'</p>';
    document.getElementById('beschreibung').remove();
}