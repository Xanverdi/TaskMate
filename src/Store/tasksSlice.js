import { createSlice } from "@reduxjs/toolkit";
const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
const uploadedFiles=JSON.parse(localStorage.getItem("files")) || [];
const addNotes =JSON.parse(localStorage.getItem("notes")) || [];
const initialState = {
  tasks: Array.isArray(savedTasks) ? savedTasks : [] ,
  files: Array.isArray(uploadedFiles) ? uploadedFiles: [],
  notes: Array.isArray(addNotes) ? addNotes: []
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action) => {
      if (!Array.isArray(state.tasks)) {
        state.tasks = []; 
      }
      state.tasks.push(action.payload);
      localStorage.setItem("tasks", JSON.stringify(state.tasks));
    },

    deleteTask: (state, action) => {
      if (!Array.isArray(state.tasks)) {
        state.tasks = [];
        return;
      }
      state.tasks = state.tasks.filter(task => task.id !== action.payload);
      localStorage.setItem("tasks", JSON.stringify(state.tasks));
    },

    toggleComplete: (state, action) => {
      if (!Array.isArray(state.tasks)) {
        state.tasks = [];
        return;
      }
      const task = state.tasks.find(task => task.id === action.payload);
      if (task) {
        task.completed = !task.completed;
        localStorage.setItem("tasks", JSON.stringify(state.tasks));
      }
    },

    toggleImportant: (state, action) => {
      if (!Array.isArray(state.tasks)) {
        state.tasks = [];
        return;
      }
      const task = state.tasks.find(task => task.id === action.payload);
      if (task) {
        task.important = !task.important;
        localStorage.setItem("tasks", JSON.stringify(state.tasks));
      }
    },
    taskUpdateDeadline: (state,action)=>{
      const {id,deadline}=action.payload;
      const task = state.tasks.find((t)=>t.id== id);
      if(task){
        task.deadline=deadline;
      }
    },
    addFile :(state,action)=>{
     if(!state.files){
      state.files = [];
     }
     state.files.push(...action.payload);
     localStorage.setItem("files", JSON.stringify(state.files));
    },updateNote: (state, action) => {
      const { id, note } = action.payload;
      const task = state.tasks.find((task) => task.id === id);
      if (task) {
        task.note = note;
        localStorage.setItem("tasks", JSON.stringify(state.tasks));
      }
    },
    deleteFile: (state, action) => {
      state.files = state.files.filter(file => file.id !== action.payload);
      localStorage.setItem("files", JSON.stringify(state.files)); 
    }
  },
});

export const { addTask, deleteTask, toggleComplete, toggleImportant, taskUpdateDeadline,addFile,deleteFile,updateNote} = tasksSlice.actions;
export default tasksSlice.reducer;
