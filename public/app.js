const param = document.querySelector('.input')
const inputBtn = document.querySelector('.input_btn')
const content = document.querySelector('.search')
const imageContainer = document.querySelector('.search_images')
const imageHistory = document.querySelector('.history_images')

const baseUrl = "https://avant-ai.onrender.com/results?"
const options= {
    method: 'GET'
}



inputBtn.addEventListener("click",(event)=>{
    event.preventDefault();
    loadImage(param.value)
})

async function loadInfo(parameters){  
    let res = await fetch(baseUrl + new URLSearchParams({search:parameters}),options)
    let data = await res.json()

    return data
}


//load image and output image

async function loadImage(parameters){
    loadingImage()
    let testImage = await loadInfo(parameters)
    console.log(testImage)
    let url = testImage.data
    clearImageContainer()

 

    // adds images to the history tab and output tab
    const newDiv = document.createElement('div')
    newDiv.classList.add('history_images_set')
    url.forEach(val => { 
        const newImg = new Image()
        newImg.classList.add('history_image')
        newImg.src = val.url
        
        newImg.onload = ()=>{
            newImg.style.visibility = "visible"
        }

        newImg.addEventListener("click",()=>{
            window.open(newImg.src)
        })

        newDiv.appendChild(newImg)
    }); 
    imageHistory.appendChild(newDiv)

    url.forEach(val => { 
        const newImg = new Image()
        newImg.classList.add('images')
        newImg.src = val.url
        
        newImg.onload = ()=>{
            newImg.style.visibility = "visible"
        }

        newImg.addEventListener("click",()=>{
            window.open(newImg.src)
        })
        
        imageContainer.appendChild(newImg)
    });

}

function clearImageContainer(){
    imageContainer.innerHTML=""
}

function loadingImage(){
    clearImageContainer()
    const newImg = new Image()
    newImg.classList.add('loading_image')
    newImg.src = './images/loading.gif'
    imageContainer.appendChild(newImg)
}


