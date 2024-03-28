import { Meteor } from 'meteor/meteor';
import { TasksCollection } from '../imports/api/TasksCollection';

const insertTask = taskText => TasksCollection.insert({ text: taskText })


Meteor.startup(async () => {
  if(TasksCollection.find().count() ===0){ 
    [
      'First',
      'Second',
      'Third'
    ].forEach(insertTask)
  }
});
