import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchTerm } from '../../Store/uiSlice';
import settiniconwhite from './images/profileiconwhite.png';
import icon from './images/todo.png';
import './style.css';
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchTerm = useSelector((state) => state.ui.searchTerm);


  const [searchInput, setSearchInput] = useState(searchTerm || "");
  const [isRegistered, setIsRegistered] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    setIsRegistered(!!localStorage.getItem('isRegistered'));
    setIsLoggedIn(!!localStorage.getItem('isLoggedIn'));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isRegistered');
    localStorage.removeItem('isLoggedIn');
    navigate('/login'); 
  };

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(setSearchTerm(searchInput)); 
    if (searchInput) {
      navigate('/searchtasks');
    }
  };
  const clearSearch = () => {
    setSearchInput("");
    dispatch(setSearchTerm(""));
    navigate('/');
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <img className="icon me-2" src={icon} alt="Todo icon" />
          <span className='title-brand'>To Do</span>
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>

  
        <div className="collapse navbar-collapse" id="navbarNav">
          <div className="navbar-link d-flex">
            <Link className="sidebar-itemnav" to="/today">Today</Link>
            <Link className="sidebar-itemnav" to="/important">Important</Link>
            <Link className="sidebar-itemnav" to="/planned">Planned</Link>
            <Link className="sidebar-itemnav" to="/tasks">Tasks</Link>
          </div>

          <form className="d-flex ms-auto" role="search" onSubmit={handleSearch}>
  <input
    className="form-control"
    type="search"
    placeholder="Search"
    name="search" 
    id="search" 
    value={searchInput}
    onChange={(e) => setSearchInput(e.target.value)}
  />
  {searchInput && (
    <span className="clear-icon" onClick={clearSearch}>&#10005;</span> 
  )}
  <button className="btn btn-outline-success ms-1" type="submit">
    Search
  </button>
</form>
           {isLoggedIn && (
            <button type="button" className="btn btn-outline-danger ms-3" onClick={handleLogout}>
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
