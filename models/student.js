var mongoose = require("mongoose");

var studentSchema = new mongoose.Schema({
    studentName: String,
    studentID: String,
    studentSex: String,
    studentAssignments: []
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

module.exports =  mongoose.model("Student", studentSchema);