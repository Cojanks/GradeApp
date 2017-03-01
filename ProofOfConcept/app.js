// =========== BACKEND ===========  
// ===============================  
// All backend calculations here
var databaseController = (function(){
	var Student = function(name, id){
		this.name = name;
		this.id = id;
		this.assignments = {};
		this.grade = 0;
	}

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



	// -----------------------------------------------
	// BACKEND RETURN STATEMENT
	return {
		addStudentToData: function(name, id){
			var inputName = name;
			var inputID  = id;
			//add to DB
			if(!data.students[id]){
				data.students[inputID] = new Student(inputName, inputID);
				return data.students[inputID];
			}else{
				console.log("A student with this id already exists!")
			}
		},
		checkAgainstDatabase: function(id){
			return data.students[id] !== undefined; 
		},
		testing: function(){
			console.log(data)
		}
	} // End dataController return
})(); 

	

// =========== UI ===========  
// ==========================
// All UI-related and DOM-related stuff here
var UIController = (function(){
	var DOMstrings = {	//create shortcuts to DOM objects so if anything needs changes in html, you just have to change it here.
		addStudentBtn: '.addStudent',
		studentName: '.student_name',
		studentID: '.student_id',
		nameInput: '.nameInput',
		idInput: '.idInput',
		studentList: '.studentList'
	};


	// -----------------------------------------------
	// UI RETURN STATEMENT
	return {
		getDOMstrings: function(){	//export DOM shortcuts to everywhere else
			return DOMstrings;
		},
		getInput: function(){ 	// Get input values from input fields
			return{
				name: $(DOMstrings.nameInput).val(),
				id: $(DOMstrings.idInput).val()
			}
		},
		addStudentToList: function(toAdd){
			var html, newHTML, element;
			//create HTML with placeholders
			html = "<div class='item' id='student-%num%'><div class='header student_name'>%name%</div><div class='student_id'>(%id%)</div><div class='right floated content'><div class='student_gradeAvg'><strong>%grade%</strong></div><button class='ui orange mini button' id='ShowDetail'>More Details</button></div></div>"
			//replace placeholders with new data - name, id
			newHTML = html.replace('%id%', toAdd.id).replace('%name%', toAdd.name).replace('%grade%', "--");
			// Insert into HTML
			$(DOMstrings.studentList).append(newHTML);
		},
		clearFields: function(){
			var fields, fieldsArr;
			$(DOMstrings.nameInput).val('');
			$(DOMstrings.idInput).val('');
		}
	} // End UIController return
})();

// ========== GLOBAL CONTROLLER ========== 
// ======================================= 
// Puts it all together.
var controller = (function(dataCtrl, UICtrl){
	var setupEventListeners = function(){	
		var DOM = UIController.getDOMstrings(); //import DOM strings variables
		$(DOM.addStudentBtn).click(addStudent);	
	};
	var addStudent = function(){	
		var input, newStudent;
		
		input = UIController.getInput();	// get input
		var exists = !databaseController.checkAgainstDatabase(input.id); //check if id already exists
		//Check to make sure user inputted correct values and that a duplicate id does not already exist
		if(input.name !== "" && input.id !== "" && exists){
		//add to database
			newStudent = databaseController.addStudentToData(input.name, input.id);
		//add to UI
			UICtrl.addStudentToList(newStudent);
		//clear fields
			UICtrl.clearFields();
		//(IF ADDED) update class percentages, class totals, update list of student grades on assignment page here
		} else{ 
			console.log("INCORRECT INPUT OR A CHILD WITH THIS ID ALREADY EXISTS") //ERROR MESSAGE <> REPLACE WITH ERROR FLASH
		} 
	} //end addStudent


	// -----------------------------------------------
	// GLOBAL RETURN STATEMENT
	return {
		init: function(){
			console.clear();
			console.log("App Started");
			setupEventListeners();
		}
	}
})(databaseController, UIController);

controller.init();
