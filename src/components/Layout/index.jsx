import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import calendar from './images/calendar.png';
import TextField from '@mui/material/TextField';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateField } from '@mui/x-date-pickers/DateField';
import './style.css';
import { addTask } from '../../Store/tasksSlice';
import TaskCard from '../TaskCard';
import { v4 as uuidv4 } from 'uuid';

const Layout = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks?.tasks || []);
  const [taskData, setTaskData] = useState({ title: '', text: '' });
  const [selectedDate, setSelectedDate] = useState(null); 
  const [showModal, setShowModal] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const handleChange = (e) => {
    setTaskData({ ...taskData, [e.target.name]: e.target.value });
  };

  const handleDateChange = (newDate) => {
    setSelectedDate(newDate);
  };

  const createTask = () => {
    if (!taskData.title.trim() || !taskData.text.trim()) {
      setShowModal(true);
      return;
    }

    const newTask = {
      id: uuidv4(),
      ...taskData,
      deadline: selectedDate ? selectedDate.format('YYYY-MM-DD') : null, 
      important: false 
    };

    dispatch(addTask(newTask));
    setTaskData({ title: '', text: '' });
    setSelectedDate(null);
  };

  const onOpenSidebar = (task) => {
    setSelectedTask(task);
    setShowSidebar(true);
  };

  return (
    <div className="container">
      <div className="Title-container">Add a task</div>
      

      <TextField
        label="Title"
        variant="standard"
        color="primary"
        className="tittle"
        onChange={handleChange}
        value={taskData.title}
        name="title"
      />
      <TextField
        label="Add a description"
        variant="standard"
        color="primary"
        className="tittle"
        onChange={handleChange}
        value={taskData.text}
        name="text"
        style={{ marginTop: '20px' }}
      />
      <div className="function-todo">
  <div className="btn-group">
    <button className="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown">
      <img src={calendar} style={{ width: '20px', height: '20px' }} alt="calendar" />
    </button>
    <ul className="dropdown-menu date">
      <li>
        <button onClick={() => setSelectedDate(dayjs())} className="dropdown-item">
          Today
        </button>
      </li>
      <li>
        <button onClick={() => setSelectedDate(dayjs().add(1, 'day'))} className="dropdown-item">
          Tomorrow
        </button>
      </li>
      <li>
        <button onClick={() => setSelectedDate(dayjs().add(7, 'day'))} className="dropdown-item">
          Next week
        </button>
      </li>
      <hr />
      <li>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateField label="Pick a date" value={selectedDate} onChange={handleDateChange} />
        </LocalizationProvider>
      </li>
    </ul>
  </div>

  <button className="createbutton  btn-primary" onClick={createTask}>Create</button>
</div>

      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} onOpenSidebar={onOpenSidebar} />
      ))}

      <div className={`offcanvas offcanvas-end ${showSidebar ? "show" : ""}`} 
          tabIndex="-1" 
          id="offcanvasRight" 
          aria-labelledby="offcanvasRightLabel"
          data-bs-backdrop="static" 
          data-bs-scroll="true"
          style={{ position: "fixed", top: "0", height: "100vh", zIndex: "1050" }}
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasRightLabel">Task Details</h5>
          <button type="button" className="btn-close" onClick={() => setShowSidebar(false)} aria-label="Close"></button>
        </div>
        <div className="offcanvas-body">
          {selectedTask ? (
            <>
              <h5>Task title:</h5>
              <p>{selectedTask.title}</p>
              <h5>Task description:</h5>
              <p>{selectedTask.text}</p>
              <p>
                <h5>Deadline:</h5> {selectedTask.deadline ? dayjs(selectedTask.deadline).format("DD-MM-YYYY") : "No Deadline"}
              </p>
              <button className={`btn func ${tasks.important ? "btn-warning" : "btn-notimportant"}`} onClick={(e) => { e.stopPropagation(); dispatch(toggleImportant(tasks.id)); }}>
           remove
          </button>
            </>
          ) : (
            <p>No Task Selected</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Layout;
