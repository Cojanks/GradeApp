# Grade
--------



> Grade is an application for teachers to keep track of student grades, assignments and keep notes on particular subjects where students are struggling. Parents the ability to sign in and view their particular students grades on assignments, see the class syllabus and send messages to the teacher.


##Base Functionality

###Teacher:
- Keep track of different classes and the students within each period.
- Add/remove students.
- Quick list-view of class with students and their current total grade.
- More detailed look at individual student with a list of assignments with their grade. Ability to change these, add/remove assignments.
- Ability to look at particular assignment, notes and summary of assignment and list of students with their grade on it (updatable).

###Parent:
- Parents must first authenticate with application and can only see their particular student.
- See lists of assignment with their students grade on it.


###Future Functionality:
#####Teacher:
- Teacher can see class average grades as a whole and by assignment.
- Ability plan out percentage-based grading (50% of total grade: Tests. 30%: Homework, 20%: Final project, etc).
- Ability to export class data to excel/email/ etc (save database space over the years) as well as import from excel file.
- Ability to import assignments and save them.
- Email updates to parents when grades change.

#####Parent:
- See their childs grade in relation to class average.
- Chat/messenger ability for parents to send messages to teacher, asking about potential Extra Credit, subject problem-areas, etc).


----
## Technical

Node and Express Application using MongoDB.

Semantic UI, responsive (though the app is really meant to be seen in a browser on a desktop)

