import React from 'react';
import { useTracker } from 'meteor/react-meteor-data'
import { TasksCollection } from '../api/TasksCollection.js';
import { Task } from './Task.jsx';
import { TaskForm } from './TaskForm.jsx';



export const App = () => {
  // const tasks = useTracker(()=> TasksCollection.find({}).fetch())
  const tasks = useTracker(() => TasksCollection.find({},{ sort: { createdAt: -1 }}).fetch())

  const toggleChecked = ({_id, isChecked}) =>{ 
    TasksCollection.update(_id, { 
      $set:{
        isChecked: !isChecked
      }
    })
  }

  return (
    <div>
      <h1>Welcome to Meteor!</h1>

      <TaskForm />

      <ul>
        {tasks.map(task => <Task key={task._id} task={task} onCheckboxClick={toggleChecked}/>)}
      </ul>

      {/* <Hello/>
      <Info/>
      */}
    </div>
  )
};
