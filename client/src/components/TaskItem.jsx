const TaskItem = ({ task, onToggle, onDelete }) => {
  return (
    <div
      className={`group relative flex justify-between items-center p-5 mb-4 bg-white rounded-xl border-l-4 shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-1 ${
        task.isCompleted
          ? "border-l-emerald-400 opacity-75"
          : "border-l-amber-400 border-y border-r border-slate-100"
      }`}
    >
      <div
        className="flex items-center gap-4 cursor-pointer flex-1"
        onClick={() => onToggle(task._id)}
      >
        {/* Custom Icon Box */}
        <div
          className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
            task.isCompleted
              ? "bg-emerald-100 text-emerald-600"
              : "bg-amber-100 text-amber-600 group-hover:bg-indigo-100 group-hover:text-indigo-600"
          }`}
        >
          {task.isCompleted ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          ) : (
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
          )}
        </div>

        <div className="flex flex-col">
          <span
            className={`text-lg font-medium transition-all duration-300 ${
              task.isCompleted
                ? "line-through text-slate-400"
                : "text-slate-700"
            }`}
          >
            {task.title}
          </span>
          <span
            className={`text-xs font-semibold uppercase tracking-wider mt-0.5 ${
              task.isCompleted ? "text-emerald-500" : "text-amber-500"
            }`}
          >
            {task.isCompleted ? "Completed" : "Pending Action"}
          </span>
        </div>
      </div>

      <button
        onClick={() => onDelete(task._id)}
        className="text-slate-300 hover:text-red-500 hover:bg-red-50 p-2 rounded-lg transition-all"
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
