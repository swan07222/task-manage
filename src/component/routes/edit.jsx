import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';

const Edit = ({ tasks, dispatch }) => {
  const { id } = useParams(); // get task index/id from URL
  const navigate = useNavigate();

  // Find the task by id
  const taskToEdit = tasks[id];

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Personal',
    status: 'No started',
  });

  useEffect(() => {
    if (taskToEdit) {
      setFormData(taskToEdit);
    }
  }, [taskToEdit]);

  const { title, description, category, status } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    // Dispatch your edit action
    dispatch({ type: 'EDIT_TASK', payload: { id, updatedTask: formData } });

    // Save to localStorage too if needed
    const tasksLocal = JSON.parse(localStorage.getItem('tasks')) || [];
    tasksLocal[id] = formData;
    localStorage.setItem('tasks', JSON.stringify(tasksLocal));

    navigate('/'); // go back to the landing page
  };

  if (!taskToEdit) {
    return <div>Task not found</div>;
  }

  return (
    <form onSubmit={onSubmit}>
      {/* Title */}
      <div className="mb-3 d-flex align-items-center">
        <label style={{ width: "150px" }}>Title</label>
        <input
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
          <option>No started</option>
          <option>Started</option>
          <option>Completed</option>
        </select>
      </div>

      {/* Buttons */}
      <div className="mb-3 d-flex align-items-center">
        <div style={{ width: "150px" }}></div> {/* Empty space to align with inputs */}
        <div>
          <button type="submit" className="btn btn-primary me-2">Save</button>
          <button type="button" className="btn btn-secondary" onClick={() => navigate('/')}>Cancel</button>
        </div>
      </div>
    </form>
  );
};

const mapStateToProps = (state) => ({
  tasks: state.task.tasks,
});

export default connect(mapStateToProps)(Edit);
