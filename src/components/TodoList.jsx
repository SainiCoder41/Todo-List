function TodoList({ todos, onToggleTodo, onDeleteTodo }) {
  return (
    <div className="space-y-4">
      {todos.map((todo) => (
        <div
          key={todo.id}
          className={`
            group relative overflow-hidden
            rounded-2xl border
            p-5
            transition-all duration-300
            hover:-translate-y-1 hover:shadow-lg

            ${
              todo.completed
                ? "border-gray-200 bg-gray-50"
                : "border-gray-200 bg-white hover:border-gray-300"
            }
          `}
        >
          {/* High Priority Indicator */}
          {todo.priority === "High" && !todo.completed && (
            <div className="absolute left-0 top-0 h-full w-1 bg-red-500" />
          )}

          <div className="flex items-center justify-between gap-5">
            
            {/* Todo Information */}
            <div className="flex min-w-0 flex-1 items-start gap-4">

              {/* Status Circle */}
              <button
                onClick={() => onToggleTodo(todo.id)}
                className={`
                  mt-1 flex h-6 w-6 shrink-0 items-center justify-center
                  rounded-full border-2
                  transition-all duration-200
                  
                  ${
                    todo.completed
                      ? "border-green-500 bg-green-500 text-white"
                      : "border-gray-300 hover:border-green-500"
                  }
                `}
                aria-label={
                  todo.completed
                    ? "Mark todo as incomplete"
                    : "Mark todo as complete"
                }
              >
                {todo.completed && (
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                )}
              </button>

              {/* Title + Priority */}
              <div className="min-w-0 flex-1">

                <div className="flex flex-wrap items-center gap-3">
                  <h3
                    className={`
                      text-base font-semibold sm:text-lg
                      ${
                        todo.completed
                          ? "text-gray-400 line-through"
                          : "text-gray-900"
                      }
                    `}
                  >
                    {todo.title}
                  </h3>

                  {/* Priority Badge */}
                {/* Priority */}
<span
  className={`
    inline-flex items-center gap-1.5
    rounded-full px-2.5 py-1
    text-xs font-bold

    ${
      todo.priority === "High"
        ? "bg-red-50 text-red-600 ring-1 ring-red-200"
        : todo.priority === "Medium"
        ? "bg-amber-50 text-amber-600 ring-1 ring-amber-200"
        : "bg-emerald-50 text-emerald-600 ring-1 ring-emerald-200"
    }
  `}
>
  {todo.priority}
</span>

{/* Category */}
<span
  className="
    inline-flex items-center
    rounded-full
    bg-blue-50
    px-2.5 py-1
    text-xs font-semibold
    text-blue-600
    ring-1 ring-blue-200
  "
>
  {todo.category || "Other"}
</span>
                </div>

                {/* Status */}
                <p className="mt-1.5 text-sm">
                  {todo.completed ? (
                    <span className="font-medium text-green-600">
                      ✓ Completed
                    </span>
                  ) : (
                    <span className="text-gray-400">
                      Pending
                    </span>
                  )}
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex shrink-0 items-center gap-2">

              {/* Complete Button */}
              <button
                onClick={() => onToggleTodo(todo.id)}
                className={`
                  hidden rounded-lg px-3.5 py-2
                  text-sm font-semibold
                  transition-all duration-200
                  sm:block

                  ${
                    todo.completed
                      ? "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      : "bg-green-600 text-white hover:bg-green-700 hover:shadow-md"
                  }
                `}
              >
                {todo.completed ? "Undo" : "Complete"}
              </button>

              {/* Delete Button */}
              <button
                onClick={() => onDeleteTodo(todo.id)}
                className="
                  flex h-9 w-9 items-center justify-center
                  rounded-lg
                  text-gray-400
                  transition-all duration-200
                  hover:bg-red-50
                  hover:text-red-600
                "
                aria-label="Delete todo"
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 6h18"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8 6V4h8v2"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 6l-1 14H6L5 6"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10 11v5M14 11v5"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Complete Button */}
          <button
            onClick={() => onToggleTodo(todo.id)}
            className={`
              mt-4 w-full rounded-lg px-3 py-2
              text-sm font-semibold
              sm:hidden
              
              ${
                todo.completed
                  ? "bg-gray-100 text-gray-600"
                  : "bg-green-600 text-white"
              }
            `}
          >
            {todo.completed ? "Undo" : "Complete"}
          </button>
        </div>
      ))}
    </div>
  )
}

export default TodoList