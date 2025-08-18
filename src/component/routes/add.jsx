import React, { useState } from "react";
import { connect } from "react-redux";
import { addTask } from "../../actions/taskactions";
import { Link, useNavigate } from 'react-router-dom';

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
    <form onSubmit={onSubmit}>
    <div className="mb-3">
      <label>Title</label>
      <input
        type="text"
        name="title"
        value={title}
        onChange={onChange}
        className="form-control"
        required
      />
    </div>
    <div className="mb-3">
      <label>Description</label>
      <textarea
        name="description"
        value={description}
        onChange={onChange}
        className="form-control"
        rows="4"
        required
      />
    </div>
    <select
      name="category"
      value={category}
      onChange={onChange}
      className="form-select mb-3"
      required
    >
      <option>Personal</option>
      <option>Work</option>
      <option>Learning</option>
    </select>

    <div className="mb-3">
      <label>Status</label>
      <select
        name="status"
        value={status}
        onChange={onChange}
        className="form-select"
        required
      >
        <option>No started</option>
        <option>Started</option>
        <option>Completed</option>
      </select>
    </div>
    <button type="submit" className="btn btn-primary me-2">Save</button>
    <button type="button" className="btn btn-secondary" onClick={() => navigate('/')}>Cancel</button>
  </form>
  );
};

export default connect()(Add);
