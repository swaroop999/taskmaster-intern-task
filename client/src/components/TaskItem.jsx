const TaskItem = ({ task, onToggle, onDelete }) => {
  return (
    <div
      className={`flex justify-between items-center p-4 mb-3 bg-white rounded-lg shadow-sm border transition-all duration-200 ${
        task.isCompleted
          ? "bg-gray-50 border-gray-100"
          : "border-gray-200 hover:shadow-md"
      }`}
    >
      <div
        className="flex items-center gap-3 cursor-pointer"
        onClick={() => onToggle(task._id)}
      >
        <input
          type="checkbox"
          checked={task.isCompleted}
          readOnly
          className="w-5 h-5 text-indigo-600 rounded focus:ring-indigo-500 cursor-pointer"
        />
        <span
          className={`text-lg ${
            task.isCompleted ? "line-through text-gray-400" : "text-gray-800"
          }`}
        >
          {task.title}
        </span>
      </div>

      <button
        onClick={() => onDelete(task._id)}
        className="text-gray-400 hover:text-red-500 transition p-2"
        title="Delete Task"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </div>
  );
};

export default TaskItem;
