import "./styles/app.css";
import { useEffect, useState } from "react";

function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/tasks")
      .then((response) => response.json())
      .then((data) => setTasks(data));
  }, []);

  const addTask = async () => {
    if (task.trim() === "") return;

    const response = await fetch("http://localhost:5000/api/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: task }),
    });

    const newTask = await response.json();
    setTasks([...tasks, newTask]);
    setTask("");
  };

  const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/api/tasks/${id}`, {
      method: "DELETE",
    });

    setTasks(tasks.filter((item) => item.id !== id));
  };

  const updateStatus = async (id, status) => {
    await fetch(`http://localhost:5000/api/tasks/${id}/status`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status }),
    });

    setTasks(
      tasks.map((item) =>
        item.id === id ? { ...item, status: status } : item
      )
    );
  };

  return (
    <div className="app">
      <nav className="navbar">
        <h2>DevOps Task Manager</h2>
        <span>Full Stack Project</span>
      </nav>

      <main className="dashboard">
        <section className="hero">
          <div>
            <p className="badge">React + Node + Express</p>
            <h1>Manage Your DevOps Tasks Like a Pro 🚀</h1>
            <p>
              A full-stack task management dashboard built for learning DevOps,
              APIs, Docker, CI/CD and Kubernetes.
            </p>
          </div>
        </section>

        <section className="stats">
          <div className="stat-card">
            <h3>{tasks.length}</h3>
            <p>Total Tasks</p>
          </div>

          <div className="stat-card">
            <h3>{tasks.filter((item) => item.status === "Pending").length}</h3>
            <p>Pending</p>
          </div>

          <div className="stat-card">
            <h3>
              {tasks.filter((item) => item.status === "Completed").length}
            </h3>
            <p>Completed</p>
          </div>
        </section>

        <section className="task-box">
          <div className="input-group">
            <input
              type="text"
              placeholder="Enter a new DevOps task..."
              value={task}
              onChange={(e) => setTask(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") addTask();
              }}
            />

            <button onClick={addTask}>+ Add Task</button>
          </div>

          <h2>Task List</h2>

          {tasks.length === 0 ? (
            <div className="empty-box">
              <h3>No tasks added yet</h3>
              <p>Start by adding your first DevOps task.</p>
            </div>
          ) : (
            <div className="task-list">
              {tasks.map((item) => (
                <div className="task-card" key={item.id}>
                  <div>
                    <h3>{item.title}</h3>
                    <span className="status">
                      {item.status || "Pending"}
                    </span>
                  </div>

                  <div className="task-actions">
                    <button
                      className="pending-btn"
                      onClick={() => updateStatus(item.id, "Pending")}
                    >
                      🟡 Pending
                    </button>

                    <button
                      className="progress-btn"
                      onClick={() => updateStatus(item.id, "In Progress")}
                    >
                      🔵 In Progress
                    </button>

                    <button
                      className="complete-btn"
                      onClick={() => updateStatus(item.id, "Completed")}
                    >
                      🟢 Completed
                    </button>

                    <button
                      className="delete-btn"
                      onClick={() => deleteTask(item.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;