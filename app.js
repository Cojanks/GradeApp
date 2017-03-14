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
app.use(express.static(__dirname + '/public'));
seedDB();


// Index 
app.get("/", function(req, res){
    Course.find().populate('courseStudents').exec(function(err, courses){
        //This will populate the students in each class (meaning that information will be sent into the ejs file). res.send(courses) to see what I mean. 
        // THE INDEX IS CURRENTLY BROKEN BECAUSE OF THIS HOWEVER (much of the logic in the index is based off the OLD res.render): //res.render("index", {students: allStudents, courses: allCourses});
        // res.send(courses)
        res.render("index", {courses: courses});
    });
});

app.post("/course/new", function(req, res){
    var className = req.body.className;
    var classNickname = req.body.classNickname;
    var classDesc = req.body.classDesc;
    var newCourse = {courseName: className, courseDescription: classDesc, courseNickname: classNickname};
    console.log(newCourse)
    Course.create(newCourse, function(err, newlyCreatedCourse){
        if(err){
            console.log(err);
        }else{
            console.log(newlyCreatedCourse);
            res.redirect("/");
        };
    });
});

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










// Create student in class Route
app.post("/course/:id", function(req, res){
    //Get data from inputs
    var name = req.body.first + ' ' + req.body.last;
    var sex = req.body.sex;
    var id = req.body.inputid;
    // create new student and save to DB
    var newStudent = {studentName: name, studentSex: sex, studentID: id};

    Student.create(newStudent, function(err, newlyCreated){
        if(err){
            console.log(err);
        }else{
            res.send("Post request - add student to class")
             //res.redirect("/");
        }
    });
});

app.get("/coursestudent/:id", function(req, res){
    Student.findById(req.params.id, function(err, foundStudent){
        if(err){
            console.log(err);
        }else{
            res.render("student", {student: foundStudent});
        }
    });
});

app.listen(3000, function () {
  console.log('Grade App is running');
});
