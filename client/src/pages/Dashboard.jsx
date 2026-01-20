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

  // NEW: Search and Filter State
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all"); // 'all', 'completed', 'pending'

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await axios.get(
          "https://taskmaster-intern-task.vercel.app/api/tasks",
        );
        setTasks(res.data);
      } catch (err) {
        toast.error("Failed to load tasks");
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, []);

  const addTask = async (taskData) => {
    try {
      const res = await axios.post(
        "https://taskmaster-intern-task.vercel.app/api/tasks",
        taskData,
      );
      setTasks([res.data, ...tasks]);
      toast.success("Task Added");
    } catch (err) {
      toast.error("Error adding task");
    }
  };

  const toggleTask = async (id) => {
    try {
      const taskToToggle = tasks.find((t) => t._id === id);
      const res = await axios.put(
        `https://taskmaster-intern-task.vercel.app/api/tasks/${id}`,
        {
          isCompleted: !taskToToggle.isCompleted,
        },
      );
      setTasks(tasks.map((t) => (t._id === id ? res.data : t)));
    } catch (err) {
      toast.error("Error updating task");
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(
        `https://taskmaster-intern-task.vercel.app/api/tasks/${id}`,
      );
      setTasks(tasks.filter((t) => t._id !== id));
      toast.success("Task Deleted");
    } catch (err) {
      toast.error("Error deleting task");
    }
  };

  // NEW: Filter Logic
  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesFilter =
      filterStatus === "all"
        ? true
        : filterStatus === "completed"
          ? task.isCompleted
          : !task.isCompleted; // pending

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="max-w-3xl mx-auto mt-10 p-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Hello, {user && user.name} 👋
        </h1>
        <p className="text-gray-500 mt-1">Manage your tasks efficiently.</p>
      </div>

      <TaskForm onAdd={addTask} />

      {/* NEW: Search & Filter Controls */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6 mt-8">
        <input
          type="text"
          placeholder="Search tasks..."
          className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <select
          className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none bg-white"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="all">All Tasks</option>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      {loading ? (
        <p className="text-center text-gray-500">Loading tasks...</p>
      ) : tasks.length === 0 ? (
        <div className="text-center py-10 bg-white rounded-lg border border-dashed border-gray-300">
          <p className="text-gray-500">No tasks yet. Add one above!</p>
        </div>
      ) : filteredTasks.length === 0 ? (
        <p className="text-center text-gray-500 mt-10">
          No tasks match your search.
        </p>
      ) : (
        <div className="space-y-3">
          {filteredTasks.map((task) => (
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
