import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { editTask } from '../../actions/taskactions';

const Edit = ({ tasks, dispatch }) => {
  const { id } = useParams(); // get task id from URL
  const navigate = useNavigate();

  // Find the task by id
  const taskToEdit = tasks.find(t => t.id === id);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Personal',
    status: 'Not started',
  });

  // Populate form if task exists
  useEffect(() => {
    if (taskToEdit) {
      setFormData({
        title: taskToEdit.title || '',
        description: taskToEdit.description || '',
        category: taskToEdit.category || 'Personal',
        status: taskToEdit.status || 'Not started'
      });
    }
  }, [taskToEdit]);

  const { title, description, category, status } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();

    if (!taskToEdit) return;

    // Use action creator to update Redux and localStorage
    dispatch(editTask({ ...formData, id: taskToEdit.id }));


    navigate('/'); // Go back to landing page
  };

  if (!taskToEdit) {
    return <div>Task not found</div>;
  }

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
            style={{ width: "50%", height: "150px", resize: "vertical" }} // set height here
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

const mapStateToProps = state => ({
  tasks: state.task.tasks,
});

export default connect(mapStateToProps)(Edit);
