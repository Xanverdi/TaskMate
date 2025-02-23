import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setTheme, setSearchTerm } from '../../Store/uiSlice';
import settiniconwhite from './images/profileiconwhite.png'
import icon from './images/todo.png';
import './style.css';
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isRegistered, setIsRegistered] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);  
  const theme = useSelector((state) => state.ui.theme);
  const dispatch = useDispatch();
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    const registered = localStorage.getItem('isRegistered');
    const loggedIn = localStorage.getItem('isLoggedIn');
    setIsRegistered(!!registered);
    setIsLoggedIn(!!loggedIn);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isRegistered');
    localStorage.removeItem('isLoggedIn');  
    window.location.reload(); 
  };

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(setSearchTerm(searchInput));
  };

  const clearSearch = () => {
    setSearchInput("");
    dispatch(setSearchTerm(""));
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <div className="navbar-brand d-flex align-items-center">
            <img className="icon me-2" src={icon} alt="Todo icon" />
            <span>To Do</span>
          </div>
          <div className="navbar-link d-flex">
            <Link className="sidebar-item" to="/today">
             <span>Today</span>
            </Link>
            <Link className="sidebar-item" to="/important">
              <span>Important</span>
            </Link>
            <Link className="sidebar-item" to="/planned">
              <span>Planned</span>
            </Link>
            <Link className="sidebar-item" to="/tasks">
              <span>Tasks</span>
            </Link>
          </div>
          <div className="collapse navbar-collapse">
            <form className="d-flex" role="search" onSubmit={handleSearch}>
              <input
                className="form-control"
                type="search"
                placeholder="Search"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}  
              />
              <button className="btn btn-outline-success ms-1" type="submit">Search</button>
              {searchInput && (
                <button
                  type="button"
                  className="btn btn-outline-danger ms-1"
                  onClick={clearSearch}
                >
                  Clear
                </button>
              )}
            </form>
          </div>
          {isLoggedIn && (
            <button type="button" className="btn btn-outline-danger" onClick={handleLogout}>
              Logout
            </button>
          )}

          <button type="button" className="btn btn-outline-success py-2">
            <img className="profiliconwhite" src={settiniconwhite} alt="Settings Icon" />
          </button>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
