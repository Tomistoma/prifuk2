const express = require('express');
const member = require('../models/member');
const router = express.Router();
const Members = require('../models/member');
module.exports = router;



//getting all members
router.get('/api', async (req, res) => {
    try{
        const members = await Members.find();
        res.json(members)
    }catch(err){
        res.status(500).json({message: err.message})
    
    }
});

//getting onemembers by id
router.get('/api/id/:id', getMember, (req, res) => {
res.json(res.member);
})

//members by section
router.get('/api/section/:section', getMemberBySection, (req, res) => {
res.json(res.member); 
}) 
//members by membership
router.get('/api/membership/:membership', getMemberByMembership, (req, res) => {
    res.json(res.member); 
    })  


//create one member
router.post('/api/member', async (req, res) => {
const member = new Members ({
date: req.body.date,
section: req.body.section,
name: req.body.name,
surname: req.body.surname,
email: req.body.email,
membership: req.body.membership,
musicTaste: req.body.musicTaste,
telNumber: req.body.telNumber,
publicationAuth: req.body.publicationAuth
})
let memberId; //v této proměnné je uloženo Id membera
try{
    const newMember = await member.save();
    res.status(201).json(newMember._id);
   memberId = newMember._id._id;
   console.log("created!");
}catch(err){
    res.status(400).json({message: err.message});
}})

//update one
router.patch('/api/id/:id', getMember, async (req, res) => {
        if (req.body.name != null) {
            res.member.name = req.body.name;
        }
        if (req.body.surname != null) {
            res.member.surname = req.body.surname;
        }
        if (req.body.email != null) {
            res.member.email = req.body.email;
        }
        if (req.body.membership != null) {
            res.member.membership = req.body.req.body.membership;
        }
        if (req.body.musicTaste != null) {
            res.member.musicTaste = req.body.musicTaste;
        }
        if (req.body.telNumber != null) {
            res.member.telNumber = req.body.telNumber;
        }
        if (req.body.section != null) {
            res.member.section = req.body.section;
        }
        if (req.body.date != null) {
            res.member.date = req.body.date;
        }
        if (req.body.publicationAuth != null) {
            res.member.publicationAuth = req.body.publicationAuth;
        }
try{
const updatedMember = await res.member.save();
res.json(updatedMember);
}catch(err){
res.status(400).json({message: err.message});
}
})

router.delete("/api/id/:id", getMember, async (req, res) => {
try{
await res.member.remove();
res.json({message: "deleted"});
}catch(err){
res.status(500).json({message: err.message});
}
})


async function getMemberBySection(req, res, next){
    try{
       member = await Members.find({section: req.params.section },{});
        //post = await Members.find({}, {ukforum: {category: req.params.category}});
        if(member == null){
            return res.status(404).json({message: "Member doesnt exist"});
        }
}catch(err){
        return res.status(500).json({message: err.message});
}
res.member = member;
next();
}

async function getMember(req, res, next){
    try{
        member = await Members.findById(req.params.id);
        if(member == null){
            return res.status(404).json({message: "Member doesnt exist"});
        }
    }catch(err){
        return res.status(500).json({message: err.message});
    }
res.member = member;
next();
}
async function getMemberByMembership(req, res, next){
    try{
        member = await Members.find({membership: req.params.membership },{});
        if(member == null){
            return res.status(404).json({message: "Member doesnt exist"});
        }
    }catch(err){
        return res.status(500).json({message: err.message});
    }
res.member = member;
next();
}