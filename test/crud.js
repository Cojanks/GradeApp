var assert = require('assert');
var ClassPeriod = require('../models/class');
var Student = require('../models/student');
var Assignment = require('../models/assignment');


describe('Simple Create & Read:', () => { // 'describe' & 'it' are functions that are included in mocha
	let history, joe, mathHomework;

	beforeEach((done) => {
		const history = new ClassPeriod({ className: 'History', classNickname: 'hist', classDescription: 'Texas History Class'});
		const joe = new Student({ studentName: 'Joe', studentID: '78723', studentSex: 'm'});	
		const mathHomework = new Assignment({ assignmentName: 'Math Homework', assignmentDescription: '2+2=?'});
		
		Promise.all([history.save(), joe.save(), mathHomework.save()])
			.then(() => done());
	});
	it('Find  Class', (done) => {
		ClassPeriod.find({className: 'History'})
		.then((classes) => {
			// console.log(classes);
			//assert(classes[0]._id === history.id)
			done();
		});
	});
	it('Find  Student', (done) => {
		Student.find({studentName: 'Joe'})
		.then((students) => {
			// console.log(students);
			done();
		});
	});

	it('Find  Assignment', (done) => {
		Assignment.find({assignmentName: 'Math Homework'})
		.then((assignments) => {
			// console.log(assignments);
			done();
		});
	});
	
});