import React from 'react';

export const Task = ({ task, onCheckboxClick }) => {
  return <li>
      <input 
        type='checkbox'
        checked={!!task.isChecked}
        onClick={()=>onCheckboxClick(task)}
        readOnly
      />
      {task.text}
    </li>
};