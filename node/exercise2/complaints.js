const a = require("./complaintsHandler")
console.log(a)
let complaint1 = {
    text: "I'm not getting enough money",
    type: a.consts.FINANCE
}

let complaint2 = {
    text: "My salary hasn't come in yet",
    type: a.consts.FINANCE
}

let complaint3 = {
    text: "I'm always full of energy",
    type: a.consts.EMOTIONS
}

a.handleComplaints(complaint1) //should print "Money doesn't grow on trees, you know."
a.handleComplaints(complaint2) //should print "Money doesn't grow on trees, you know."
a.handleComplaints(complaint3) //should print "It'll pass, as all things do, with time."