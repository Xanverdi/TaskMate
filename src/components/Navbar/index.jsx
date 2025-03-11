import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchTerm } from '../../Store/uiSlice';
import logout from './images/logout.png';
import icon from './images/todo.png';
import './style.css';
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const searchTerm = useSelector((state) => state.ui.searchTerm);
  const [searchInput, setSearchInput] = useState(searchTerm || "");

  useEffect(() => {
    setSearchInput(searchTerm); // Redux state değişince input güncellensin
  }, [searchTerm]);

  const handleSearch = (e) => {
    e.preventDefault();
    
    if (!searchInput.trim()) return;

    dispatch(setSearchTerm(searchInput));

    if (window.location.pathname !== "/searchtasks") {
      navigate('/searchtasks');
    }
  };

  const clearSearch = () => {
    setSearchInput("");
    dispatch(setSearchTerm(""));

    if (window.location.pathname !== "/") {
      navigate('/');
    }
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <img className="icon me-2" src={icon} alt="Todo icon"/>
          <span className="title-brand">To Do</span>
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <div className="navbar-link d-flex">
            <Link className="sidebar-itemnav" to="/">Today</Link>
            <Link className="sidebar-itemnav" to="/important">Important</Link>
            <Link className="sidebar-itemnav" to="/planned">Planned</Link>
            <Link className="sidebar-itemnav" to="/tasks">Tasks</Link>
            <Link className="sidebar-itemnav" to="/fullfiledtasks">Fulfilled</Link>
          </div>
          <form className="d-flex ms-auto search-form" role="search" onSubmit={handleSearch}>
            <div className="search-input-wrapper">
              <input
                className="form-control search-input"
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
            </div>
            <button className="btn btn-outline-success ms-1" type="submit">
              Search
            </button>
          </form>
          <button type="button" className="btn btn-outline-danger ms-3">
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
