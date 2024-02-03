// Load environment variables
import dotenv from "dotenv";
dotenv.config();

import express from 'express'
import mongoose from "mongoose";
// import db from "../db/conn.mjs"
// import { ObjectId } from 'mongodb'
import Grade from "../models/grades.mjs";
const router = express.Router();

await mongoose.connect(process.env.ATLAS_URI);

// router.post('/', async (req, res) => {

// })
// // Create a single grade entry
// router.post('/', async (req,res) =>{
//     let collection = await db.collection('grades')
//     let newDocument = req.body

//     if (newDocument.student_id) {
//         newDocument.learner_id = newDocument.student_id
//         delete newDocument.student_id
//     }

//     let result = await collection.insertOne(newDocument)
//     res.send(result).status(204)
// })

// get all grades limit 50  testing link: http://127.0.0.1:5050/grades
router.get("/", async (req, res) => {
    try{
    const grades = await Grade.find({}).limit(50);
    res.status(200).send(grades);
    }
    catch(err){
      console.error(err);
    }
})

// // Get a single grade entry
// router.get("/:id", async (req, res) => {
//     let collection = await db.collection('grades')
//     let query = {_id: new ObjectId(req.params.id)}
//     let result = await collection.findOne(query)


//     // minor error handling
//     if (!result) res.send("Not found").status(404)
//     else res.send(result).status(200)
// })

// Get a single grade entry
// router.get("/id:", async (req, res) => {
  
//   const id = req.params.id;
//   await Grade.findOne({_id: id}).limit(1)
//   .then((result) => {
//     console.log(result);
//   res.status(200).json({data: result});

//   })
//   .catch((error) => {
//     console.error(error);
//   });

  
// })

// // Get a grade by Id testing link http://127.0.0.1:5050/grades/56d5f7eb604eb380b0d8d8dd
router.get("/:id", async (req, res) => {
    try{
        const id = req.params.id;
        const grades = await Grade.findById(id);
        res.status(200).send(grades);
    }
    catch(err){
        console.error(err);
    }
})

// // Add a score to a grade entry
// router.patch("/:id/add", async (req, res) => {
//     let collection = await db.collection("grades")
//     let query = { _id: ObjectId(req.params.id) }
  
//     let result = await collection.updateOne(query, {
//       $push: { scores: req.body }
//     })
  
//     if (!result) res.send("Not found").status(404)
//     else res.send(result).status(200)
//   })
  
//   // Remove a score from a grade entry
//   router.patch("/:id/remove", async (req, res) => {
//     let collection = await db.collection("grades")
//     let query = { _id: ObjectId(req.params.id) }
  
//     let result = await collection.updateOne(query, {
//       $pull: { scores: req.body }
//     })
  
//     if (!result) res.send("Not found").status(404)
//     else res.send(result).status(200)
//   });

  // // Delete a single grade entry
  // router.delete("/:id", async (req, res) => {
  //   let collection = await db.collection("grades");
  //   let query = { _id: ObjectId(req.params.id) };
  //   let result = await collection.deleteOne(query);
  
  //   if (!result) res.send("Not found").status(404);
  //   else res.send(result).status(200);
  // });

// // Delete a single grade entry
// router.delete("/:id"), async (req, res) => {
//     const id = req.params.id;
//     const deletedGrade = await Grade.findByIdAndDelete(id)
  
 
// }

// // Student/Learner route for backwards compatibility
// router.get("/student/:id", async (req, res) => {
//     res.redirect(`../learner/${req.params.id}`)
//   })

//

// // Get a learner's grade data
// router.get("/learner/:id", async (req, res) => {
//     let collection = await db.collection("grades")
//     let query = { learner_id: Number(req.params.id) }
    
//     // Check for class_id parameter
//     if (req.query.class) query.class_id = Number(req.query.class)
  
//     let result = await collection.find(query).toArray()
  
//     if (!result) res.send("Not found").status(404)
//     else res.send(result).status(200)
//   })

// Get a learner's grade data http://127.0.0.1:5050/grades/learner/3
router.get("/learner/:id", async (req, res) => {
    const id = Number(req.params.id);
    try {
        const grades = await Grade.find({learner_id : id}, 'scores');

        console.log(grades);
        res.status(200).send(grades);
    }
    catch(error){
        console.error(error);
    }
})

// // Delete a learner's grade data
// router.delete("/learner/:id", async (req, res) => {
//     let collection = await db.collection("grades")
//     let query = { learner_id: Number(req.params.id) }
  
//     let result = await collection.deleteOne(query)
  
//     if (!result) res.send("Not found").status(404)
//     else res.send(result).status(200)
// })

// //Get a class's grade data
// router.get("/class/:id", async (req,res) => {
//     let collection = await db.collection("grades")
//     let query = {class_id: Number(req.params.id)}

//     // Check for learner_id parameter
//   if (req.query.learner) query.learner_id = Number(req.query.learner)

//     let result = await collection.find(query).toArray()

//     if (!result) res.send("Not found").status(404)
//     else res.send(result).status(200)
// })

//Get a class's grade data
router.get("/class/:id", async (req, res) => {
    try{
        let  class_id = Number(req.params.id);
        let query = {class_id: class_id}
 

        if(req.query.learner_id){  
            query.learner_id = req.query.learner_id;

            let class_grades = await Grade.find(query);
            res.status(200).send(class_grades);
          } 

        else {         
            let class_grades = await Grade.find(query);

            res.status(200).send(class_grades);
        }
    }
    catch(err){
        console.error(err);
    }   
  
});

// // Update a class id
// router.patch("/class/:id", async (req, res) => {
//     let collection = await db.collection("grades")
//     let query = { class_id: Number(req.params.id) }
  
//     let result = await collection.updateMany(query, {
//       $set: { class_id: req.body.class_id }
//     })
  
//     if (!result) res.send("Not found").status(404)
//     else res.send(result).status(200)
//   })
  
//   // Delete a class
//   router.delete("/class/:id", async (req, res) => {
//     let collection = await db.collection("grades")
//     let query = { class_id: Number(req.params.id) }
  
//     let result = await collection.deleteMany(query)
  
//     if (!result) res.send("Not found").status(404)
//     else res.send(result).status(200)
//   })

export default router