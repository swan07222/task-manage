import React, { useEffect, useState, useRef } from "react";
import { connect } from "react-redux";
import { showTasks, deleteTask } from "../../actions/taskactions";
import { useNavigate } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";

const Landing = ({ tasks, dispatch }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [showModal, setShowModal] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);

  const filterRef = useRef(null);
  const [filterHeight, setFilterHeight] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(showTasks());
  }, [dispatch]);

  useEffect(() => {
    if (filterRef.current) {
      setFilterHeight(filterRef.current.offsetHeight + 20); // add extra spacing
    }
    const handleResize = () => {
      if (filterRef.current)
        setFilterHeight(filterRef.current.offsetHeight + 20);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleDeleteClick = (taskId) => {
    setTaskToDelete(taskId);
    setShowModal(true);
  };

  const confirmDelete = () => {
    if (taskToDelete) {
      dispatch(deleteTask(taskToDelete));
    }
    setShowModal(false);
    setTaskToDelete(null);
  };

  const cancelDelete = () => {
    setShowModal(false);
    setTaskToDelete(null);
  };

  const filteredTasks = (tasks || []).filter((task) => {
    const term = searchTerm.toLowerCase();
    const status = statusFilter.toLowerCase();
    const category = categoryFilter.toLowerCase();

    const matchesSearch =
      task.title.toLowerCase().includes(term) ||
      task.description.toLowerCase().includes(term) ||
      task.category.toLowerCase().includes(term);

    const matchesStatus =
      status === "all" ? true : task.status.toLowerCase() === status;
    const matchesCategory =
      category === "all" ? true : task.category.toLowerCase() === category;

    return matchesSearch && matchesStatus && matchesCategory;
  });

  return (
    <div>
      {/* Filter bar */}
      <div
        ref={filterRef}
        className="bg-light p-3 d-flex flex-wrap align-items-center gap-2 position-fixed start-0 w-100 shadow"
        style={{ zIndex: 1000, top: "56px" }}
      >
        <div className="d-flex align-items-center">
          <label htmlFor="statusFilter" className="me-2 mb-0">
            Filter by Status:
          </label>
          <select
            id="statusFilter"
            className="form-select"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All</option>
            <option value="not started">Not started</option>
            <option value="started">Started</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        <div className="d-flex align-items-center">
          <label htmlFor="categoryFilter" className="me-2 mb-0">
            Filter by Category:
          </label>
          <select
            id="categoryFilter"
            className="form-select"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="all">All</option>
            <option value="work">Work</option>
            <option value="personal">Personal</option>
            <option value="learning">Learning</option>
          </select>
        </div>

        <div className="d-flex align-items-center ms-auto">
          <input
            type="text"
            className="form-control"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Dynamic spacer with extra padding */}
      <div style={{ height: filterHeight }}></div>

      {/* Task Grid */}
      <div className="container-fluid">
        {filteredTasks.length === 0 ? (
          <p>No tasks found.</p>
        ) : (
          <div className="row g-3">
            {filteredTasks.map((task) => (
              <div key={task.id} className="col-6 col-sm-4 col-md-3 col-lg-2">
                <div className="card h-100 task-card">
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{task.title}</h5>
                    <p className="card-text flex-grow-1">{task.description}</p>
                    <div className="mb-2">
                      <span
                        className={`badge me-1 ${
                          task.status === "Not started"
                            ? "bg-secondary"
                            : task.status === "Started"
                            ? "bg-primary"
                            : "bg-success"
                        }`}
                      >
                        {task.status}
                      </span>
                      <span className="badge bg-info">{task.category}</span>
                    </div>
                    <div className="mt-auto d-flex gap-2">
                      <button
                        className="btn btn-primary btn-sm"
                        onClick={() => navigate(`/edit/${task.id}`)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDeleteClick(task.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Delete Modal */}
      <Modal show={showModal} onHide={cancelDelete} centered>
        <Modal.Header closeButton>
          <Modal.Title>Delete Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this task? This action cannot be undone.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={cancelDelete}>
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Hover effect */}
      <style>{`
        .task-card {
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .task-card:hover {
          transform: translateY(-5px) scale(1.02);
          box-shadow: 0 8px 20px rgba(0,0,0,0.15);
        }
      `}</style>
    </div>
  );
};

const mapStateToProps = (state) => ({
  tasks: state.task.tasks,
});

export default connect(mapStateToProps)(Landing);
