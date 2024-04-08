import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import {ServiceConfiguration} from 'meteor/service-configuration'
import { TasksCollection } from '../imports/db/TasksCollection';
import '/imports/api/tasksMethods';


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
})


ServiceConfiguration.configurations.upsert(
  { service: 'github' },
  {
    $set: {
      loginStyle: 'popup',
      clientId: '6a905e8808574f154ae7', // insert your clientId here
      secret: '8715e350bc626a6a6fc9b6afbdf88abba4f8a4a4', // insert your secret here
    },
  }
);