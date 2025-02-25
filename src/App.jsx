import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Today from './components/Pages/Today';
import Important from './components/Pages/Important';
import Planned from './components/Pages/Planned';
import Tasks from './components/Pages/Tasks';
import LoginForm from './components/Pages/Login';
import RegisterForm from './components/Pages/Register';
import SearchTasks from './components/Pages/SearchTasks';  
function App() {
  /*const [isLoggedIn, setIsLoggedIn] = useState(true);
  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn');
    setIsLoggedIn(!!loggedIn);
  }, []);*/

  return (
    <Router>
      <Routes>
       {/* <Route path="/login" element={<LoginForm setIsLoggedIn={setIsLoggedIn} />} />*/}
       {/*  <Route path="/register" element={<RegisterForm />} />*/}
                 (
          <>
            <Route path="/" element={<><Navbar /><Today /></>} />
            <Route path="/important" element={<><Navbar /><Important /></>} />
            <Route path="/planned" element={<><Navbar /><Planned /></>} />
            <Route path="/tasks" element={<><Navbar /><Tasks /></>} />
            <Route path="/searchtasks" element={<><Navbar /><SearchTasks /></>} /> 
            <Route path="*" element={<Navigate to="/" />} />
          </>
        ) : (
          <Route path="*" element={<Navigate to="/login" />} />
        )
      </Routes>
    </Router>
  );
}

export default App;
