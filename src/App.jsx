import { useState } from 'react'
import TodoForm from './components/TodoForm'
import TodoList from './components/TodoList'

const initialTodos = [
  {
    id: 1,
    title: "Complete GitHub assignment",
    completed: false,
    priority: "High",
    category: "Work",
  },
  {
    id: 2,
    title: "Review pull request",
    completed: true,
    priority: "Medium",
    category: "Work",
  },
  {
    id: 3,
    title: "Fix login page layout",
    completed: false,
    priority: "High",
    category: "Work",
  },
  {
    id: 4,
    title: "Update project documentation",
    completed: false,
    priority: "Low",
    category: "Other",
  },
  {
    id: 5,
    title: "Write unit tests",
    completed: true,
    priority: "Medium",
    category: "Work",
  },
  {
    id: 6,
    title: "Deploy the application",
    completed: false,
    priority: "High",
    category: "Work",
  },
]

function App() {
const [todos, setTodos] = useState(initialTodos)
const [searchTerm, setSearchTerm] = useState('')
const [categoryFilter, setCategoryFilter] = useState('All')

const addTodo = (title, priority, category) => {
  const newTodo = {
    id: Date.now(),
    title,
    completed: false,
    priority,
    category,
  }

  setTodos([newTodo, ...todos])
}

  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id
          ? { ...todo, completed: !todo.completed }
          : todo
      )
    )
  }

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id))
  }
  const updateTodo = (id, updatedData) => {
  setTodos(
    todos.map((todo) =>
      todo.id === id
        ? { ...todo, ...updatedData }
        : todo
    )
  )
}

const filteredTodos = todos.filter((todo) => {
  const matchesSearch = todo.title
    .toLowerCase()
    .includes(searchTerm.toLowerCase())

  const matchesCategory =
    categoryFilter === 'All' ||
    (todo.category || 'Other') === categoryFilter

  return matchesSearch && matchesCategory
})
const totalTodos = todos.length

const activeTodos = todos.filter(
  (todo) => !todo.completed
).length

const completedTodos = todos.filter(
  (todo) => todo.completed
).length

const highPriorityTodos = todos.filter(
  (todo) => todo.priority === 'High' && !todo.completed
).length

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">

        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-2">
            Todo Manager
          </h1>

          <p className="text-lg text-gray-500">
            Manage your tasks and stay productive.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
          <TodoForm onAddTodo={addTodo} />
        </div>

       <div className="mb-6 flex flex-col sm:flex-row gap-3">

  {/* Search */}
  <input
    type="text"
    placeholder="Search todos..."
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg
               focus:outline-none focus:ring-2 focus:ring-blue-500
               focus:border-transparent"
  />

  {/* Category Filter */}
  <select
    value={categoryFilter}
    onChange={(e) => setCategoryFilter(e.target.value)}
    className="px-4 py-3 border border-gray-300 rounded-lg
               bg-white
               focus:outline-none focus:ring-2 focus:ring-blue-500"
  >
    <option value="All">All Categories</option>
    <option value="Work">Work</option>
    <option value="Personal">Personal</option>
    <option value="Other">Other</option>
  </select>

</div>
        

      {/* Statistics */}
<div className="grid grid-cols-2 gap-4 mb-8 sm:grid-cols-4">

  {/* Total */}
  <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
    <p className="text-sm font-medium text-gray-500">
      Total
    </p>
    <p className="mt-1 text-2xl font-bold text-gray-900">
      {totalTodos}
    </p>
  </div>

  {/* Active */}
  <div className="rounded-2xl border border-blue-100 bg-blue-50 p-4">
    <p className="text-sm font-medium text-blue-600">
      Active
    </p>
    <p className="mt-1 text-2xl font-bold text-blue-700">
      {activeTodos}
    </p>
  </div>

  {/* Completed */}
  <div className="rounded-2xl border border-green-100 bg-green-50 p-4">
    <p className="text-sm font-medium text-green-600">
      Completed
    </p>
    <p className="mt-1 text-2xl font-bold text-green-700">
      {completedTodos}
    </p>
  </div>

  {/* High Priority */}
  <div className="rounded-2xl border border-red-100 bg-red-50 p-4">
    <p className="text-sm font-medium text-red-600">
      High Priority
    </p>
    <p className="mt-1 text-2xl font-bold text-red-700">
      {highPriorityTodos}
    </p>
  </div>

</div>

{/* Todo List */}
{filteredTodos.length > 0 ? (
  <TodoList
    todos={filteredTodos}
    onToggleTodo={toggleTodo}
    onDeleteTodo={deleteTodo}
    onUpdateTodo={updateTodo}
  />
) : (
  <div className="text-center py-8 text-gray-500">
    No todos found matching "{searchTerm}"
  </div>
)}

      </div>
    </div>
  )
}

export default App