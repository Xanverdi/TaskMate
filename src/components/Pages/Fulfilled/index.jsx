import React from 'react'
import { useSelector } from 'react-redux'
import './style.css'
import TaskCard from '../../TaskCard';
import Layout from '../../Layout';
const index = () => {
  const tasks =useSelector((state)=>state.tasks?.tasks ||[])
  return (
   <>
    <Layout /> 
    <div className='title'><h1>Fullfiled tasks</h1></div>
    <div className="container">

        {tasks.length > 0 ? (
          tasks.map((task) => {
            if (task.completed) {
              return <TaskCard key={task.id} task={task} />;
            }
            return null;
          })
        ) : (
          <p>No important tasks!</p> 
        )}
      </div>
   </>
  )
}

export default index