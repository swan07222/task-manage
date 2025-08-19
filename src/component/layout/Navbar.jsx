import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <>
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark fixed-top">
        <div className="container-fluid">

          {/* Left side: Task Manager */}
          <button
            type="button"
            className="btn btn-outline-light fw-bold mb-0 me-3"
            onClick={() => navigate("/")}
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
                  className="btn btn-outline-light fw-normal mb-0"
                  onClick={() => navigate("/add")}
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

      {/* Hover and click effects CSS */}
      <style>{`
        .navbar .btn {
          transition: all 0.2s ease-in-out;
        }

        .navbar .btn:hover {
          transform: scale(1.05);
          box-shadow: 0 4px 10px rgba(0,0,0,0.2);
        }

        .navbar .btn:active {
          transform: scale(0.95);
        }

        /* Optional: smooth hover for navbar links */
        .navbar .nav-link:hover {
          color: #ffc107 !important; /* highlight color */
          transition: color 0.2s ease-in-out;
        }
      `}</style>
    </>
  );
};

export default Navbar;
