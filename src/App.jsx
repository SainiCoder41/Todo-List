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