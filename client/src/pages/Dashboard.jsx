import { useState, useEffect, useContext } from "react";
import AuthContext from "../context/AuthContext";
import axios from "axios";
import TaskForm from "../components/TaskForm";
import TaskItem from "../components/TaskItem";
import toast from "react-hot-toast";

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  // 1. Fetch Tasks on Load
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/tasks");
        setTasks(res.data);
      } catch (err) {
        toast.error("Failed to load tasks");
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, []);

  // 2. Add Task Function
  const addTask = async (taskData) => {
    try {
      const res = await axios.post("http://localhost:5000/api/tasks", taskData);
      setTasks([res.data, ...tasks]); // Add new task to top of list
      toast.success("Task Added");
    } catch (err) {
      toast.error("Error adding task");
    }
  };

  // 3. Toggle Complete Function
  const toggleTask = async (id) => {
    try {
      const taskToToggle = tasks.find((t) => t._id === id);
      const res = await axios.put(`http://localhost:5000/api/tasks/${id}`, {
        isCompleted: !taskToToggle.isCompleted,
      });

      // Update local state
      setTasks(tasks.map((t) => (t._id === id ? res.data : t)));
    } catch (err) {
      toast.error("Error updating task");
    }
  };

  // 4. Delete Task Function
  const deleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${id}`);
      setTasks(tasks.filter((t) => t._id !== id)); // Remove from list
      toast.success("Task Deleted");
    } catch (err) {
      toast.error("Error deleting task");
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Hello, {user && user.name} 👋
        </h1>
        <p className="text-gray-500 mt-1">Here is what you have planned.</p>
      </div>

      <TaskForm onAdd={addTask} />

      {loading ? (
        <p className="text-center text-gray-500">Loading tasks...</p>
      ) : tasks.length === 0 ? (
        <div className="text-center py-10 bg-white rounded-lg border border-dashed border-gray-300">
          <p className="text-gray-500">No tasks yet. Add one above!</p>
        </div>
      ) : (
        <div>
          {tasks.map((task) => (
            <TaskItem
              key={task._id}
              task={task}
              onToggle={toggleTask}
              onDelete={deleteTask}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
