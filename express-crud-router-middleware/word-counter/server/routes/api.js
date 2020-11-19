const express = require('express')
const router = express.Router()
const bodyParser = require(`body-parser`)
const path = require('path')
const validator = require('validator')


router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: false }))

router.use(express.static(path.join(__dirname, 'dist')))
router.use(express.static(path.join(__dirname, 'node_modules')))
//extension 2
const checkWord = function(word)
{
    let regex = [`a-zA-Z`]
    word = validator.whitelist(word,regex)
    console.log(word)
    word = word.toLowerCase()
    return word
}

const wordCounter = {
    hey:1,
    hello: 11,
    max: 4
}


router.get('/sanity/:word',function(req,res)
{
    let search = req.params.word
    search = checkWord(search)
    const count = {
       }
    wordCounter[search] == undefined ? count.count = 0 : count.count = wordCounter[search]
    res.send(count)

})
//extension 1
router.get('/popular',function(req,res)
{
    const entries = Object.entries(wordCounter)
    let max = entries[0][1] || 0
    let word = entries[0][0] || ''
    console.log(max)
     entries.forEach((wc) => {
        if(wc[1]>max)
        {
            max = wc[1]
            word = wc[0]
        }
     })
     const obj = {
         text: word,
         count: max
     }
    res.send(obj)

})
//Extension 3
router.get('/ranking',function(req,res)
{
    
    let ranking = Object.entries(wordCounter)
    ranking.sort(function([,a],[,b])
    {
        if(a > b)
        {
            return -1
        }
        else if ( a < b)
        {
            return 1
        }

        return 0
    })
    
    for(let i in ranking)
    {
        let obj = Object()
      console.log(ranking[i])
      obj[ranking[i][0]] = ranking[i][1]
      ranking[i] = obj
      console.log(obj)
    }
    res.send({ranking})
})


router.post('/word',function(req,res)
{
    let data = req.body.word
    data = checkWord(data)
    wordCounter[data] ? wordCounter[data]++ : wordCounter[data] = 1
    const ret = {
        text: `Added ${data}`,
        currentCount: wordCounter[data]
    }
    res.send(ret)

})

router.post('/words',function(req,res)
{
    const data = req.body.sentence
    let numNewWords = 0
    let numOldWords = 0
    const words = data.split(' ')
    words.forEach((w) => {
        w = checkWord(w)
        if(wordCounter[w])
        {
            wordCounter[w]++
            numOldWords++
        }
        else
        {
            wordCounter[w] = 1
            numNewWords++
        }
                        }
                )
    const ret = {
        text: `Added ${numNewWords} words. ${numOldWords} already exists`,
        currentCount: -1
    }
    res.send(ret)

})


router.get('/total',function(req,res)
{
    const obj = {
        text: "Total count",
        count: 0
    }
    let wordCounts = Object.values(wordCounter)
    wordCounts.forEach(c => obj.count += c)
    res.send(obj)
    
})


router.get('/sanity',function(req,res)
{
    res.send("server up and running")
})
module.exports = router