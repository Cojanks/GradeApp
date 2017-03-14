const mongoose = require('mongoose');

mongoose.Promise = Promise;

// before((done) => {
	mongoose.connect('mongodb://localhost/grade');
	mongoose.connection
		.once('open', () => console.log("Good to go!"))
		.on('error', (error) => {
			console.warn('Warning', error);
		});

// });

beforeEach((done) => {	//cleans up db before each test (beforeEach... get it?) 
	// mongoose.connection.collections.classes.drop();
	// done();
	const { classes, students, assignments } = mongoose.connection.collections;
	classes.drop(() =>{
// 			// Mocha doesnt have any defaults to believe that processes are asynchronous. 
// 			// We have to establish this using done() which will give each process a pause before starting the next process
		students.drop(() => {
			assignments.drop(() => {
				done(); //this is a mocha provided function that we passing into the beforeEach()
			});
		});	
	});
});