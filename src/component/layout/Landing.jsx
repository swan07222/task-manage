import React, { useEffect } from "react";
import { connect } from "react-redux";
import { showTasks } from "../../actions/taskactions";
import { useNavigate } from 'react-router-dom';
import { deleteTask } from '../../actions/taskactions';


const Landing = ({ tasks, dispatch }) => {
  useEffect(() => {
    dispatch(showTasks()); // load tasks on mount
  }, [dispatch]);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      dispatch(deleteTask(id));
    }
  };

  const navigate = useNavigate();

  return (
    <div className="container mt-3">
      <h2>Tasks</h2>
        <ul className="list-group">
            {(tasks || []).map((task, idx) => (
                <div key={idx} className="list-group-item mb-4">
                <li className="mb-3"><strong>{task.title}</strong></li>
                <li>
                    {task.description}  
                    {task.status === 'Completed' && (
                         <span className="badge bg-secondary ms-2 mb-4 text-warning">{task.status}</span> 
                        )}
                    {task.status !== 'Completed' && (
                         <span className="badge bg-secondary ms-2 mb-4">{task.status}</span> 
                    )}
                </li>
                <li>
                    
                    <button className="btn btn-danger me-2 ms-2" onClick={() => navigate(`/edit/${idx}`)}>
                        Edit
                    </button>
                    <button className="btn btn-danger me-2 ms-2" onClick={() => handleDelete(idx)}>
                        Delete
                    </button>
                </li>
                </div>
            ))}
        </ul>
    </div>
  );
};

const mapStateToProps = (state) => ({
  tasks: state.task.tasks
});

export default connect(mapStateToProps)(Landing);
