// const a = new Date()
// const moment = require('moment')

// const  ajax  = require("jquery")

// let formattedTimeNow = moment().format("MMMM Do, YYYY")
// console.log(formattedTimeNow) //January 3rd, 2017

// $('div').on('click',function()
// {
//     $(this).css("backgroundColor","#f39c12")
// })

const urllib = require('urllib')

urllib.request('http://data.nba.net/10s/prod/v1/2016/players.json', function(err, response){
    console.log(response.toString())
})