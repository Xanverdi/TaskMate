import React from "react";
import { Link } from "react-router-dom";
import today from "./images/sun.png";
import important from "./images/star.png";
import planned from "./images/date.png";
import tasks from "./images/red-flag.png";
import './style.css'
import menu from './images/burgermenu.png';
const Sidebar = () => {
  return (
    <>
      <button
        className="btn btn-primary m-4 pr-2"
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target="#sidebarMenu"
        aria-controls="sidebarMenu"
      >
        <img src={menu} style={{width:'20px',height:'24px'}}/>
      </button>
      <div
        className="offcanvas offcanvas-start"
        data-bs-scroll="true"
        data-bs-backdrop="false"
        tabIndex="-1"
        id="sidebarMenu"
        aria-labelledby="sidebarMenuLabel"
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="sidebarMenuLabel">
            Menu
          </h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>

        <div className="offcanvas-body">
          <div className="d-flex flex-column">
            <Link className="sidebar-item" to="/today">
              <img src={today} className="icon" alt="Today Icon" /> Today
            </Link>
            <Link className="sidebar-item" to="/important">
              <img src={important} className="icon" alt="Important Icon" /> Important
            </Link>
            <Link className="sidebar-item" to="/planned">
              <img src={planned} className="icon" alt="Planned Icon" /> Planned
            </Link>
            <Link className="sidebar-item" to="/tasks">
              <img src={tasks} className="icon" alt="Tasks Icon" /> Tasks
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
