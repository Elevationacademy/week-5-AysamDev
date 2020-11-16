const consts = require("./consts")

const handleComplaints = function(complaint)
{
   
    if(consts.FINANCE == complaint.type)
    {
        console.log("Money doesn't grow on trees, you know.")
    }
    else if(consts.WEATHER == complaint.type)
    {
        console.log("It is the way of nature. Not much to be done.")
    }
    else
    {
        console.log("It'll pass, as all things do, with time.")
    }
}

module.exports = {handleComplaints,consts}
