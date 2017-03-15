var express         = require("express"),
    app             = express(),
    bodyParser      = require("body-parser"),
    methodOverride  = require('method-override'),
    Student         = require("./models/student"),
    Course          = require("./models/course"),
    Assignment      = require("./models/assignment"),
    seedDB          = require("./seeds"),
    favicon         = require('serve-favicon'),
    path            = require('path'),
    mongoose        = require("mongoose");

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
mongoose.connect("mongodb://localhost/grade");
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method")); 
app.use(express.static(__dirname + '/public/'));
seedDB.seedDB();
//seedDB.removeDataFromDB();

// Index 
app.get("/", function(req, res){
    Course.find().populate('courseStudents').exec(function(err, courses){
        //This will populate the students in each class (meaning that information will be sent into the ejs file). res.send(courses) to see what I mean. 
        // THE INDEX IS CURRENTLY BROKEN BECAUSE OF THIS HOWEVER (much of the logic in the index is based off the OLD res.render): //res.render("index", {students: allStudents, courses: allCourses});
        // res.send(courses)
        res.render("index", {courses: courses});
    });
});

//Create new course - POST
app.post("/course/new", function(req, res){
    var className = req.body.className;
    var classNickname = req.body.classNickname;
    var classDesc = req.body.classDesc;
    var newCourse = {courseName: className, courseDescription: classDesc, courseNickname: classNickname};
    Course.create(newCourse, function(err, newlyCreatedCourse){
        if(err){
            console.log(err);
        }else{
            res.redirect("/");
        };
    });
});

//Create new Student within Course - POST
app.post("/course/:id/student/new", function(req,res){
    var name = req.body.first + ' ' + req.body.last;
    var sex = req.body.sex;
    var studentid = req.body.inputid;
    // create new student and save to DB
    var newStudent = {studentName: name, studentSex: sex, studentID: studentid};
    Course.findById(req.params.id, function(err, foundCourse){
        if(err){
            console.log(err)
        }else{
            Student.create(newStudent, function(err, newlyCreated){
                if(err){
                    console.log(err);
                }else{
                    foundCourse.courseStudents.push(newlyCreated);
                    res.redirect("/");
                }
            foundCourse.save()
            }); // end Student.findById
        }
    }) //end Course.findByID    
});

//Create Assignment within Course
app.post("/course/:id/assignment/new", function(req, res){
    var courseOfStudent = req.params.id
    var assignmentName = req.body.assignmentName;
    var assignmentDesc = req.body.assignmentDesc;
    var addToStudent_Id = req.body.addTo;
    var newAssignment = {assignmentName: assignmentName, assignmentDescription: assignmentDesc};

    if(addToStudent_Id !== "all"){
        Student.findById(addToStudent_Id, function(err, foundStudentByID){
            if(err){
            console.log(err);
            }else{
                Assignment.create(newAssignment, function(err, newlyCreatedAssignment){
                    if(err){
                        console.log(err);
                    }else{
                        newlyCreatedAssignment.save();
                        foundStudentByID.studentAssignments.push(newlyCreatedAssignment);
                        foundStudentByID.save();
                    }
                }); // end assignment.create  
            }           
        }); // end student.findbyid
        res.redirect("/");
    }else{
        Course.findById(courseOfStudent, function(err, foundParticularCourse){
            if(err){
                console.log(err);
            }else{
                Assignment.create(newAssignment, function(err, newlyCreatedAssignment2){
                    if(err){
                        console.log(err);
                    }else{
                        newlyCreatedAssignment2.save();
                        foundParticularCourse.courseStudents.forEach(function(obj){
                            Student.findById(obj, function(err, foundStudentByID2){
                                foundStudentByID2.studentAssignments.push(newlyCreatedAssignment2);
                                foundStudentByID2.save();
                            })
                        });
                    }
                }); //end assignment.create
            }
        });//end course.find
        res.redirect("/");
    };
});

// Show student - GET / SHOW - **NOT WORKING CURRENTLY**
app.get("/student/:id", function(req, res){
    Student.findById(req.params.id).populate('studentAssignments').exec(function(err, foundStudent){
        res.render("student", {student: foundStudent});
    });
});

app.listen(3000, function () {
  console.log('Grade App is running');
});
