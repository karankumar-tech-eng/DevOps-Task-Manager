const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

let tasks = [];

app.get("/", (req, res) => {
  res.send("DevOps Task Manager Backend Running");
});

app.get("/api/tasks", (req, res) => {
  res.json(tasks);
});

app.post("/api/tasks", (req, res) => {
  const newTask = {
    id: Date.now(),
    title: req.body.title,
    status: "Pending",
  };

  tasks.push(newTask);

  res.json(newTask);
});

app.put("/api/tasks/:id/status", (req, res) => {
  const taskId = parseInt(req.params.id);
  const { status } = req.body;

  tasks = tasks.map((task) =>
    task.id === taskId ? { ...task, status } : task
  );

  res.json({ message: "Task status updated successfully" });
});

app.delete("/api/tasks/:id", (req, res) => {
  const taskId = parseInt(req.params.id);

  tasks = tasks.filter((task) => task.id !== taskId);

  res.json({ message: "Task deleted successfully" });
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});