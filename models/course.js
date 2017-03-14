var mongoose = require("mongoose");
var Student = require("./student");
var Assignment = require("./assignment");
var Schema = mongoose.Schema;

var courseSchema = new Schema({
    courseName: String,
    courseDescription: String,
    courseNickname: String,
    courseStudents: [{
		type: Schema.Types.ObjectId,
		ref: 'student'
	}]
});

const Course = mongoose.model("course", courseSchema);
module.exports =  Course;