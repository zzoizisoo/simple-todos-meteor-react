import { Meteor } from 'meteor/meteor'
import React, { Fragment, useState } from 'react';
import { useTracker } from 'meteor/react-meteor-data'
import { TasksCollection } from '../api/TasksCollection.js';
import { Task } from './Task.jsx';
import { TaskForm } from './TaskForm.jsx';
import { LoginForm } from './LoginForm.jsx'


export const App = () => {
  const user = useTracker(() => Meteor.user())
  const [hideCompleted, setHideCompleted] = useState(false)

  const pendingTasks = { isChecked: { $ne: true } }
  const pendingTasksCount = useTracker(() => TasksCollection.find(pendingTasks).count());
  const tasks = useTracker(() => TasksCollection.find(hideCompleted ? pendingTasks : {}, { sort: { createdAt: -1 } }).fetch())

  const toggleChecked = ({ _id, isChecked }) => {
    TasksCollection.update(_id, {
      $set: {
        isChecked: !isChecked
      }
    })
  }

  const deleteTask = ({ _id }) => TasksCollection.remove(_id)

  return (
    <div>
      {user
        ? <Fragment>
            <h1>TODO {pendingTasksCount ? `(${pendingTasksCount})` : ''}</h1>

            <TaskForm />
            
            <div className='filter'>
              <button onClick={() => setHideCompleted(!hideCompleted)}>
                {hideCompleted ? 'Show All' : 'Hide Completed'}
              </button>
            </div>

            <ul>
              {tasks.map(task => <Task key={task._id} task={task} onCheckboxClick={toggleChecked} onDeleteClick={deleteTask} />)}
            </ul>
          </Fragment>
        : <LoginForm />
      }


    </div>
  )
};
