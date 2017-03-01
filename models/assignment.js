var mongoose = require("mongoose");


var assignmentSchema = new mongoose.Schema({
    assignmentName: String,
    assignmentDescription: String,
    studentGrades: {}
});
module.exports =  mongoose.model("Assignment", assignmentSchema);