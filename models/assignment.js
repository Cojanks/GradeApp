var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var assignmentSchema = new Schema({
    assignmentName: String,
    assignmentDescription: String,
    assignmentGrade: Number
});
const Assignment = mongoose.model("assignment", assignmentSchema);
module.exports = Assignment;