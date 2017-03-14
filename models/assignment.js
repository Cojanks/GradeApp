var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var assignmentSchema = new Schema({
    assignmentName: String,
    assignmentDescription: String,
    assignmentGade: Number
});
const Assignment = mongoose.model("assignment", assignmentSchema);
module.exports = Assignment;