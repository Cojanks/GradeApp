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
app.use(express.static("public"));
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




// app.listen(process.env.PORT, process.env.IP, function(){
//     console.log("Grade app running");
// });

app.listen(3000, function () {
  console.log('Grade App is running');
});
