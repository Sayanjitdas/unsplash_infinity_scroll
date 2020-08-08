const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let loadedImg = 0;
let totalImg = 0;

//unsplash ACCESS KEY
const accessKey = `2saqVwIZqVxd8DB2dORZ7xy94YBnPNV8gxjzuxHpYLQ`;
let count = 3;



//helper function to set Attributes
function setAttr(elem,attrs){
    for(const key in attrs ){
        elem.setAttribute(key,attrs[key])
    }
}

//check all images are loaded
function imageloaded(){ 
    console.log('image loaded..')
    loadedImg++;
    if(loadedImg === totalImg){
        ready = true;
        loader.hidden = true;
        count = 30;

        // console.log("ready = ",ready);

    }
}

//render fetched photos to DOM
function displayPhotos(data){
    totalImg = data.length;
    console.log(totalImg);
    //foreachloop to loop through the array of data
    data.forEach(function(photo){
        //create <a> element to link to unsplash website
        const anchor = document.createElement('a');
        // anchor.setAttribute('href',photo.links.html);
        // anchor.setAttribute('target','_blank');
        setAttr(anchor,{
            href:photo.links.html,
            target:'_blank'
        })

        //create <img> element for photos
        const image = document.createElement('img');
        // image.setAttribute('src',photo.urls.regular);
        // image.setAttribute('alt',photo.alt_description);
        // image.setAttribute('title',photo.alt_description);
        
        setAttr(image,{
            src:photo.urls.regular,
            alt:photo.alt_description,
            title: photo.alt_description
        })

        //check images load with load eventhandler on image element
        image.addEventListener('load',imageloaded)
        //putting img inside a and then inside image-container
        anchor.appendChild(image);
        imageContainer.appendChild(anchor);
    })
}


//on scroll images fetch fucntion
window.addEventListener('scroll',function(){
    /*algorithm used
    if window.innerheight i.e the total height of the device browser window added with
    the scrollY value i.e the total scrolled value with respect to top of the 
    browser window where the scroll start is greater than the document.body.offsetHeight
    i.e the height of the total body content both visible and invisible(visible on scroll)
    subtracted by 1000px where api call in made before reaching the scroll end
    also as we have to keep check whether every image is loaded before another api call we are keeping a ready flag
    "all values are in pixels" */
    if(window.innerHeight + window.scrollY > document.body.offsetHeight - 1000 && ready){
        getPhotos();
        ready=false;
        loadedImg = 0;
    };
})

//Get images from unsplash
async function getPhotos(){
    try{   
        const uri = `https://api.unsplash.com/photos/random/?client_id=${accessKey}&count=${count}`; 
        const response = await fetch(uri);
        const data = await response.json();
        displayPhotos(data);
    }catch(err){
        console.log(err)
    }

}

getPhotos()