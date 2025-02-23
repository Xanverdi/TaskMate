import React from 'react'
import { useSelector } from 'react-redux';
import TaskCard from '../../TaskCard'
import Layout from '../../Layout'
const Planned = () => {
    const tasks = useSelector((state) => state.tasks?.tasks || []);
    const plannedTasks = tasks.filter((task) => task.deadline !== null);
  
    return (
      <div className='container'>
        <h1>Planned Tasks</h1>
        <Layout/>
        <h3>Planned Tasks</h3>
        {plannedTasks.length > 0 ? (
          <div>
            {plannedTasks.map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
          </div>
        ) : (
          <div>No tasks</div>
        )}
      </div>
    );
  };
  

export default Planned