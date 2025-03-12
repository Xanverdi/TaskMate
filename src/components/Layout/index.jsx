import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import calendar from "./images/calendar.png";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import TextField from "@mui/material/TextField";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateField } from "@mui/x-date-pickers/DateField";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';
import "./style.css";
import {
  addTask,
  toggleImportant,
  deleteTask,
  toggleComplete,
} from "../../Store/tasksSlice";
import TaskCard from "../TaskCard";
import { v4 as uuidv4 } from "uuid";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
const Layout = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks?.tasks || []);
  const [taskData, setTaskData] = useState({ title: "", text: "" });
  const [selectedDate, setSelectedDate] = useState(null);
  const [showSidebar, setShowSidebar] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  });
  
  const handleChange = (e) => {
    setTaskData({ ...taskData, [e.target.name]: e.target.value });
  };

  const handleDateChange = (newDate) => {
    setSelectedDate(newDate);
  };

  const createTask = () => {
    if (!taskData.title.trim() || !taskData.text.trim()) {
      return;
    }

    dispatch(
      addTask({
        id: uuidv4(),
        title: taskData.title,
        text: taskData.text,
        deadline: selectedDate ,
        important: false,
        completed: false,
      })
    );

    setTaskData({ title: "", text: "" });
    setSelectedDate(null);
  };

  const onOpenSidebar = (task) => {
    setSelectedTask(task);
    setShowSidebar(true);
  };

  const onCloseSidebar = () => {
    setSelectedTask(null);
    setShowSidebar(false);
  };

  const deleteCanvas = () => {
    setShowSidebar(false);
  };

  const handleToggleImportant = (taskId) => {
    if (!selectedTask) return;
    dispatch(toggleImportant(taskId));
    setSelectedTask((prevTask) => {
      if (prevTask && prevTask.id === taskId) {
        return {
          ...prevTask,
          important: !prevTask.important,
        };
      }
      return prevTask;
    });
  };
  const handleToggleCompleted =(taskId)=>{
    if(!selectedTask)return;
    dispatch(toggleComplete(taskId));
    setSelectedTask((prevTask)=>{
      if(prevTask && prevTask.id ===taskId){
        return {
          ...prevTask,
          completed: !prevTask.completed,
        };
        return prevTask;
      }
    })
  }
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
        style={{ marginTop: "20px" }}
      />
      <div className="function-todo">
        <div className="btn-group">
          <button
            className="btn btn-primary dropdown-toggle"
            data-bs-toggle="dropdown"
          >
            <img
              src={calendar}
              style={{ width: "20px", height: "20px" }}
              alt="calendar"
            />
          </button>
          <ul className="dropdown-menu date">
            <li>
              <button
                onClick={() => setSelectedDate(dayjs())}
                className="dropdown-item"
              >
                Today
              </button>
            </li>
            <li>
              <button
                onClick={() => setSelectedDate(dayjs().add(1, "day"))}
                className="dropdown-item"
              >
                Tomorrow
              </button>
            </li>
            <li>
              <button
                onClick={() => setSelectedDate(dayjs().add(7, "day"))}
                className="dropdown-item"
              >
                Next week
              </button>
            </li>
            <hr />
            <li>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateField
                  label="Pick a date"
                  value={selectedDate}
                  onChange={handleDateChange}
                />
              </LocalizationProvider>
            </li>
          </ul>
        </div>
        <button className="createbutton btn-primary" onClick={createTask}>
          Create
        </button>
      </div>

      {Array.isArray(tasks) &&
        tasks.map((task) => (
          <TaskCard key={task.id} task={task} onOpenSidebar={onOpenSidebar} />
        ))}

      <div
        className={`offcanvas offcanvas-end ${showSidebar ? "show" : ""}`}
        tabIndex="-1"
        id="offcanvasRight"
        aria-labelledby="offcanvasRightLabel"
        data-bs-backdrop="static"
        data-bs-scroll="true"
        style={{ position: "fixed", top: "0", height: "100vh", zIndex: "1050" }}
      >
        <div className="offcanvas-header">
          <button
            onClick={() => handleToggleCompleted(selectedTask?.id)}
            className="btn func check"
          >
            {selectedTask?.completed ? (
              <CheckCircleIcon sx={{ color: "#0d6efd" }} />
            ) : (
              <CheckCircleOutlinedIcon sx={{ color: "#0d6efd" }} />
            )}
          </button>
          <h5 className="selectedTask-title">
            {selectedTask ? selectedTask.title : "task secilmeyib"}
          </h5>
          <button
            onClick={() => handleToggleImportant(selectedTask?.id)}
            className="btn func"
          >
            {selectedTask?.important ? (
              <StarIcon sx={{ color: "#0d6efd" }} />
            ) : (
              <StarBorderIcon sx={{ color: "#0d6efd" }} />
            )}
          </button>
        </div>
        <div className="offcanvas-body">
          {selectedTask ? (
            <>
              <div className="desc-task">
                <DescriptionOutlinedIcon
                  sx={{
                    marginBottom: "0px",
                    marginRight: "20px",
                    color: "rgb(110, 110, 110)",
                  }}
                />
                <div>{selectedTask.text}</div>
              </div>
              <div className="deadline-canvas">
                <CalendarMonthOutlinedIcon
                  sx={{
                    marginRight: "20px",
                    marginBottom: "6px",
                    color: "rgb(110, 110, 110)",
                  }}
                />
                {selectedTask.deadline ? (
                  dayjs(selectedTask.deadline).format("DD-MM-YYYY")
                ) : (
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={["DateField"]}>
                      <DateField
                        label="add a date"
                        size="small"
                        sx={{ width: "100px", height: "56px" }}
                      />
                    </DemoContainer>
                  </LocalizationProvider>
                )}
              </div>
              <div className="canvas-footer">
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => onCloseSidebar()}
                  aria-label="Close"
                ></button>
                 <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    dispatch(deleteTask(selectedTask.id));
                    deleteCanvas();
                  }}
                  sx={{
                    minWidth: "auto",
                    padding: "0",
                    color: "grey",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <DeleteIcon />
                </Button>
              </div>
              <Button
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                startIcon={
                  <CloudUploadIcon sx={{ color: "rgb(110, 110, 110)" }} />
                }
                sx={{
                  backgroundColor: "white",
                  textTransform: "none",
                  width: "100%",
                  height: "50px",
                  marginTop: "4px",
                  border: "1px solid rgb(200, 200, 200)",
                  color: "black",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "flex-start",
                  boxShadow: "none",
                  "&:hover": {
                    boxShadow: "none",
                  },
                }}
              >
                Add a file
                <VisuallyHiddenInput
                  type="file"
                  onChange={(event) => console.log(event.target.files)}
                  multiple
                />
              </Button>
              <div className="note-area">
                  <div style={{marginBottom:'3px'}}>Add a note</div>
                  <textarea style={{width:'100%'}}/>
              </div>
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
