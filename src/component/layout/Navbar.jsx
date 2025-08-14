import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-dark fixed-top">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">Logo</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mynavbar">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="mynavbar">
          <ul className="navbar-nav me-auto mb-2 mb-sm-0">
            <li className="nav-item">
              <a className="nav-link" href="#">Add</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Edit</a>
            </li>
          </ul>
          <form className="d-flex">
            <input className="form-control me-2" type="text" placeholder="Search"/>
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
