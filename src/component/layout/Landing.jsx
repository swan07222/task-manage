import React, { useEffect } from "react";
import { connect } from "react-redux";
import { showTasks, deleteTask } from "../../actions/taskactions";
import { useNavigate } from 'react-router-dom';

const Landing = ({ tasks, dispatch, searchTerm, statusFilter, categoryFilter }) => {
  useEffect(() => {
    dispatch(showTasks());
  }, [dispatch]);

  const navigate = useNavigate();

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      dispatch(deleteTask(id));
    }
  };

  const filteredTasks = (tasks || []).filter(task => {
    const term = (searchTerm || "").toLowerCase();
    const status = (statusFilter || "all").toLowerCase();
    const category = (categoryFilter || "all").toLowerCase();

    const matchesSearch =
      (task.title || "").toLowerCase().includes(term) ||
      (task.description || "").toLowerCase().includes(term) ||
      (task.category || "").toLowerCase().includes(term);

    const matchesStatus =
      status === "all" ? true : (task.status || "").toLowerCase() === status;

    const matchesCategory =
      category === "all" ? true : (task.category || "").toLowerCase() === category;

    return matchesSearch && matchesStatus && matchesCategory;
  });

  return (
    <div className="container mt-3">
      <h2>Tasks</h2>
      {filteredTasks.length === 0 ? (
        <p>No tasks found.</p>
      ) : (
        <ul className="list-group">
          {filteredTasks.map((task, idx) => (
            <div key={idx} className="list-group-item mb-4">
              <li className="mb-3"><strong>{task.title}</strong></li>
              <li>
                {task.description}
                <span className="badge bg-secondary ms-2 mb-4">{task.status}</span>
              </li>
              <li className="mb-2">{task.category}</li>
              <li>
                <button className="btn btn-danger me-2" onClick={() => navigate(`/edit/${idx}`)}>Edit</button>
                <button className="btn btn-danger me-2" onClick={() => handleDelete(idx)}>Delete</button>
              </li>
            </div>
          ))}
        </ul>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  tasks: state.task.tasks
});

export default connect(mapStateToProps)(Landing);
