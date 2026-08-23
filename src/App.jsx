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
    activity: [
      {
        id: 101,
        type: "created",
        message: "Todo created",
        timestamp: new Date().toLocaleString(),
      },
    ],
  },
  {
    id: 2,
    title: "Review pull request",
    completed: true,
    priority: "Medium",
    category: "Work",
    activity: [
      {
        id: 201,
        type: "created",
        message: "Todo created",
        timestamp: new Date().toLocaleString(),
      },
      {
        id: 202,
        type: "completed",
        message: "Todo completed",
        timestamp: new Date().toLocaleString(),
      },
    ],
  },
  {
    id: 3,
    title: "Fix login page layout",
    completed: false,
    priority: "High",
    category: "Work",
    activity: [
      {
        id: 301,
        type: "created",
        message: "Todo created",
        timestamp: new Date().toLocaleString(),
      },
    ],
  },

  // Continue your other Todos...
]

function App() {
const [todos, setTodos] = useState(initialTodos)
const [searchTerm, setSearchTerm] = useState('')
const [categoryFilter, setCategoryFilter] = useState('All')
const [activityHistory, setActivityHistory] = useState([])

const addTodo = (title, priority, category) => {
  const newTodo = {
    id: Date.now(),
    title,
    completed: false,
    priority,
    category,

    activity: [
      {
        id: Date.now() + 1,
        type: "created",
        message: "Todo created",
        timestamp: new Date().toLocaleString(),
      },
    ],
  }

  setTodos([newTodo, ...todos])
}

const toggleTodo = (id) => {
  setTodos(
    todos.map((todo) => {
      if (todo.id !== id) {
        return todo
      }

      const newCompleted = !todo.completed

      const newActivity = {
        id: Date.now(),
        type: newCompleted ? 'completed' : 'reopened',
        message: newCompleted
          ? 'Todo completed'
          : 'Todo marked as active',
        timestamp: new Date().toLocaleString(),
      }

      return {
        ...todo,
        completed: newCompleted,
        activity: [
          ...(todo.activity || []),
          newActivity,
        ],
      }
    })
  )
}

const deleteTodo = (id) => {
  const todo = todos.find((todo) => todo.id === id)

  if (!todo) {
    return
  }

  const deleteActivity = {
    id: Date.now(),
    todoId: id,
    type: "deleted",
    message: "Todo deleted",
    timestamp: new Date().toLocaleString(),
  }

  setActivityHistory([
    ...activityHistory,
    {
      ...deleteActivity,
      todoTitle: todo.title,
    },
  ])

  setTodos(todos.filter((todo) => todo.id !== id))
}
const updateTodo = (id, updatedData) => {
  setTodos(
    todos.map((todo) => {
      if (todo.id !== id) {
        return todo
      }

      const activities = [
        ...(todo.activity || []),
      ]

      // Title changed
      if (
        updatedData.title !== undefined &&
        updatedData.title !== todo.title
      ) {
        activities.push({
          id: Date.now(),
          type: "edited",
          message: "Todo edited",
          timestamp: new Date().toLocaleString(),
        })
      }

      // Priority changed
      if (
        updatedData.priority !== undefined &&
        updatedData.priority !== todo.priority
      ) {
        activities.push({
          id: Date.now() + 1,
          type: "priority_changed",
          message: `Priority changed from ${todo.priority} to ${updatedData.priority}`,
          timestamp: new Date().toLocaleString(),
        })
      }

      // Category changed
      if (
        updatedData.category !== undefined &&
        updatedData.category !== todo.category
      ) {
        activities.push({
          id: Date.now() + 2,
          type: "category_changed",
          message: `Category changed from ${
            todo.category || "Other"
          } to ${updatedData.category}`,
          timestamp: new Date().toLocaleString(),
        })
      }

      return {
        ...todo,
        ...updatedData,
        activity: activities,
      }
    })
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