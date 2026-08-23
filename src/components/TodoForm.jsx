import { useState } from 'react'

function TodoForm({ onAddTodo }) {
  const [title, setTitle] = useState('')
  const [priority, setPriority] = useState('Medium')
  const [category, setCategory] = useState('Other')
  const [error, setError] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()

    if (title.trim() === '') {
      setError(true)
      return
    }

    onAddTodo(
      title.trim(),
      priority,
      category
    )

    setTitle('')
    setPriority('Medium')
    setCategory('Other')
    setError(false)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">

      {/* Title */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Todo
        </label>

        <input
          type="text"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value)
            setError(false)
          }}
          placeholder="Enter a todo..."
          className="w-full px-4 py-3 border border-gray-300 rounded-lg
                     focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {error && (
          <p className="mt-1 text-sm text-red-500">
            Todo title is required
          </p>
        )}
      </div>

      {/* Priority + Category */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

        {/* Priority */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Priority
          </label>

          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg
                       focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Category
          </label>

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg
                       focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Other">Other</option>
          </select>
        </div>

      </div>

      {/* Add Button */}
      <button
        type="submit"
        className="w-full py-3 px-4
                   bg-blue-600 text-white
                   rounded-lg font-semibold
                   hover:bg-blue-700
                   transition-colors"
      >
        Add Todo
      </button>

    </form>
  )
}

export default TodoForm