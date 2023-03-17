const express = require('express');
const idea = require('../models/idea');
const router = express.Router();
const Ideas = require('../models/idea');
const member = require('../models/member');
const Members = require('../models/member');
module.exports = router;



//getting all ideas
router.get('/api', async (req, res) => {
    try{
        const ideas = await Ideas.find();
        res.json(ideas)
    }catch(err){
        res.status(500).json({message: err.message})
    
    }
});

//getting one idea by id
router.get('/api/id/:id', getIdea, (req, res) => {
res.json(res.idea);
})

//create one idea
router.post('/api/idea', async (req, res) => {
let member = await Members.find({email: req.body.email },{});
const idea = new Ideas ({
date: req.body.date,
ideaName: req.body.ideaName,
memberId: member[0].id,
description: req.body.description,
needs: req.body.needs,
helpers: req.body.helpers,
approval: req.body.approval
})
let ideaId; //v této proměnné je uloženo Id membera
try{
    const newIdea = await idea.save();
    res.status(201).json(newIdea._id);
   ideaId = newIdea._id._id;
   console.log("created!");
}catch(err){
    res.status(400).json({message: err.message});
}})

//update one
router.patch('/api/id/:id', getIdea, async (req, res) => {
        if (req.body.ideaName != null) {
            res.idea.ideaName = req.body.ideaName;
        }
        if (req.body.description != null) {
            res.idea.description = req.body.description;
        }
        if (req.body.needs != null) {
            res.idea.needs = req.body.needs;
        }
        if (req.body.helpers != null) {
            res.idea.helpers = req.body.req.body.helpers;
        }
        if (req.body.approval != null) {
            res.idea.approval = req.body.approval;
        }
try{
const updatedIdea = await res.idea.save();
res.json(updatedIdea);
}catch(err){
res.status(400).json({message: err.message});
}
})

router.delete("/api/id/:id", getIdea, async (req, res) => {
try{
await res.idea.remove();
res.json({message: "deleted"});
}catch(err){
res.status(500).json({message: err.message});
}
})

async function getIdea(req, res, next){
    try{
        idea = await Ideas.findById(req.params.id);
        if(idea == null){
            return res.status(404).json({message: "Idea doesnt exist"});
        }
    }catch(err){
        return res.status(500).json({message: err.message});
    }
res.idea = idea;
next();
}


