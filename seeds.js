var mongoose = require("mongoose");
var Student = require("./models/student");
var Assignment = require("./models/assignment");
var Course = require("./models/course");

var data = [
	{
		courseName: "Texas History",
	   courseDescription: "History class",
	   courseNickname: "hist",
	   courseStudents: []

	},
	{
		courseName: "Calculus",
   	courseDescription: "This is a math class",
   	courseNickname: "math",
   	courseStudents: []
	}
]; // data

var data2 =[
	{
		studentName: 'Corey Jenkins',
		studentID: 7788004,
		studentSex: 'm',
		studentAssignments:[
			
		] // individual assignments
	}, // end individual student 
	{
		studentName: 'Dave Sweeney',
		studentID: 4562201,
		studentSex: 'm',
		studentAssignments:[
			
		] // individual assignments
	}, // end individual student
	{
		studentName: 'Mark Dorf',
		studentID: 765812,
		studentSex: 'm',
		studentAssignments:[
			
		] // individual assignments
	}, // end individual student 
	{
		studentName: 'Maia Harms',
		studentID: 7688831,
		studentSex: 'f',
		studentAssignments:[
			
		] // individual assignments
	}, // end individual student
	{
		studentName: 'Patrick Racheff',
		studentID: 7993650,
		studentSex: 'm',
		studentAssignments:[
			
		] // individual assignments
	}, // end individual student 
	{
		studentName: 'Marc August',
		studentID: 2234908,
		studentSex: 'f',
		studentAssignments:[
			
		] // individual assignments
	}, // end individual student
	{
		studentName: 'Vytenis Krukonis',
		studentID: 3132671,
		studentSex: 'm',
		studentAssignments:[
			
		] // individual assignments
	}, // end individual student 
	{
		studentName: 'Alex Flannery',
		studentID: 2547089,
		studentSex: 'f',
		studentAssignments:[
			
		] // individual assignments
	} 
]





function seedDB(){

   Student.remove({}, function(err) { 
   	if(err){
         console.log(err);
      }else{
	   	console.log('Students Removed');
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
	   } // End else
	});

   Course.remove({}, function(err){    //the empty {} means it will remove all
      if(err){
         console.log(err);
      }else{
         console.log("Clearing All Courses")
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
               	});
                  // course.save()
               } //end else

         	}); //end course.create
         }); //end data.forEach
         console.log("Courses Seeded");
      } // end else
   }); //end course.remove

























   // This works, adds courses with proper info
   // Course.remove({}, function(err){    //the empty {} means it will remove all
   //    if(err){
   //       console.log(err);
   //    }else{
   //       console.log("Clearing All Courses")
   //       data.forEach(function(obj, i){
   //       	Course.create(obj, function(err, course){
   //       		if(err){
   //                console.log(err);
   //             }else{
   //                console.log(course)
   //                course.save()
   //             } //end else
   //       	}); //end course.create
   //       }); //end data.forEach
   //    } // end else
   // }); //end course.remove
    

} //End seedDB()
module.exports = seedDB;