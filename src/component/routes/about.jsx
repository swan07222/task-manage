import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import './style.css'

const About = () => {
  return (
    <div className="container mt-5">
      <h1>About This App</h1>
      <p className="lead">
        This is a simple task management app built with React, Redux, and Bootstrap. 
        You can add, edit, delete, and filter tasks. All tasks are stored locally in your browser.
      </p>

      <h3 className="mt-4">Features:</h3>
      <ul className="list-group list-group-flush">
        <li className="list-group-item">Add new tasks with title, description, category, and status</li>
        <li className="list-group-item">Edit existing tasks</li>
        <li className="list-group-item">Delete tasks</li>
        <li className="list-group-item">Search and filter tasks by title, description, or category</li>
        <li className="list-group-item">Mark tasks as completed</li>
        <li className="list-group-item">Responsive design with Bootstrap</li>
      </ul>

      <p className="mt-4">
        This app is designed to help you quickly manage your tasks and keep track of your workflow.
      </p>
      <Link to="/">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Back to page
                </button>
              </Link>
    </div>
  );
};


About.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(About);
