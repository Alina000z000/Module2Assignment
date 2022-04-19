const express = require("express")
const app = express()
const fetch = require('node-fetch')
const port = 4000
const cors = require("cors")

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cors())


app.get("/", cors(), async (req, res) => {
    let breed = [
        "affenpinscher",
        "african",
        "airedale",
        "akita",
        "appenzeller",
        "basenji",
        "beagle",
        "bluetick",
        "whippet"
    ]
    let message = ""
    for(let a in breed){
        message += "<a href='/view/" + breed[a] + "'>" + breed[a] + "</a></br>"
    }
    res.send(message)
})

app.get("/dog", cors(), async (req, res) => {
    res.send("<img src='https://th.bing.com/th/id/R.0c1079a98b52c9aaa0c13157a6a056af?rik=ADvR4JgdO7lZLA&riu=http%3a%2f%2fimages6.fanpop.com%2fimage%2fphotos%2f32500000%2fDog-dogs-32509010-3888-2592.jpg&ehk=uhJ5%2fPVXGgwTmYp2bOEQLc9sxt6mDon6frN7yK3wX1c%3d&risl=&pid=ImgRaw&r=0'>")
})

app.get("/view/:dogbreed", (req, res) =>{
    fetch("https://dog.ceo/api/breed/"+req.params.dogbreed+"/images/random")
    .then(res => res.json())
    .then(json => {
        res.send("<img src='" + json.message + "'>")
    })
})

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`)
})
