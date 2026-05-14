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

  return (
    <div className="container">
      <h1>DevOps Task Manager</h1>

      <input
        type="text"
        placeholder="Enter task title"
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />

      <button onClick={addTask}>Add Task</button>

      <div>
        <h2>Task List</h2>

        {tasks.length === 0 ? (
          <p>No tasks added yet.</p>
        ) : (
          <ul>
            {tasks.map((item) => (
              <li key={item.id}>
                {item.title}

                <button
                 onClick={async () => {
  await fetch(`http://localhost:5000/api/tasks/${item.id}`, {
    method: "DELETE",
  });

  const updatedTasks = tasks.filter(
    (task) => task.id !== item.id
  );

  setTasks(updatedTasks);
}}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default App;