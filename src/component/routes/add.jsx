import React, { useState } from "react";
import { connect } from "react-redux";
import { addTask } from "../../actions/taskactions";
import { useNavigate } from 'react-router-dom';

const Add = ({ dispatch }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    status: "Not started",
  });

  const navigate = useNavigate();

  const { title, description, category, status } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(addTask(formData));
    console.log("Task added:", formData);

    navigate('/');

    setFormData({
      title: "",
      description: "",
      category: "",
      status: "Not started",
    });
  };

  return (
    <div
      className="modal fade"
      id="add"
      tabIndex="-1"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Add Task</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <form onSubmit={onSubmit}>
              <input
                type="text"
                name="title"
                value={title}
                onChange={onChange}
                placeholder="Title"
                className="form-control mb-3"
                required
              />
              <textarea
                name="description"
                value={description}
                onChange={onChange}
                placeholder="Description"
                className="form-control mb-3"
                rows="4"
                required
              />
              <input
                type="text"
                name="category"
                value={category}
                onChange={onChange}
                placeholder="Category"
                className="form-control mb-3"
                required
              />
              <select
                name="status"
                value={status}
                onChange={onChange}
                className="form-select mb-3"
                required
              >
                <option>Not started</option>
                <option>Started</option>
                <option>Completed</option>
              </select>
              <button type="submit" className="btn btn-danger me-2">
                Add
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default connect()(Add);
