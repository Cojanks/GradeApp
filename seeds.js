var mongoose = require("mongoose");
var Student = require("./models/student");
var Assignment = require("./models/assignment");

var data = {
	students:{
		7788004: {
			studentName: 'Cade Johnston',
			studentID: 7788004,
			studentSex: 'm',
			studentAssignments:[
				{
					assignmentName: 'Math Homework 1',
					assignmantGrade: 90.00,
					assignmentID: 1
				},
				{
					assignmentName: 'Math Homework 2',
					assignmantGrade: 95.00,
					assignmentID: 2

				},
				{
					assignmentName: 'Math Homework 3',
					assignmantGrade: 87.00,
					assignmentID: 3
				}
			] // individual assignments
		}, // end individual student
		4562201: {
			studentName: 'Dave Schwifty',
			studentID: 4562201,
			studentSex: 'm',
			studentAssignments:[
				{
					assignmentName: 'Math Homework 1',
					assignmantGrade: 80.00,
					assignmentID: 1
				},
				{
					assignmentName: 'Math Homework 2',
					assignmantGrade: 79.00,
					assignmentID: 1
				},
				{
					assignmentName: 'Math Homework 3',
					assignmantGrade: 87.00,
					assignmentID: 1
				}
			] // individual assignments
		}, // end individual student
			765812: {
			studentName: 'Mark Donalds',
			studentID: 765812,
			studentSex: 'm',
			studentAssignments:[
				{
					assignmentName: 'Math Homework 1',
					assignmantGrade: 80.00,
					assignmentID: 1
				},
				{
					assignmentName: 'Math Homework 2',
					assignmantGrade: 75.00,
					assignmentID: 2

				},
				{
					assignmentName: 'Math Homework 3',
					assignmantGrade: 77.00,
					assignmentID: 3
				}
			] // individual assignments
		}, // end individual student
		7688831: {
			studentName: 'Maia Harity',
			studentID: 7688831,
			studentSex: 'f',
			studentAssignments:[
				{
					assignmentName: 'Math Homework 1',
					assignmantGrade: 93.00,
					assignmentID: 1
				},
				{
					assignmentName: 'Math Homework 2',
					assignmantGrade: 96.00,
					assignmentID: 2

				},
				{
					assignmentName: 'Math Homework 3',
					assignmantGrade: 100.00,
					assignmentID: 3
				}
			] // individual assignments
		}
	}, // students
	assignments: {
		1:{	// The names for each of these objects will be used as the ID reference number/ID
			assignmentName: 'Math Homework 1',
			assignmentDescription: 'Calculus',
			studentGrades: {	//uses student IDs
				7788004: 90.00,
				4562201: 80.00,
				765812: 80.00,
				7688831: 93.00
			}
		},
		2: {
			assignmentName: 'Math Homework 2',
			assignmentDescription: 'Trig',
			studentGrades: {
				7788004: 95.00,
				4562201: 79.00,
				765812: 75.00,
				7688831: 96.00
			}
		},
		3: {
			assignmentName: 'Math Homework 3',
			assignmentDescription: 'More Practice',
			studentGrades: {
				7788004: 87.00,
				4562201: 79.00,
				765812: 77.00,
				7688831: 100.00
			}
		},
	} // assignments
}; // data

function seedDB(){
    //remove all students
    Student.remove({}, function(err){    //the empty {} means it will remove all
        if(err){
            console.log(err);
        }else{
            console.log("Removed Students");
            //iterate through seed data
            for (var prop in data.students) {	// This for-loop is due to the nature of data.students being an object of objects
            	//add data to mongoose DB
            	Student.create(data.students[prop], function (err){
            		if(err){ console.log(err) }
            	});
            } // end for (prop in data.students)
            // console.log(data.students); // Used for testing
        }
    }); //end Student.remove

    Assignment.remove({}, function(err){
    	if(err){
    		console.log(err);
    	}else{
    		console.log("Removed Assignments");
    		for (var prop in data.assignments) {
    			Assignment.create(data.assignments[prop], function(err){
    				if(err){ console.log(err) }
    			});
    		} //end for for(prop in data.assignments)
            // console.log(data.assignments); // Used for testing
    	}
    }); //end assignment.remove
}
module.exports = seedDB;
