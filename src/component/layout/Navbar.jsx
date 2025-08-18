import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from "react-redux";

const Navbar = ({ searchTerm, setSearchTerm }) => {
  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-dark fixed-top">
      <div className="container-fluid">
        {/* Use Link directly, no nested <a> */}
        <Link className="navbar-brand" to="/about">
          Logo
        </Link>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mynavbar">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="mynavbar">
          <ul className="navbar-nav me-auto mb-2 mb-sm-0">

            {/* Add task button */}
            <Link to="/add">
              <li className="nav-item">
                <button 
                  type="button" 
                  className="nav-link btn btn-link" 
                  data-bs-toggle="modal" 
                  data-bs-target="#add"
                >
                  Add
                </button>
              </li>
            </Link>

            {/* Dropdown */}
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">
                Filter by status
              </a>
              <ul className="dropdown-menu">
                <li><a className="dropdown-item" href="#">Link</a></li>
                <li><a className="dropdown-item" href="#">Another link</a></li>
                <li><a className="dropdown-item" href="#">A third link</a></li>
              </ul>
            </li>
          </ul>

          {/* Search form */}
          <form className="d-flex">
            <input className="form-control me-2" type="text" placeholder="Search" onChange={(e) => setSearchTerm(e.target.value)} />
            <button className="btn btn-primary" type="button">Search</button>
          </form>
        </div>
      </div>
    </nav>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(Navbar);