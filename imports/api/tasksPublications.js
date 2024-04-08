import { Meteor } from 'meteor/meteor'
import { TasksCollection } from '../db/TasksCollection'

// registers a publication named tasks
Meteor.publish('tasks', function publishTasks(){
    return TasksCollection.find({userId: this.userId})
})