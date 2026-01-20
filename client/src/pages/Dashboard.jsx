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

  // Stats Logic
  const totalTasks = tasks.length;
  const pendingTasks = tasks.filter((t) => !t.isCompleted).length;
  const completedTasks = tasks.filter((t) => t.isCompleted).length;

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
    <div className="min-h-screen pt-28 pb-10 px-4 bg-slate-50">
      <div className="max-w-5xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">Workspace</h1>
            <p className="text-slate-500 mt-1">
              Manage your daily goals, {user && user.name}.
            </p>
          </div>
          <div className="text-right hidden md:block">
            <p className="text-sm font-semibold text-slate-400 uppercase tracking-wider">
              Current Date
            </p>
            <p className="text-xl font-bold text-slate-700">
              {new Date().toLocaleDateString("en-US", {
                weekday: "long",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
        </div>

        {/* Stats Cards Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm font-semibold uppercase">
                Total Tasks
              </p>
              <p className="text-3xl font-bold text-slate-800 mt-1">
                {totalTasks}
              </p>
            </div>
            <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between">
            <div>
              <p className="text-amber-500 text-sm font-semibold uppercase">
                Pending
              </p>
              <p className="text-3xl font-bold text-slate-800 mt-1">
                {pendingTasks}
              </p>
            </div>
            <div className="w-12 h-12 bg-amber-50 text-amber-500 rounded-full flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between">
            <div>
              <p className="text-emerald-500 text-sm font-semibold uppercase">
                Completed
              </p>
              <p className="text-3xl font-bold text-slate-800 mt-1">
                {completedTasks}
              </p>
            </div>
            <div className="w-12 h-12 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Input & Search Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 mb-8">
          <TaskForm onAdd={addTask} />

          <div className="h-px bg-slate-100 my-6"></div>

          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <svg
                className="absolute left-4 top-3.5 h-5 w-5 text-slate-400"
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
                className="w-full pl-12 pr-4 py-3 bg-slate-50 border-none rounded-xl text-slate-700 focus:ring-2 focus:ring-indigo-500 outline-none transition"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="flex bg-slate-100 p-1 rounded-xl">
              {["all", "pending", "completed"].map((status) => (
                <button
                  key={status}
                  onClick={() => setFilterStatus(status)}
                  className={`px-6 py-2 rounded-lg text-sm font-semibold capitalize transition-all ${
                    filterStatus === status
                      ? "bg-white text-slate-800 shadow-sm"
                      : "text-slate-500 hover:text-slate-700"
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Task List */}
        {loading ? (
          <div className="flex justify-center py-10">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
          </div>
        ) : tasks.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-dashed border-slate-300">
            <div className="w-16 h-16 bg-slate-50 text-slate-300 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
            </div>
            <p className="text-slate-500 text-lg">No tasks found.</p>
            <p className="text-slate-400 text-sm">
              Create a new task to get started.
            </p>
          </div>
        ) : filteredTasks.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-slate-500">No tasks match your search.</p>
          </div>
        ) : (
          <div className="space-y-1">
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
