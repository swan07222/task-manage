import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = ({ searchTerm, setSearchTerm, statusFilter, setStatusFilter, categoryFilter, setCategoryFilter }) => {
  const navigate = useNavigate();

  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-dark fixed-top">
      <div className="container-fluid">

        <Link className="navbar-brand" to="/about">About</Link>

        <button className="navbar-toggler" type="button">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="mynavbar">
          <ul className="navbar-nav me-auto mb-2 mb-sm-0">

            <button 
              type="button"
              className="nav-link btn btn-link"
              onClick={() => navigate(`/add`)}
            >
              Add
            </button>

            {/* Status Filter */}
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">
                Filter by Status
              </a>
              <ul className="dropdown-menu">
                <li><button className="dropdown-item" onClick={() => setStatusFilter("all")}>All</button></li>
                <li><button className="dropdown-item" onClick={() => setStatusFilter("not started")}>Not started</button></li>
                <li><button className="dropdown-item" onClick={() => setStatusFilter("started")}>Started</button></li>
                <li><button className="dropdown-item" onClick={() => setStatusFilter("completed")}>Completed</button></li>
              </ul>
            </li>

            {/* Category Filter */}
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">
                Filter by Category
              </a>
              <ul className="dropdown-menu">
                <li><button className="dropdown-item" onClick={() => setCategoryFilter("all")}>All</button></li>
                <li><button className="dropdown-item" onClick={() => setCategoryFilter("work")}>Work</button></li>
                <li><button className="dropdown-item" onClick={() => setCategoryFilter("personal")}>Personal</button></li>
                <li><button className="dropdown-item" onClick={() => setCategoryFilter("learning")}>Learning</button></li>
              </ul>
            </li>
          </ul>

          {/* Search */}
          <form className="d-flex">
            <input
              className="form-control me-2"
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="btn btn-primary" type="button">Search</button>
          </form>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
