var mongoose = require("mongoose");
var Assignment = require("./assignment");
var Schema = mongoose.Schema;

var studentSchema = new Schema({
    studentName: String,
    studentID: String,
    studentSex: String,
    studentAverage: Number,
    studentAssignments: [{
        type: Schema.Types.ObjectId,
        ref: 'assignment'
    }]
});

studentSchema.virtual('studentAssignments.studentAverage').get(function (){
    var total = 0;
    
    if(this.studentAssignments.length>0){
    	
    	this.studentAssignments.forEach(function(obj){
    		total += obj.assignmantGrade;
    	});

    	if(total===0){
    		return 0;
    	}else{
	   	return (total/this.studentAssignments.length).toFixed(2);
 		}
 	}else{
	  return total;
	}
});

const Student = mongoose.model("student", studentSchema);
module.exports = Student;
