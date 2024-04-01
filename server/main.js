import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { TasksCollection } from '../imports/api/TasksCollection';

const SEED_USERNAME = 'jisuchoi';
const SEED_PASSWORD = 'password';

const insertTask = taskText => TasksCollection.insert({ text: taskText })


Meteor.startup(async () => {
  if(!Accounts.findUserByUsername(SEED_USERNAME)){ 
    Accounts.createUser({
      username: SEED_USERNAME,
      password: SEED_PASSWORD
    })
  }
  if(TasksCollection.find().count() ===0){ 
    [
      'First',
      'Second',
      'Third'
    ].forEach(insertTask)
  }
});
