var mongoose = require("mongoose");
var Student = require("./models/student");
var Assignment = require("./models/assignment");
var Course = require("./models/course");

var data = [
	{
		courseName: "Texas History - 1st Period",
	   courseDescription: "History class",
	   courseNickname: "Texas History",
	   courseStudents: []

	},
	{
		courseName: "Calculus",
   	courseDescription: "This is a math class",
   	courseNickname: "Calculus - 2nd Period",
   	courseStudents: []
	}
]; // data

var data2 =[
	{
		studentName: 'James Holden',
		studentID: 7788004,
		studentSex: 'm',
		studentAverage: 0,
		studentAssignments:[
			
		] // individual assignments
	}, // end individual student 
	{
		studentName: 'Paul Atreides',
		studentID: 4562201,
		studentSex: 'm',
		studentAverage: 0,
		studentAssignments:[
			
		] // individual assignments
	}, // end individual student
	{
		studentName: 'John Sheridan',
		studentID: 765812,
		studentSex: 'm',
		studentAverage: 0,
		studentAssignments:[
			
		] // individual assignments
	}, // end individual student 
	{
		studentName: 'Naomi Nagata',
		studentID: 7688831,
		studentSex: 'f',
		studentAverage: 0,
		studentAssignments:[
			
		] // individual assignments
	}, // end individual student
	{
		studentName: 'Kara Thrace',
		studentID: 7993650,
		studentSex: 'f',
		studentAverage: 0,
		studentAssignments:[
			
		] // individual assignments
	}, // end individual student 
	{
		studentName: 'Mark Watney',
		studentID: 2234908,
		studentSex: 'm',
		studentAverage: 0,
		studentAssignments:[
			
		] // individual assignments
	}, // end individual student
	{
		studentName: 'Susan Ivanova',
		studentID: 3132671,
		studentSex: 'f',
		studentAverage: 0,
		studentAssignments:[
			
		] // individual assignments
	}, // end individual student 
	{
		studentName: 'Phil Coulson',
		studentID: 2547089,
		studentSex: 'm',
		studentAverage: 0,
		studentAssignments:[
			
		] // individual assignments
	} 
]

function removeDataFromDB(){
	Student.remove({}, function(err) { 
   	if(err){
         console.log(err);
      }else{
	   	console.log("Students Removed!");
	   }
	});
	 Course.remove({}, function(err){
      if(err){
         console.log(err);
      }else{
         console.log("Courses Removed!!")
      }
   });
	 Assignment.remove({}, function(err){
      if(err){
         console.log(err);
      }else{
         console.log("Assignments Removed!!!")
      }
   });
}



function seedDB(){
	removeDataFromDB();

	data2.forEach(function(obj2){
      	Student.create(obj2, function(err, student){
      		if(err){
               console.log(err);
            }else{
               student.save();
            } //end else
      	}); //end student.create
      }); //end data2.forEach
	console.log("Students seeded");

   data.forEach(function(obj, i){
   	Course.create(obj, function(err, course){
   		if(err){
            console.log(err);
         }else{
         	Student.find({},function(err, students){
         		if(err){
         			console.log(err)
         		}else{
         			students.forEach(function(eachStudent){
         				course.courseStudents.push(eachStudent._id);
         			});
         		}
         		course.save()
         	}); //end student.find
         }
   	}); //end course.create
   }); //end data.forEach
   console.log("Courses Seeded");

} //End seedDB()



module.exports = {
	seedDB,
	removeDataFromDB
};