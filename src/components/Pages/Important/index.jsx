import React from 'react';
import { useSelector } from 'react-redux';
import TaskCard from '../../TaskCard';
import Layout from '../../Layout';
import './style.css'
const Important = () => {
  const tasks = useSelector((state) => state.tasks?.tasks || []);

  return (
    <>
    <div className='title'><h1>Important </h1></div>
      <Layout /> 
      <div className="container">
        <h4>Important Tasks</h4>

        {tasks.length > 0 ? (
          tasks.map((task) => {
            if (task.important) {
              return <TaskCard key={task.id} task={task} />;
            }
            return null;
          })
        ) : (
          <p>No important tasks!</p> 
        )}
      </div>
    </>
  );
};

export default Important;
