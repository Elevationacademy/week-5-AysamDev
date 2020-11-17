const express = require("express")
const path = require("path")
const store = [
    { name: "table", inventory: 3, price: 800 },
    { name: "chair", inventory: 16, price: 120 },
    { name: "couch", inventory: 1, price: 1200 },
    { name: "picture frame", inventory: 31, price: 70 }
]

const app = express()

app.use(express.static(path.join(__dirname, 'dist')))
app.use(express.static(path.join(__dirname, 'node_modules')))


app.get("/priceCheck/:name",function(req,res)
{
    let id = req.params.name
    let save = {
        price: null
    }
    for(let item of store)
    {
        if(item.name == id)
        {
           save.price = item.price
           if(item.inventory>0)
           {
               item.inventory--
           }     
          
        }
    }

res.send(save)
})

app.get("/buy/:name",function(req,res)
{
    let id = req.params.name
    for(let item of store)
    {
        if(item.name == id)
        {
          res.send(item)
        }
    }
})

app.get("/sale",function(req,res)
{
 let params =  req.query
 if(params.admin ===`true`)
{
    for(let item of store)
    {
        if(item.inventory > 10)
        {
            item.price *= 0.5
        }
    }
}
    res.send(store)
})

app.get("/",function(req,res)
{
    res.send("Server is up and running smoothly")
})

const port = 3000

app.listen(port,function()
{
    console.log("running server on port "+ port)
})