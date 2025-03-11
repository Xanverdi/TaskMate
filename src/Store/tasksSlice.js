import { createSlice } from "@reduxjs/toolkit";

// LocalStorage'dan veri çekme (Persist için)
const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];

const initialState = {
  tasks: Array.isArray(savedTasks) ? savedTasks : [] // Eğer array değilse, boş array başlat
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action) => {
      if (!Array.isArray(state.tasks)) {
        state.tasks = [];  // Eğer array değilse, boş array başlat
      }
      state.tasks.push(action.payload);
      localStorage.setItem("tasks", JSON.stringify(state.tasks)); // LocalStorage güncelle
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
  },
});

export const { addTask, deleteTask, toggleComplete, toggleImportant } = tasksSlice.actions;
export default tasksSlice.reducer;
