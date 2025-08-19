import React, { useState } from "react";
import { connect } from "react-redux";
import { addTask } from "../../actions/taskactions";
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from "uuid";  

const Add = ({ dispatch }) => {
  const [formData, setFormData] = useState({
    title: "",    
    description: "",
    category: "Personal",
    status: "Not started",
  });

  const navigate = useNavigate();
  const { title, description, category, status } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();

    const taskWithId = {
      id: uuidv4(),   // ✅ Generate unique UUID
      ...formData,
    };

    dispatch(addTask(taskWithId));
    console.log("Task added:", taskWithId);

    navigate('/');

    setFormData({
      title: "",
      description: "",
      category: "Personal",
      status: "Not started",
    });
  };

  return (
    <div>
      <button
        type="button"
        className="btn btn-secondary position-fixed"
        style={{ top: "100px", left: "100px", zIndex: 1050 }}
        onClick={() => navigate('/')}
      >
        Back to home
      </button>
      <form onSubmit={onSubmit}>
        {/* Title */}
        <div className="mb-3 d-flex align-items-center">
          <label style={{ width: "150px" }}>Title</label>
          <input
            placeholder="title"
            type="text"
            name="title"
            value={title}
            onChange={onChange}
            className="form-control"
            style={{ width: "50%" }}
            required
          />
        </div>

        {/* Description */}
        <div className="mb-3 d-flex align-items-center">
          <label style={{ width: "150px" }}>Description</label>
          <textarea
            placeholder="description"
            name="description"
            value={description}
            onChange={onChange}
            className="form-control"
            style={{ width: "50%" }}
            rows="1"
            required
          />
        </div>

        {/* Category */}
        <div className="mb-3 d-flex align-items-center">
          <label style={{ width: "150px" }}>Category</label>
          <select
            name="category"
            value={category}
            onChange={onChange}
            className="form-select"
            style={{ width: "50%" }}
            required
          >
            <option>Personal</option>
            <option>Work</option>
            <option>Learning</option>
          </select>
        </div>

        {/* Status */}
        <div className="mb-3 d-flex align-items-center">
          <label style={{ width: "150px" }}>Status</label>
          <select
            name="status"
            value={status}
            onChange={onChange}
            className="form-select"
            style={{ width: "50%" }}
            required
          >
            <option>Not started</option>
            <option>Started</option>
            <option>Completed</option>
          </select>
        </div>

        {/* Buttons */}
        <div className="mb-3 d-flex align-items-center">
          <div style={{ width: "150px" }}></div>
          <div>
            <button type="submit" className="btn btn-primary me-2">Save</button>
            <button type="button" className="btn btn-secondary" onClick={() => navigate('/')}>Cancel</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default connect()(Add);
