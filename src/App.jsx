import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Today from './components/Pages/Today';
import Important from './components/Pages/Important';
import Planned from './components/Pages/Planned';
import Tasks from './components/Pages/Tasks';
import SearchTasks from './components/Pages/SearchTasks';  
import Fullfiledtasks from './components/Pages/Fulfilled'
function App() {
  return (
    <Router>
      <Routes>
          <>
         
            <Route path="/" element={<><Navbar /><Today /></>} />
            <Route path="/important" element={<><Navbar /><Important /></>} />
            <Route path="/planned" element={<><Navbar /><Planned /></>} />
            <Route path="/tasks" element={<><Navbar /><Tasks /></>} />
            <Route path="/searchtasks" element={<><Navbar /><SearchTasks /></>} /> 
            <Route path="/fullfiledtasks" element={<><Navbar /><Fullfiledtasks /></>} /> 
          
          </>
        
      </Routes>
    </Router>
  );
}

export default App;
