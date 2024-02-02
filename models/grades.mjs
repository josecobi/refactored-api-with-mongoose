import mongoose from "mongoose";

const model = mongoose.model;
const Schema = mongoose.Schema;

const gradeSchema = new Schema({
    score: [],
    class_id: Number,
    learner_id: Number,
})

const Grade = model("Grade", gradeSchema);

export default Grade;