***Getting averages (grade)
Looks like you will need to used MongoDB's Aggregation functions: https://docs.mongodb.com/manual/aggregation/

http://stackoverflow.com/questions/40323210/node-js-mongoose-calculations-arrays-populations
http://stackoverflow.com/questions/26810599/calculating-average-in-mongoose
http://stackoverflow.com/questions/27853105/how-to-get-a-rating-average-in-mongoose-node

http://stackoverflow.com/questions/7419969/how-do-i-define-methods-in-a-mongoose-model

https://docs.mongodb.com/manual/reference/operator/update/sort/

http://stackoverflow.com/questions/13067208/to-find-the-average-of-a-particular-type-in-mongoosejs

To do:
Set default for student averages using [ studentAverage: {type: Number, default: 0 } ] as well as set the setDefaultsOnInsert option: See more details at: http://mongoosejs.com/docs/defaults.html


Update* use a virtual:
As per https://www.udemy.com/the-complete-developers-guide-to-mongodb/learn/v4/t/lecture/6035574?start=0

UserSchema.virtual('totalAssignments').get(function (){
	 return this.assignments.length;
});

This is put in the model document but outside the schema.
Use this to collect all the grades from the student and then divide by assignments.length or something similar.


***Tabs:
http://stackoverflow.com/questions/21769214/using-the-tab-control-in-semantic-ui
http://stackoverflow.com/questions/23195009/semantic-ui-tab-and-javascript
http://stackoverflow.com/questions/36752213/semantic-ui-tab-history-on-reload
https://github.com/Semantic-Org/Semantic-UI/issues/609
https://www.sitepoint.com/community/t/same-tab-after-page-refresh/39684/9
 - Lots of sites are talking about going the AJAX route to save a state change to a variable.

 notes about req.params...:
 https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/1872246
