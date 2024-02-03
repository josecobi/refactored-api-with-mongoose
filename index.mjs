// Load environment variables
import dotenv from "dotenv";
dotenv.config();

import express from "express";


// import mongoose ODM library to work with schemas and validate data before sending or manipulatuing it in the database. This validation only happens at the level of your app. Other apps may not have access to this schema and not follow the same validation system and can mess up the database's document's schema 
import mongoose from "mongoose";

// connect to mongoDB through mongoose
await mongoose.connect(process.env.ATLAS_URI);

//Import Grade model where we defined the Schema for grades
import Grade from "./models/grades.mjs";


const PORT = process.env.PORT || 5050;
const app = express();

// importing our routes from grades.mjs
import grades from "./routes/grades.mjs" ;

app.use(express.json());


app.get("/", (req, res) => {
    res.send("Welcome to the API.");
  });

app.use("/grades", grades);

// Global error handling
app.use((err, _req, res, next) => {
    res.status(500).send("Seems like we messed up somewhere...");
  });

// Start the Express server
app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
  });