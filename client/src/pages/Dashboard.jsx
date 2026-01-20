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
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

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

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesFilter =
      filterStatus === "all"
        ? true
        : filterStatus === "completed"
          ? task.isCompleted
          : !task.isCompleted;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen pt-24 pb-10 px-4">
      {/* Background Decor */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Welcome back,{" "}
            <span className="text-indigo-600">{user && user.name}</span>
          </h1>
          <p className="text-gray-500 text-lg">
            You have {tasks.filter((t) => !t.isCompleted).length} pending tasks
            today.
          </p>
        </div>

        {/* Input Section */}
        <div className="bg-white rounded-2xl shadow-xl shadow-indigo-100/50 p-6 mb-8 border border-white">
          <TaskForm onAdd={addTask} />
        </div>

        {/* Search & Filter Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
          <div className="relative w-full sm:w-96">
            <svg
              className="absolute left-4 top-3.5 h-5 w-5 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="text"
              placeholder="Search tasks..."
              className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition shadow-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex gap-2 p-1 bg-white border border-gray-200 rounded-xl shadow-sm">
            {["all", "pending", "completed"].map((status) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-all ${
                  filterStatus === status
                    ? "bg-indigo-100 text-indigo-700 shadow-sm"
                    : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        {/* Task List */}
        {loading ? (
          <div className="flex justify-center py-10">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
          </div>
        ) : tasks.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-dashed border-gray-300">
            <p className="text-gray-400 text-lg">
              No tasks yet. Start by adding one!
            </p>
          </div>
        ) : filteredTasks.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-gray-500">No tasks match your search.</p>
          </div>
        ) : (
          <div className="space-y-4">
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
    </div>
  );
};

export default Dashboard;
