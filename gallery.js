async function fetchJson(url = "") {
    const response = await fetch(url);
    const data = await response.json();
    return Promise.resolve(data);
  }

function isMobile(){
    if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)){
        return true
    }
    return false
}

// see below function
function getGalleryObjects(set = -1){
    const getGallery = (index) => {
        let isContainer = false
        for (e of Object.values(document.querySelectorAll("#gallery"))){
            if(Object.values(e.classList).includes("container")){
                isContainer = true
            }
            if((isContainer)&&(index == 0)){galleryTmp = e}
            if((! isContainer)&&(index == 1)){galleryTmp = e}
        }
        return(galleryTmp)
    }
    switch(set){
        case 0:
            return getGallery(0)
        case 1:
            return getGallery(1)
        default:
            return -1
    }
}

// get gallery objects
const gallery = getGalleryObjects(0);
const galleryConatiner = getGalleryObjects(1);

// load images
  fetchJson(
    "https://api.github.com/repos/daemosoriginal/daemosoriginal.github.io/contents/portfolio/src/images"
  ).then((e) => {
    let cont;
    Object.values(document.querySelectorAll("#gallery")).forEach((e) => {
      const select = Object.values(e.classList).includes("container");
      if (select) {
        cont = e;
      }
    });

    // cna now exclude images by name

    for(let i = 0; i < e.length; i++){
        if (e[i].name.split('_').includes('!x')){
            e.splice(i,1)
        }
    }

    let i = 0;
    e.forEach((image) => {
      const url = image.download_url;
      const img = new Image();
      img.src = url;
      img.classList.add("gallery", "img");
      img.dataset.index = i;
      img.dataset.status = "";
      img.classList.add("portfolioImage");
      i++;
      cont.appendChild(img);
    });
    cont.dataset.loaded = true;
  });

// actuall image effect
const observer = new MutationObserver((entries) => {
// load images into observer
    const images = Object.values(
        document.getElementsByClassName("portfolioImage")
    );
    let gloablIndex = 0,
        last = { x: 0, y: 0 };

// function to set position of images
    const activate = (image, x, y) => {
        image.style.left = `${x}px`;
        image.style.top = `${y}px`;
        image.dataset.status = "active";
        last = { x, y };
    };

// function to find distance between last and next image 
    const distance = (x, y) => {
        return Math.hypot(x - last.x, y - last.y);
    };

    const imageOnClickPC = (event) => {
        const self = event.target,
            bigSelf = new Image(),
            back_layer = document.createElement("div");
        
        bigSelf.src = self.src;
        bigSelf.id = `${self.dataset.index}_img`;
        bigSelf.classList.add("gallery", "largImage");

        back_layer.classList.add("backLayer");
        if (!(isMobile())){
            document.onkeydown = (event) => {
                if(event.key == "Escape"){
                    back_layer.remove()
                    bigSelf.remove()
                }
            }
            document.onmousedown = (event) => {
                if(event.buttons == 1){
                    back_layer.remove()
                    bigSelf.remove()
                }
            }
        }
        else{
            document.onclick = (event) => {
                back_layer.remove()
                bigSelf.remove()
            }
        }
        gallery.appendChild(back_layer);
        gallery.appendChild(bigSelf);
    }

    const myShowImagesOnPc = (mouse,dist) =>{
        if ((distance(mouse.clientX, mouse.clientY) > dist) && (galleryConatiner.style.display != 'none')) {
            const lead = images[gloablIndex % images.length],
                tail = images[(gloablIndex - 5) % images.length],
// workaround to get before without error
                getBefore = () =>{
                    let beforeTmp
                    switch(images[(gloablIndex - 1) % images.length]){
                        case undefined:
                            beforeTmp = images[images.length + ((gloablIndex - 1) % images.length)];
                            break;
                        default:
                            beforeTmp = images[(gloablIndex - 1) % images.length];
                            break;
                    }
                    return beforeTmp;
                },
                before = getBefore();
    
            activate(lead, mouse.clientX, mouse.clientY);
            if (tail) tail.dataset.status = "";
    
            lead.style.zIndex = (gloablIndex + 1) % images.length;
            
// add event to make images biger wehn clicked
            lead.onclick = (event) => {imageOnClickPC(event)};
// remove event from image before
            try{before.onclick = null}catch{}
    
            gloablIndex++;
    
            if (gloablIndex % images.length == 0) {
                images.forEach((image) => {
                image.style.zIndex = 0;
                });
            }
        }
            else if(galleryConatiner.style.display == 'none'){
            gloablIndex = 0
            images.forEach(image => {image.dataset.status = ""})
        }
    }

    const myShowImagesOnPhone = (mouse,dist) =>{
        if ((distance(mouse.clientX, mouse.clientY) > dist) && (galleryConatiner.style.display != 'none')) {
            const lead = images[gloablIndex % images.length],
                tail = images[(gloablIndex - 5) % images.length],
// workaround to get before without error
                getBefore = () =>{
                    let beforeTmp
                    switch(images[(gloablIndex - 1) % images.length]){
                        case undefined:
                            beforeTmp = images[images.length + ((gloablIndex - 1) % images.length)];
                            break;
                        default:
                            beforeTmp = images[(gloablIndex - 1) % images.length];
                            break;
                    }
                    return beforeTmp;
                },
                before = getBefore();
    
            activate(lead, mouse.clientX, mouse.clientY);
            if (tail) tail.dataset.status = "";
    
            lead.style.zIndex = (gloablIndex + 1) % images.length;
            
// add event to make images biger wehn clicked
            lead.onclick = (event) => {imageOnClickPC(event)};
// remove event from image before
            try{before.onclick = null}catch{}
    
            gloablIndex++;
    
            if (gloablIndex % images.length == 0) {
                images.forEach((image) => {
                image.style.zIndex = 0;
                });
            }
        }
            else if(galleryConatiner.style.display == 'none'){
            gloablIndex = 0
            images.forEach(image => {image.dataset.status = ""})
        }
    }
    
    switch (isMobile()) {
        case false:
            window.onmousemove = (mouse) => {myShowImagesOnPc(mouse, 200)};
            break;
    
        case true:
            //window.onclick = (mouse) => {myShowImages(mouse, 0)};
            window.ontouchend = (mouse) => {myShowImagesOnPhone(mouse.changedTouches[0], 0)}
            break;
        
        default:
            console.error("galleryMode // isMobile // not true or false")
            break;
    }
});

observer.observe(gallery, { attributes: true });