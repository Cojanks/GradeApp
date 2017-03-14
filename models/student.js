var mongoose = require("mongoose");
var Assignment = require("./assignment");
var Schema = mongoose.Schema;

var studentSchema = new Schema({
    studentName: String,
    studentID: String,
    studentSex: String,
    studentAssignments: [{
        type: Schema.Types.ObjectId,
        ref: 'assignment'
    }]
});

studentSchema.virtual('studentAverage').get(function (){
     var total = 0;
    if(this.studentAssignments.length>0){
    	this.studentAssignments.forEach(function(obj){
    		total += obj.assignmantGrade;
    	});
    return (total/this.studentAssignments.length).toFixed(2);
 	}
	  return total;
});

const Student = mongoose.model("student", studentSchema);
module.exports = Student;
