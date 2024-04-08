import { Meteor } from 'meteor/meteor'
import React, { Fragment, useState } from 'react';
import { useTracker } from 'meteor/react-meteor-data'
import { TasksCollection } from '../db/TasksCollection.js';
import { Task } from './Task.jsx';
import { TaskForm } from './TaskForm.jsx';
import { LoginForm } from './LoginForm.jsx'


export const App = () => {
  const user = useTracker(() => Meteor.user())
  const [hideCompleted, setHideCompleted] = useState(false)

  const filters = { 
    user: user ? { userId: user._id } : {},
    userPendingTask: { isChecked: {$ne: true}, userId: user ? user._id: {} }
  }

  const tasks = useTracker(() => {
    if (!user) return [];
    return TasksCollection.find(hideCompleted ? filters.userPendingTask : filters.user, { sort: { createdAt: -1 } }).fetch()
  })

  const pendingTasksCount = useTracker(() => {
    if (!user) {
      return 0;
    }
    return TasksCollection.find(filters.userPendingTask).count()
  }
  );

  const toggleChecked = ({ _id, isChecked }) => {
    Meteor.call('tasks.setIsChecked', _id, !isChecked)
  }

  const logout = () => Meteor.logout();
  const deleteTask = ({ _id }) => Meteor.call('tasks.remove', _id)

  return (
    <div>
      {user
        ? <Fragment>
          <div onClick={logout}>
            {user.username || user.profile.name}
            {/* BUG? github username이 user.profile.name이 아니라 user.services.github.username에 있음*/}
          </div>
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
