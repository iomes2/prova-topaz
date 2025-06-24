import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("NOT_STARTED");
  const [selectedTask, setSelectedTask] = useState(null);
  const [editTaskId, setEditTaskId] = useState(null);
  const [editStatus, setEditStatus] = useState("NOT_STARTED");

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const response = await axios.get("http://localhost:8080/api/tasks");
    setTasks(response.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:8080/api/tasks", {
      title,
      description,
      status,
    });
    fetchTasks();
    setTitle("");
    setDescription("");
    setStatus("NOT_STARTED");
  };

  const handleView = (task) => {
    setSelectedTask(task);
  };

  const handleUpdateStatus = async (taskId) => {
    await axios.put(
      `http://localhost:8080/api/tasks/${taskId}/status`,
      { status: editStatus },
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    fetchTasks();
    setEditTaskId(null);
    setEditStatus("NOT_STARTED");
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">To-Do List</h1>
      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          className="border p-2 mr-2"
        />
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          className="border p-2 mr-2"
        />
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="border p-2 mr-2"
        >
          <option value="NOT_STARTED">Not Started</option>
          <option value="IN_PROGRESS">In Progress</option>
          <option value="COMPLETED">Completed</option>
        </select>
        <button type="submit" className="bg-blue-500 text-white p-2">
          Add Task
        </button>
      </form>
      <ul>
        {tasks.map((task) => (
          <li key={task.id} className="mb-2">
            {task.title} - {task.status}
            <button
              onClick={() => handleView(task)}
              className="ml-2 bg-green-500 text-white p-1"
            >
              View Details
            </button>
            <button
              onClick={() => {
                setEditTaskId(task.id);
                setEditStatus(task.status);
              }}
              className="ml-2 bg-yellow-500 text-white p-1"
            >
              Edit Status
            </button>
          </li>
        ))}
      </ul>
      {selectedTask && (
        <div className="mt-4">
          <h2>Task Details</h2>
          <p>Title: {selectedTask.title}</p>
          <p>Description: {selectedTask.description}</p>
          <p>Status: {selectedTask.status}</p>
          <button
            onClick={() => setSelectedTask(null)}
            className="bg-red-500 text-white p-1"
          >
            Close
          </button>
        </div>
      )}
      {editTaskId && (
        <div className="mt-4">
          <h2>Update Status</h2>
          <select
            value={editStatus}
            onChange={(e) => setEditStatus(e.target.value)}
            className="border p-2 mr-2"
          >
            <option value="NOT_STARTED">Not Started</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="COMPLETED">Completed</option>
          </select>
          <button
            onClick={() => handleUpdateStatus(editTaskId)}
            className="bg-blue-500 text-white p-2"
          >
            Save Status
          </button>
          <button
            onClick={() => {
              setEditTaskId(null);
              setEditStatus("NOT_STARTED");
            }}
            className="ml-2 bg-red-500 text-white p-1"
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
