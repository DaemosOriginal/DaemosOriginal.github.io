class Fetch {
    constructor(parameters = '') {
        this.parameters = parameters;
    }
    async f() {
        await fetch(this.parameters)
        .then(res => res.json())
        .then(function(value)
        {
            const num = 5;
            let num_;
            let hight = 200;
            let widths = [];
            let pathlist = [];
            value.forEach(i =>
            {
                if (i.download_url != null)
                {
                    const image = document.createElement('img');        
                    image.src = i.download_url;
                    widths.push(image.width / image.height*hight);
                    console.log(`${image.width}/${image.height}*${hight}=${image.width / image.height*hight}`);
                    pathlist.push(i.download_url);
                    /*image.classList = 'img';
                    document.getElementById("c1").appendChild(image);
                    console.log(i.download_url);*/
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
                document.getElementById("c1").appendChild(div);
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
                        image.style.maxHeight = `${hight/widthlsit[i1]*window.innerWidth*.9}px`;
                        image.style.maxWidth = '100vw'
                        document.getElementById(`d${i1}`).appendChild(image);
                    }
                    i2 += 1;
                }
                i1 += 1
            }
        });
    }
}

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
    document.getElementById('layer')?.appendChild(img);
}

function myLayer(){
    document.getElementById(this.id)?.remove();
    document.getElementById('layer_img')?.remove();

}

let t = new Fetch('https://api.github.com/repos/daemosoriginal/daemosoriginal.github.io/contents/portfolio/src/images');
t.f();