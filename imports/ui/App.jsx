import React, { useState } from 'react';
import { useTracker } from 'meteor/react-meteor-data'
import { TasksCollection } from '../api/TasksCollection.js';
import { Task } from './Task.jsx';
import { TaskForm } from './TaskForm.jsx';



export const App = () => {
  const [hideCompleted, setHideCompleted] = useState(false)

  const pendingTasks = {isChecked : {$ne: true}}
  const pendingTasksCount = useTracker(()=> TasksCollection.find(pendingTasks).count());
  const tasks = useTracker(() => TasksCollection.find(hideCompleted ? pendingTasks : {},{ sort: { createdAt: -1 }}).fetch())

  const toggleChecked = ({_id, isChecked}) =>{ 
    TasksCollection.update(_id, { 
      $set:{
        isChecked: !isChecked
      }
    })
  }

  const deleteTask = ({_id}) => TasksCollection.remove(_id)
  
  return (
    <div>
      <h1>TODO {pendingTasksCount ? `(${pendingTasksCount})` : ''}</h1>

      <TaskForm />
      <div className='filter'>
        <button onClick={()=>setHideCompleted(!hideCompleted)}>
          {hideCompleted ? 'Show All': 'Hide Completed'}
        </button>
      </div>

      <ul>
        {tasks.map(task => <Task key={task._id} task={task} onCheckboxClick={toggleChecked} onDeleteClick={deleteTask}/>)}
      </ul>

      {/* <Hello/>
      <Info/>
      */}
    </div>
  )
};
