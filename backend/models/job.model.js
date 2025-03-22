const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
    title: { type: String, required: true },
    company: { type: mongoose.Schema.Types.ObjectId, ref:'Company', require: true },
    location: { type: String, required: true },
    salary: { type: String, },
    requirement: { type: [String] },
    description: { type: String, required: true },
    jobType: { type: String, required: true },
    postedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" ,require:true },
    applicants: [{ type: mongoose.Schema.Types.ObjectId, ref: "Application" }],
}, { timestamps: true });

module.exports = mongoose.model("Job", jobSchema);

