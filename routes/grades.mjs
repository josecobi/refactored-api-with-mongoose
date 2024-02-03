// Load environment variables
import dotenv from "dotenv";
dotenv.config();
import express from 'express'
const router = express.Router();
//Import Grade model where we defined the Schema for grades
import Grade from "../models/grades.mjs";


// get all grades limit 50  testing link: http://127.0.0.1:5050/grades
router.get("/", async (req, res) => {
    try{
        const grades = await Grade.find({}).limit(50);
        // minor error handling
        if (!grades) res.send("Not found").status(404)
        else res.status(200).send(grades)
    
    }
    catch(err){
        console.error(err);
    }
})


// Get a grade by Id testing link http://127.0.0.1:5050/grades/56d5f7eb604eb380b0d8d8dd
router.get("/:id", async (req, res) => {
    try{
        const id = req.params.id;
        const grades = await Grade.findById(id);
        // minor error handling
        if (!grades) res.send("Not found").status(404)
        else res.status(200).send(grades)
    }
    catch(err){
        console.error(err);
    }
})


// Get a learner's grade data http://127.0.0.1:5050/grades/learner/3
router.get("/learner/:id", async (req, res) => {
    const id = Number(req.params.id);
    try {
        const grades = await Grade.find({learner_id : id}, 'scores');
        if (!grades) res.send("Not found").status(404)
        else res.status(200).send(grades)
    }
    catch(error){
        console.error(error);
    }
})


//Get a class's grade data. Testing link http://127.0.0.1:5050/grades/class/460?learner_id=1661
router.get("/class/:id", async (req, res) => {
    try{
        let  class_id = Number(req.params.id);
        let query = {class_id: class_id}
        //If the learner_id is provided via query (eg: `?learner_id=1661`) add to the query object
        if(req.query.learner_id) query.learner_id = req.query.learner_id;
        //find entrie based on the properties inside the query
        let class_grades = await Grade.find(query);
        // minor error handling
        if (!class_grades) res.send("Not found").status(404)
        else res.status(200).send(class_grades)
    }     
    catch(err){
        console.error(err);
    }   
});

export default router