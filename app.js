var express                     = require("express"),
    app                         = express(),
    bodyParser                  = require("body-parser"),
    methodOverride              = require('method-override'),
    Student                     = require("./models/student"),
    Assignment                  = require("./models/assignment"),
    seedDB                      = require("./seeds"),
    mongoose                    = require("mongoose");

mongoose.connect("mongodb://localhost/grade");

app.set("view engine", "ejs");
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));
seedDB();

// Index and show (students) route
app.get("/", function(req, res){
    Student.find({}, function(err, allStudents){
        if(err){
            console.log(err);
        }else{
            res.render("index", {students: allStudents});
        }
    });
});

// Create Route
app.post("/", function(req, res){
    //Get data from inputs
    var name = req.body.first + ' ' + req.body.last;
    var sex = req.body.sex;
    var id = req.body.id;
    // create new student and save to DB
    var newStudent = {studentName: name, studentSex: sex, studentID: id};
    Student.create(newStudent, function(err, newlyCreated){
        if(err){
            console.log(err);
        }else{
             res.redirect("/");
        }
    });
    //redirect back to index
});

// app.get("/student/:id", function(req, res){
//     Student.find({}, function(err, foundStudent){
//         if(err){
//             console.log(err)
//         }else{
//             res.render("student", {student: foundStudent});
//         }
//     });
// });



// app.listen(process.env.PORT, process.env.IP, function(){
//     console.log("Grade app running");
// });

app.listen(3000, function () {
  console.log('Grade App is running');
});
