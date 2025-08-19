import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-dark fixed-top">
      <div className="container-fluid">

        {/* Left side: Task Manager */}
        <button
          type="button"
          className="btn btn-link text-white fw-bold mb-0"
          onClick={() => navigate("/")}
          style={{ textDecoration: 'none' }}
        >
          Task Manager
        </button>

        {/* Navbar toggler for mobile */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mynavbar"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Right side: Add and About */}
        <div className="collapse navbar-collapse justify-content-end" id="mynavbar">
          <ul className="navbar-nav mb-2 mb-sm-0">

            <li className="nav-item me-2">
              <button 
                type="button"
                className="nav-link btn btn-link text-white fw-normal mb-0"
                onClick={() => navigate("/add")}
                style={{ textDecoration: 'none' }}
              >
                Add
              </button>
            </li>

            <li className="nav-item">
              <Link 
                className="nav-link text-white fw-normal mb-0" 
                to="/about"
                style={{ textDecoration: 'none' }}
              >
                About
              </Link>
            </li>

          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
