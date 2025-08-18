import React from "react";
import { connect } from "react-redux";

const TaskList = ({ tasks, statusFilter, searchTerm }) => {
  const filteredTasks = tasks.filter(task => {
    // Filter by status
    const statusMatch = statusFilter === "all" ? true : task.status === statusFilter;

    // Filter by search term
    const searchMatch = task.title.toLowerCase().includes(searchTerm.toLowerCase());

    return statusMatch && searchMatch;
  });

  return (
    <div>
      {filteredTasks.length === 0 && <p>No tasks found.</p>}
      {filteredTasks.map(task => (
        <div key={task.id} className="card mb-2 p-2">
          <h5>{task.title}</h5>
          <p>Status: {task.status}</p>
        </div>
      ))}
    </div>
  );
};

const mapStateToProps = (state) => ({
  tasks: state.tasks, // assuming your tasks are in Redux
});

export default connect(mapStateToProps)(TaskList);
