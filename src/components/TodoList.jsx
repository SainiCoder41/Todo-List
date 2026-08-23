import { useState } from 'react'

function TodoList({
  todos,
  onToggleTodo,
  onDeleteTodo,
  onUpdateTodo,
}) {
  const [editingId, setEditingId] = useState(null)
const [selectedTodo, setSelectedTodo] = useState(null)
  const [editTitle, setEditTitle] = useState('')
  const [editPriority, setEditPriority] = useState('Medium')
  const [editCategory, setEditCategory] = useState('Other')

  const startEditing = (todo) => {
    setEditingId(todo.id)

    setEditTitle(todo.title)
    setEditPriority(todo.priority)
    setEditCategory(todo.category || 'Other')
  }

  const cancelEditing = () => {
    setEditingId(null)
    setEditTitle('')
    setEditPriority('Medium')
    setEditCategory('Other')
  }

  const saveEdit = (id) => {
    if (editTitle.trim() === '') {
      return
    }

    onUpdateTodo(id, {
      title: editTitle.trim(),
      priority: editPriority,
      category: editCategory,
    })

    setEditingId(null)
  }

  return (
    <div className="space-y-4">
      {todos.map((todo) => {
        const isEditing = editingId === todo.id

        return (
          <div
            key={todo.id}
            className={`
              group relative overflow-hidden
              rounded-2xl border
              p-5
              transition-all duration-300

              ${
                todo.completed
                  ? 'border-gray-200 bg-gray-50'
                  : 'border-gray-200 bg-white hover:-translate-y-1 hover:shadow-lg'
              }

              ${
                todo.priority === 'High' && !todo.completed
                  ? 'border-l-4 border-l-red-500'
                  : ''
              }
            `}
          >
            {isEditing ? (

              /* ================= EDIT MODE ================= */

              <div className="space-y-4">

                {/* Edit Header */}
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Edit Todo
                  </h3>

                  <span className="text-xs text-gray-400">
                    Editing
                  </span>
                </div>

                {/* Title */}
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Title
                  </label>

                  <input
                    type="text"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    className="
                      w-full rounded-lg
                      border border-gray-300
                      px-4 py-2.5
                      text-sm
                      focus:border-blue-500
                      focus:outline-none
                      focus:ring-2
                      focus:ring-blue-200
                    "
                  />
                </div>

                {/* Priority + Category */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                  {/* Priority */}
                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                      Priority
                    </label>

                    <select
                      value={editPriority}
                      onChange={(e) =>
                        setEditPriority(e.target.value)
                      }
                      className="
                        w-full rounded-lg
                        border border-gray-300
                        bg-white
                        px-4 py-2.5
                        text-sm
                        focus:border-blue-500
                        focus:outline-none
                        focus:ring-2
                        focus:ring-blue-200
                      "
                    >
                      <option value="High">High</option>
                      <option value="Medium">Medium</option>
                      <option value="Low">Low</option>
                    </select>
                  </div>

                  {/* Category */}
                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                      Category
                    </label>

                    <select
                      value={editCategory}
                      onChange={(e) =>
                        setEditCategory(e.target.value)
                      }
                      className="
                        w-full rounded-lg
                        border border-gray-300
                        bg-white
                        px-4 py-2.5
                        text-sm
                        focus:border-blue-500
                        focus:outline-none
                        focus:ring-2
                        focus:ring-blue-200
                      "
                    >
                      <option value="Work">Work</option>
                      <option value="Personal">Personal</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                </div>

                {/* Save / Cancel */}
                <div className="flex justify-end gap-2 pt-2">

                  <button
                    onClick={cancelEditing}
                    className="
                      rounded-lg
                      bg-gray-100
                      px-4 py-2
                      text-sm font-semibold
                      text-gray-600
                      hover:bg-gray-200
                    "
                  >
                    Cancel
                  </button>

                  <button
                    onClick={() => saveEdit(todo.id)}
                    disabled={!editTitle.trim()}
                    className="
                      rounded-lg
                      bg-blue-600
                      px-4 py-2
                      text-sm font-semibold
                      text-white
                      hover:bg-blue-700
                      disabled:cursor-not-allowed
                      disabled:opacity-50
                    "
                  >
                    Save Changes
                  </button>

                </div>
              </div>

            ) : (

              /* ================= VIEW MODE ================= */

              <div className="flex items-center justify-between gap-5">

                {/* Todo Information */}
                <div className="flex min-w-0 flex-1 items-start gap-4">

                  {/* Status Circle */}
                  <button
                    onClick={() => onToggleTodo(todo.id)}
                    className={`
                      mt-1 flex h-6 w-6 shrink-0
                      items-center justify-center
                      rounded-full border-2
                      transition-all

                      ${
                        todo.completed
                          ? 'border-green-500 bg-green-500 text-white'
                          : 'border-gray-300 hover:border-green-500'
                      }
                    `}
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

                  {/* Title + Badges */}
                  <div className="min-w-0 flex-1">

                    <div className="flex flex-wrap items-center gap-3">

                      <h3
                        className={`
                          text-base font-semibold sm:text-lg
                          ${
                            todo.completed
                              ? 'text-gray-400 line-through'
                              : 'text-gray-900'
                          }
                        `}
                      >
                        {todo.title}
                      </h3>

                      {/* Priority */}
                      <span
                        className={`
                          rounded-full
                          px-2.5 py-1
                          text-xs font-bold
                          ${
                            todo.priority === 'High'
                              ? 'bg-red-50 text-red-600 ring-1 ring-red-200'
                              : todo.priority === 'Medium'
                              ? 'bg-amber-50 text-amber-600 ring-1 ring-amber-200'
                              : 'bg-emerald-50 text-emerald-600 ring-1 ring-emerald-200'
                          }
                        `}
                      >
                        {todo.priority}
                      </span>

                      {/* Category */}
                      <span
                        className="
                          rounded-full
                          bg-blue-50
                          px-2.5 py-1
                          text-xs font-semibold
                          text-blue-600
                          ring-1 ring-blue-200
                        "
                      >
                        {todo.category || 'Other'}
                      </span>

                    </div>

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

                  {/* Edit */}
                  <button
                    onClick={() => startEditing(todo)}
                    className="
                      flex h-9 w-9
                      items-center justify-center
                      rounded-lg
                      text-gray-400
                      transition-all
                      hover:bg-blue-50
                      hover:text-blue-600
                    "
                    title="Edit Todo"
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
                        d="M12 20h9"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"
                      />
                    </svg>
                  </button>
                  <button
  onClick={() => setSelectedTodo(todo)}
  className="
    flex h-9 w-9
    items-center justify-center
    rounded-lg
    text-gray-400
    transition-all
    hover:bg-purple-50
    hover:text-purple-600
  "
  title="View Details"
>
  <svg
    className="h-5 w-5"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    viewBox="0 0 24 24"
  >
    <circle cx="12" cy="12" r="9" />
    <path
      strokeLinecap="round"
      d="M12 11v5"
    />
    <path
      strokeLinecap="round"
      d="M12 8h.01"
    />
  </svg>
</button>

                  {/* Complete */}
                  <button
                    onClick={() => onToggleTodo(todo.id)}
                    className={`
                      hidden rounded-lg
                      px-3.5 py-2
                      text-sm font-semibold
                      sm:block

                      ${
                        todo.completed
                          ? 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                          : 'bg-green-600 text-white hover:bg-green-700'
                      }
                    `}
                  >
                    {todo.completed ? 'Undo' : 'Complete'}
                  </button>

                  {/* Delete */}
                  <button
                    onClick={() => onDeleteTodo(todo.id)}
                    className="
                      flex h-9 w-9
                      items-center justify-center
                      rounded-lg
                      text-gray-400
                      transition-all
                      hover:bg-red-50
                      hover:text-red-600
                    "
                    title="Delete Todo"
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
            )}
          </div>
        )
      })}
      {selectedTodo && (
  <div className="
    fixed inset-0 z-50
    flex items-center justify-center
    bg-black/40
    px-4
  ">
    <div className="
      w-full max-w-lg
      max-h-[80vh]
      overflow-y-auto
      rounded-2xl
      bg-white
      p-6
      shadow-2xl
    ">

      {/* Header */}
      <div className="flex items-center justify-between mb-6">

        <div>
          <h2 className="text-xl font-bold text-gray-900">
            Todo Details
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            {selectedTodo.title}
          </p>
        </div>

        <button
          onClick={() => setSelectedTodo(null)}
          className="
            flex h-8 w-8
            items-center justify-center
            rounded-lg
            text-gray-400
            hover:bg-gray-100
            hover:text-gray-700
          "
        >
          ✕
        </button>

      </div>

      {/* Todo Information */}
      <div className="
        mb-6
        rounded-xl
        bg-gray-50
        p-4
      ">
        <div className="flex flex-wrap gap-2">

          <span className="
            rounded-full
            bg-gray-200
            px-3 py-1
            text-xs font-semibold
            text-gray-700
          ">
            {selectedTodo.completed
              ? "Completed"
              : "Active"}
          </span>

          <span className="
            rounded-full
            bg-blue-50
            px-3 py-1
            text-xs font-semibold
            text-blue-600
          ">
            {selectedTodo.category || "Other"}
          </span>

          <span className="
            rounded-full
            bg-red-50
            px-3 py-1
            text-xs font-semibold
            text-red-600
          ">
            {selectedTodo.priority}
          </span>

        </div>
      </div>

      {/* Activity */}
      <div>
        <h3 className="
          mb-4
          text-sm
          font-bold
          uppercase
          tracking-wide
          text-gray-700
        ">
          Activity History
        </h3>

        <div className="space-y-4">

          {(selectedTodo.activity || []).length > 0 ? (
            selectedTodo.activity
              .slice()
              .reverse()
              .map((activity) => (
                <div
                  key={activity.id}
                  className="
                    flex gap-3
                    rounded-xl
                    border border-gray-100
                    p-3
                  "
                >
                  <div className="
                    mt-1
                    h-2.5 w-2.5
                    shrink-0
                    rounded-full
                    bg-blue-500
                  " />

                  <div>
                    <p className="
                      text-sm
                      font-medium
                      text-gray-800
                    ">
                      {activity.message}
                    </p>

                    <p className="
                      mt-1
                      text-xs
                      text-gray-400
                    ">
                      {activity.timestamp}
                    </p>
                  </div>
                </div>
              ))
          ) : (
            <p className="text-sm text-gray-400">
              No activity yet.
            </p>
          )}

        </div>
      </div>

      {/* Close */}
      <button
        onClick={() => setSelectedTodo(null)}
        className="
          mt-6
          w-full
          rounded-lg
          bg-gray-900
          px-4 py-2.5
          text-sm
          font-semibold
          text-white
          hover:bg-gray-800
        "
      >
        Close
      </button>

    </div>
  </div>
)}
    </div>
  )
}

export default TodoList