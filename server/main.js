import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { TasksCollection } from '../imports/api/TasksCollection';

const SEED_USERNAME = 'jisuchoi';
const SEED_PASSWORD = 'password';

const insertTask = (taskText, user) => 
TasksCollection.insert({ 
  text: taskText, 
  userId: user._id,
  createdAt: new Date(), 
})


Meteor.startup(async () => {
  if(!Accounts.findUserByUsername(SEED_USERNAME)){ 
    Accounts.createUser({
      username: SEED_USERNAME,
      password: SEED_PASSWORD
    })
  }

  const user = Accounts.findUserByUsername(SEED_USERNAME)

  if(TasksCollection.find().count() ===0){ 
    [
      'First',
      'Second',
      'Third'
    ].forEach(taskText => insertTask(taskText, user))
  }
});
