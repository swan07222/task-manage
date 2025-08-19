import React, { useEffect, useState, useRef } from "react";
import { connect } from "react-redux";
import { showTasks, deleteTask,clearLastAction } from "../../actions/taskactions";
import { useNavigate } from "react-router-dom";
import { Modal, Button, Alert } from "react-bootstrap";

const Landing = ({ tasks, lastAction, dispatch }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);

  const [showTaskModal, setShowTaskModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const [alertMessage, setAlertMessage] = useState(null);

  const filterRef = useRef(null);
  const [filterHeight, setFilterHeight] = useState(0);

  const navigate = useNavigate();

  // Load tasks
  useEffect(() => {
    dispatch(showTasks());
  }, [dispatch]);

  // Adjust spacing for fixed filter bar
  useEffect(() => {
    if (filterRef.current) setFilterHeight(filterRef.current.offsetHeight); // smaller padding
    const handleResize = () => {
      if (filterRef.current)
        setFilterHeight(filterRef.current.offsetHeight + 10); // smaller padding
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Show alert on lastAction change
  useEffect(() => {
    if (!lastAction) return;
  
    let msg = "";
    if (lastAction === "EDIT_TASK") msg = "Task edited successfully!";
    else if (lastAction === "ADD_TASK") msg = "Task added successfully!";
    else if (lastAction === "DELETE_TASK") msg = "Task deleted successfully!";
  
    setAlertMessage(msg);

    // clear any existing timers first
    const timer = setTimeout(() => {
      console.log('123123')
      setAlertMessage(null);
      dispatch(clearLastAction()); // reset lastAction in Redux
    }, 3000);
  
    // cleanup to prevent multiple timers
    return () => clearTimeout(timer);
  }, [lastAction, dispatch]);
  
  // Delete logic
  const handleDeleteClick = (taskId) => {
    setTaskToDelete(taskId);
    setShowDeleteModal(true);
  };
  const confirmDelete = () => {
    if (taskToDelete) dispatch(deleteTask(taskToDelete));
    setShowDeleteModal(false);
    setTaskToDelete(null);
  };
  const cancelDelete = () => {
    setShowDeleteModal(false);
    setTaskToDelete(null);
  };

  // Task modal logic
  const handleTaskClick = (task) => {
    setSelectedTask(task);
    setShowTaskModal(true);
  };
  const closeTaskModal = () => {
    setSelectedTask(null);
    setShowTaskModal(false);
  };

  // Filter tasks
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
      {/* Alert */}
      {alertMessage && (
        <Alert
          variant="success"
          style={{
            position: "fixed",
            top: "80px",
            right: "20px",
            zIndex: 2000,
          }}
        >
          {alertMessage}
        </Alert>
      )}

      {/* Filter Bar */}
      <div
        ref={filterRef}
        className="bg-light p-3 d-flex flex-wrap align-items-center gap-2 position-fixed start-0 w-100 shadow"
        style={{ zIndex: 1000, top: "56px" }}
      >
        <div className="d-flex align-items-center">
          Filter by status
          <select
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
          Filter by Category
          <select
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

        <div className="d-flex align-items-center ms-auto flex-grow-1 justify-content-center justify-content-md-end">
          <input
            type="text"
            className="form-control"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ maxWidth: "250px" }}
          />
        </div>

      </div>

      {/* Spacer */}
      <div style={{ height: filterHeight }}></div>

      {/* Task Grid */}
      <div className="container-fluid task-container" style={{ paddingTop: filterHeight }}>
        {filteredTasks.length === 0 ? (
          <p>No tasks found.</p>
        ) : (
          <div className="row g-3">
            {filteredTasks.map((task) => (
              <div key={task.id} className="col-12 col-sm-4 col-md-3 col-lg-3">
                <div
                  className="card h-100 position-relative task-card"
                  onClick={() => handleTaskClick(task)}
                  style={{ cursor: "pointer" }}
                >
                  {/* Top-right circular buttons */}
                  <div className="position-absolute top-0 end-0 m-2 d-flex gap-1">
                    <button
                      className="btn btn-primary d-flex justify-content-center align-items-center"
                      style={{
                        width: "35px",
                        height: "35px",
                        borderRadius: "50%",
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/edit/${task.id}`);
                      }}
                      title="Edit"
                    >
                      <i className="bi bi-pencil"></i>
                    </button>
                    <button
                      className="btn btn-danger d-flex justify-content-center align-items-center"
                      style={{
                        width: "35px",
                        height: "35px",
                        borderRadius: "50%",
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteClick(task.id);
                      }}
                      title="Delete"
                    >
                      <i className="bi bi-trash"></i>
                    </button>
                  </div>

                  <div className="card-body d-flex flex-column align-items-center text-center">
                    <h5 className="card-title">{task.title}</h5>
                    <p
                      className="card-text flex-grow-1 p-2 border rounded w-100"
                      style={{ minHeight: "50px" }}
                    >
                      {task.description.length > 20
                        ? task.description.substring(0, 20) + "..."
                        : task.description}
                    </p>
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
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Delete Modal */}
      <Modal show={showDeleteModal} onHide={cancelDelete} centered>
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

      {/* Task Detail Modal */}
      <Modal show={showTaskModal} onHide={closeTaskModal} centered>
        <Modal.Body className="text-center">
          {selectedTask && (
            <>
              <h5>{selectedTask.title}</h5>
              <p className="border rounded p-2 mt-2">{selectedTask.description}</p>
              <div className="mt-2">
                <span
                  className={`badge me-1 ${
                    selectedTask.status === "Not started"
                      ? "bg-secondary"
                      : selectedTask.status === "Started"
                      ? "bg-primary"
                      : "bg-success"
                  }`}
                >
                  {selectedTask.status}
                </span>
                <span className="badge bg-info">{selectedTask.category}</span>
              </div>
            </>
          )}
        </Modal.Body>
        <Modal.Footer className="justify-content-center">
          {selectedTask && (
            <>
              <Button
                variant="primary"
                onClick={() => {
                  navigate(`/edit/${selectedTask.id}`);
                  closeTaskModal();
                }}
              >
                Edit
              </Button>
              <Button
                variant="danger"
                onClick={() => {
                  handleDeleteClick(selectedTask.id);
                  closeTaskModal();
                }}
              >
                Delete
              </Button>
            </>
          )}
          <Button variant="secondary" onClick={closeTaskModal}>
            Close
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
        @media (max-width: 576px) {
          .task-container {
            padding-top: 60px !important; /* smaller padding on mobile */
          }
        }
      `}</style>
    </div>
  );
};

const mapStateToProps = (state) => ({
  tasks: state.task.tasks,
  lastAction: state.task.lastAction,  
  lastTask: state.task.lastTask
});


export default connect(mapStateToProps)(Landing);
