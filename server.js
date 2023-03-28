const port = 3000
const express = require('express')
const cors = require('cors')
const axios = require('axios')
const app = express()

app.use(cors())

//routes
app.use(express.static('public')) 

//render my index.html as hompage
app.get('/',(req, res)=>{
    res.render(__dirname='/index.html')
})

//connect to image api 
async function loadImage(info){
    const { Configuration, OpenAIApi } = require("openai");
    const configuration = new Configuration({
    apiKey: "INSERT YOUR OWN API KEY HERE",
    });
    const openai = new OpenAIApi(configuration);
    const response = await openai.createImage({
    prompt: info,
    n: 4,
    size: "512x512",
    });

    return response.data
}

//send back image url to my frontend

app.get('/results',(req,res)=>{
    let queryData = req.query.search
    loadImage(queryData)
    .then((response)=>{
        res.json(response)
    })
    .catch((error)=>{
        console.log(error)
    })
})

app.listen(port,()=> console.log(`Server running on port: ${port}`))


