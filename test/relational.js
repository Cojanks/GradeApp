var assert = require('assert');
var Student = require('../models/student');
var ClassPeriod = require('../models/class');

var Assignment = require('../models/assignment');

describe('Creating class with student with assignment:', () => { // 'describe' & 'it' are functions that are included in mocha
	let history, joe, mathHomework;

	beforeEach((done) => {
		const history = new ClassPeriod({ className: 'History', classNickname: 'hist', classDescription: 'Texas History Class'});
		const joe = new Student({ studentName: 'Joe', studentID: '78723', studentSex: 'm'});	
		const mathHomework = new Assignment({ assignmentName: 'Math Homework', assignmentDescription: '2+2=?'});	
		const mathHomework2 = new Assignment({ assignmentName: 'Math Homework', assignmentDescription: '2+2=?'});	

		joe.studentAssignments.push(mathHomework);
		history.classStudents.push(joe);
		Promise.all([history.save(), joe.save(), mathHomework.save()])
			.then(() => done());
	});


	it('Find  Class', (done) => {
		ClassPeriod.find({className: 'History'})
		// .populate({
		// 	path: 'classStudents'
		// 	})
		.then((classes) => {
			console.log(classes);
			//assert(classes[0]._id === history.id)
			done();
		});
	});
	
	
});