const express = require('express')
const router = express.Router()

router.use(express.json())
router.use(express.urlencoded({ extended: false }))


const Person = require('../models/Person')

router.get('/people', function (req, res) {
    Person.find({}, function (err, people) {
        res.send(people)
    })
})
//Exercise 2
router.put('/people/:id', function (req, res) {
    Person.findById(req.params.id, function (err, person) {
        person.age = 80
        person.save()
        res.send("updated the user successfully")
    })
})
//Exercise 1
router.post('/people',function(req,res)
{
    const p1 = {
    firstName: req.body.firstName,
     lastName: req.body.lastName,
     age: req.body.age
    }
    
    let person = new Person(p1)
    person.save()
    res.send("The Person was saved successfully to the database")
})
//Exercise 3
router.delete('/apocalypse', function (req, res) {
    Person.remove(function(err)
    {
        console.log(err)
    })
    res.send("The Document was removed successfully")
})

module.exports = router