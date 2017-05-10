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
app.use('/stylesheets', express.static(__dirname + '/public/'));
seedDB.seedDB();
// seedDB.removeDataFromDB();

// Index
app.get("/", function(req, res){
    Course.find().populate({path: 'courseStudents', populate: {path: 'studentAssignments'}}).exec(function(err, courses){
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
        }
    });
});

//Create new Student within Course - POST
app.post("/course/:id/student/new", function(req,res){
    var name = req.body.first + ' ' + req.body.last;
    var sex = req.body.sex;
    var studentid = req.body.inputid;
    var average = 0;
    // create new student and save to DB
    var newStudent = {studentName: name, studentSex: sex, studentID: studentid, studentAverage: average};
    Course.findById(req.params.id, function(err, foundCourse){
        if(err){
            console.log(err);
        }else{
            Student.create(newStudent, function(err, newlyCreated){
                if(err){
                    console.log(err);
                }else{
                    foundCourse.courseStudents.push(newlyCreated);
                    res.redirect("/");
                }
            foundCourse.save();
            }); // end Student.findById
        }
    }); //end Course.findByID
});

// Show student - GET / SHOW -
app.get("/student/:id", function(req, res){
    Student.findById(req.params.id)
         .populate('studentAssignments')
         .exec(function(err, foundStudent){
            res.render("student", {student: foundStudent});
         });
});

//Create Assignment within Course
app.post("/course/:id/assignment/new", function(req, res){
    var courseOfStudent = req.params.id;
    var assignmentName = req.body.assignmentName;
    var assignmentDesc = req.body.assignmentDesc;
    var addToStudent_Id = req.body.addTo;
    var assignmentGrade = 0;
    var newAssignment = {assignmentName: assignmentName, assignmentDescription: assignmentDesc, assignmentGrade: assignmentGrade};

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
               // ORIGINAL CODE
               //  Assignment.create(newAssignment, function(err, newlyCreatedAssignment2){
               //      if(err){
               //          console.log(err);
               //      }else{
               //          newlyCreatedAssignment2.save();
               //          foundParticularCourse.courseStudents.forEach(function(obj){
               //              Student.findById(obj, function(err, foundStudentByID2){
               //                  foundStudentByID2.studentAssignments.push(newlyCreatedAssignment2);
               //                  foundStudentByID2.save();
               //              });
               //          });
               //      }
               //  }); //end assignment.create
               // END ORIGINAL CODE

               foundParticularCourse.courseStudents.forEach(function(obj){
                  Assignment.create(newAssignment, function(err, newlyCreatedAssignment2){
                     Student.findById(obj, function(err, foundStudentByID2){
                        newlyCreatedAssignment2.save();
                        foundStudentByID2.studentAssignments.push(newlyCreatedAssignment2);
                        foundStudentByID2.save();
                     });
                  });
               });

            }
        });//end course.find
        res.redirect("/");
    }
});

// Update assignment of student
app.put("/student/:id/:assignmentId", function(req, res){
   Student.findById(req.params.id).populate('studentAssignments').exec(function(err, foundStudent){
      Assignment.findByIdAndUpdate(req.params.assignmentId, {assignmentGrade: req.body.gradeInput}, function(err, updatedAssignment){
         if(err){
            conole.log(err);
        }else{
            res.redirect("/student/" + req.params.id);
        }
      });
   });
});

// Delete assignment of student
app.delete("/student/:id/:assignmentId", function(req, res){
   Student.findById(req.params.id).populate('studentAssignments').exec(function(err, foundStudent){
      res.send(foundStudent);
   });
});


app.listen(3000, function () {
  console.log('Grade App is running');
});
