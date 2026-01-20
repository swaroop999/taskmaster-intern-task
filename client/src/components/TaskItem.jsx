const TaskItem = ({ task, onToggle, onDelete }) => {
  return (
    <div
      className={`group flex justify-between items-center p-5 mb-4 bg-white rounded-2xl border transition-all duration-300 ${
        task.isCompleted
          ? "border-gray-100 bg-gray-50 opacity-75"
          : "border-white shadow-sm hover:shadow-lg hover:-translate-y-1 hover:border-indigo-100"
      }`}
    >
      <div
        className="flex items-center gap-4 cursor-pointer flex-1"
        onClick={() => onToggle(task._id)}
      >
        <div
          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors duration-300 ${
            task.isCompleted
              ? "bg-green-500 border-green-500"
              : "border-gray-300 group-hover:border-indigo-500"
          }`}
        >
          {task.isCompleted && (
            <svg
              className="w-4 h-4 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M5 13l4 4L19 7"
              />
            </svg>
          )}
        </div>
        <span
          className={`text-lg font-medium transition-all duration-300 ${
            task.isCompleted
              ? "line-through text-gray-400"
              : "text-gray-700 group-hover:text-gray-900"
          }`}
        >
          {task.title}
        </span>
      </div>

      <button
        onClick={() => onDelete(task._id)}
        className="opacity-0 group-hover:opacity-100 p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-all duration-300"
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
