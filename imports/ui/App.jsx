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

  const pendingTasksFilter = { isChecked: { $ne: true } }
  const userFilter = user ? { userId: user._id } : {}
  const pendingOnlyFilter = { ...pendingTasksFilter, ...userFilter };



  const tasks = useTracker(() => {
    if (!user) return [];
    return TasksCollection.find(hideCompleted ? pendingOnlyFilter : userFilter, { sort: { createdAt: -1 } }).fetch()
  })

  const pendingTasksCount = useTracker(() => {
    if (!user) {
      return 0;
    }
    return TasksCollection.find(pendingOnlyFilter).count()
  }
  );

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

          <TaskForm user={user} />

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
