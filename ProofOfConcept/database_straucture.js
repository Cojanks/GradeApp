var data = {
	students:{
		7788004: {
			studentName: 'Corey Jenkins',
			studentID: 7788004,
			studentAssignments:[
				{
					assignmentName: 'Math Homework 1',
					assignmantGrade: 90.00,
					assignmentID: 1
				},
				{
					assignmentName: 'Math Homework 2',
					assignmantGrade: 95.00,
					assignmentID: 1

				},
				{
					assignmentName: 'Math Homework 3',
					assignmantGrade: 87.00,
					assignmentID: 1
				}
			] // individual assignments
		}, // end individual student 
		4562201: {
			studentName: 'Dave Sweeney',
			studentID: 4562201, 
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
	}, // students
	assignments: {
		1:{	// The names for each of these objects will be used as the ID reference number/ID 
			assignmentName: 'Math Homework 1',
			assignmentDescription: 'Calculus',
			studentGrades: {	//uses student IDs
				7788004: 90.00,
				4562201: 80.00
			}
		},
		2: {
			assignmentName: 'Math Homework 2',
			assignmentDescription: 'Trig',
			studentGrades: {
				7788004: 95.00,
				4562201: 79.00
			}
		},
		3: {
			assignmentName: 'Math Homework 3',
			assignmentDescription: 'More Practice',
			studentGrades: {
				7788004: 87.00,
				4562201: 79.00
			}
		},
	} //
} // data

var Student = function(name, id){
		this.name = name;
		this.id = id;
		this.assignments = {};
	}

var addNewStudent = function(name, id){
	var inputName = name;
	var inputID  = id;
	data.students[inputID] = new Student(inputName, inputID);
}

var calculateGrade = function(id){
	var sum = 0;
	data.students[id].studentAssignments.forEach(function(curr){
		sum += curr.assignmantGrade;
	});
	return parseFloat(sum/data.students[id].studentAssignments.length).toFixed(2);
}







//Calculate total grade average. needs to be provided with student ID. This can be provided via a <student>.studentID




		<div class='item' id='student-%num%'>
			<div class='header student_name'>%name%</div>
			<div class='student_id'>(%id%)</div>
			<div class='right floated content'>
				<div class='student_gradeAvg'>
					<strong>%grade%</strong>
				</div>
				<button class='ui orange mini button' id='ShowDetail'>More Details</button>
			</div>
		</div>









<div class="studentInline"><div class="item" id="student-%num%"><div class="header student_name">%name%</div><div class="student_id">(%id%)</div><div class="right floated content"><div class="student_gradeAvg"><strong>%grade%</strong></div><button class="ui orange mini button" id="ShowDetail">More Details</button></div></div> <!-- end item --></div> <!-- end studentInline -->

















