import React from 'react';
import { useSelector } from 'react-redux';
import TaskCard from '../../TaskCard';
import Layout from '../../Layout'
const Tasks = () => {
  const tasks = useSelector((state) => state.tasks?.tasks || []);

  return (
    <div className="container">
        
      <h1>All Tasks</h1>
      <Layout/>
      {tasks.length ? (
        tasks.map((task) => <TaskCard key={task.id} task={task} />)
      ) : (
        <p style={{ textAlign: "center", color: "gray", fontSize: "18px" }}>
          No tasks available!
        </p>
      )}
    </div>
  );
};

export default Tasks;
