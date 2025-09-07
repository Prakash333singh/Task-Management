import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import axios from "axios"

const Dashboard = () => {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const [pagination, setPagination] = useState({})
  const [deletingTask, setDeletingTask] = useState(null)

  const fetchTasks = async (page = 1, search = "", status = "") => {
    try {
      setLoading(true)
      const response = await axios.get("https://task-management-iota-sandy.vercel.app/api/tasks", {
        params: { page, limit: 10, search, status },
      })
      setTasks(response.data.tasks)
      setPagination(response.data.pagination)
      setError("")
    } catch (err) {
      setError("Failed to fetch tasks")
      console.error("Fetch tasks error:", err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTasks(currentPage, searchTerm, statusFilter)
  }, [currentPage])

  const handleSearch = (e) => {
    e.preventDefault()
    setCurrentPage(1)
    fetchTasks(1, searchTerm, statusFilter)
  }

  const handleStatusFilter = (status) => {
    setStatusFilter(status)
    setCurrentPage(1)
    fetchTasks(1, searchTerm, status)
  }

  const handleDeleteTask = async (taskId) => {
    if (!window.confirm("Are you sure you want to delete this task?")) return

    try {
      setDeletingTask(taskId)
      await axios.delete(`https://task-management-iota-sandy.vercel.app/api/tasks/${taskId}`)
      fetchTasks(currentPage, searchTerm, statusFilter)
    } catch (err) {
      setError("Failed to delete task")
      console.error("Delete task error:", err)
    } finally {
      setDeletingTask(null)
    }
  }

  const handleToggleStatus = async (taskId, currentStatus) => {
    try {
      const newStatus = currentStatus === "pending" ? "done" : "pending"
      await axios.put(`https://task-management-iota-sandy.vercel.app/api/tasks/${taskId}`, { status: newStatus })
      fetchTasks(currentPage, searchTerm, statusFilter)
    } catch (err) {
      setError("Failed to update task status")
      console.error("Update task error:", err)
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-200 via-gray-400 to-black py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-10 text-center">
          <h1 className="text-5xl font-extrabold text-black drop-shadow-lg">
            Dashboard
          </h1>
          <p className="mt-2 text-black">
            Track, manage, and complete your tasks with ease.
          </p>
        </div>

        {/* Search & Filters */}
        <div className="bg-white/80 backdrop-blur-md p-6 rounded-2xl shadow-lg border mb-6">
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4">
            <input
              type="text"
              placeholder="Search tasks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
            />
            <div className="flex gap-2">
              <button
                type="submit"
                className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Search
              </button>
              <button
                type="button"
                onClick={() => {
                  setSearchTerm("")
                  setStatusFilter("all")
                  setCurrentPage(1)
                  fetchTasks(1, "", "all")
                }}
                className="px-5 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition"
              >
                Clear
              </button>
            </div>
          </form>

          {/* Status Filter */}
          <div className="mt-4 flex gap-3 flex-wrap">
            {["all", "pending", "done"].map((status) => (
              <button
                key={status}
                onClick={() => handleStatusFilter(status)}
                className={`px-4 py-1 text-sm rounded-full capitalize transition ${statusFilter === status
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        {/* Tasks */}
        <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg border">
          {loading ? (
            <div className="p-10 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading tasks...</p>
            </div>
          ) : tasks.length === 0 ? (
            <div className="p-10 text-center">
              <p className="text-gray-600 mb-4">No tasks found</p>
              <Link
                to="/tasks/new"
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Create your first task
              </Link>
            </div>
          ) : (
            <>
              <div className="divide-y divide-gray-500">
                {tasks.map((task) => (
                  <div
                    key={task._id}
                    className="p-6 hover:bg-gray-50 transition rounded-xl"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold text-gray-900">
                            {task.title}
                          </h3>
                          <span
                            className={`px-3 py-1 text-xs font-medium rounded-full ${task.status === "done"
                                ? "bg-green-100 text-green-800"
                                : "bg-yellow-100 text-yellow-800"
                              }`}
                          >
                            {task.status}
                          </span>
                        </div>
                        {task.description && (
                          <p className="text-gray-600 mb-2">{task.description}</p>
                        )}
                        <p className="text-sm text-gray-500">
                          Created: {formatDate(task.createdAt)}
                        </p>
                      </div>
                      <div className="flex gap-2 ml-4">
                        <button
                          onClick={() => handleToggleStatus(task._id, task.status)}
                          className={`px-4 py-1 text-sm rounded-lg transition ${task.status === "done"
                              ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
                              : "bg-green-100 text-green-800 hover:bg-green-200"
                            }`}
                        >
                          {task.status === "done" ? "Mark Pending" : "Mark Done"}
                        </button>
                        <Link
                          to={`/tasks/${task._id}/edit`}
                          className="px-4 py-1 text-sm bg-blue-100 text-blue-800 rounded-lg hover:bg-blue-200 transition"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => handleDeleteTask(task._id)}
                          disabled={deletingTask === task._id}
                          className="px-4 py-1 text-sm bg-red-100 text-red-800 rounded-lg hover:bg-red-200 transition disabled:opacity-50"
                        >
                          {deletingTask === task._id ? "Deleting..." : "Delete"}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {pagination.totalPages > 1 && (
                <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
                  <p className="text-sm text-gray-700">
                    Showing {tasks.length} of {pagination.totalTasks} tasks
                  </p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setCurrentPage(currentPage - 1)
                        fetchTasks(currentPage - 1, searchTerm, statusFilter)
                      }}
                      disabled={!pagination.hasPrev}
                      className="px-4 py-1 text-sm border border-gray-300 rounded-lg hover:bg-gray-100 disabled:opacity-50"
                    >
                      Previous
                    </button>
                    <span className="px-3 py-1 text-sm text-gray-700">
                      Page {pagination.currentPage} of {pagination.totalPages}
                    </span>
                    <button
                      onClick={() => {
                        setCurrentPage(currentPage + 1)
                        fetchTasks(currentPage + 1, searchTerm, statusFilter)
                      }}
                      disabled={!pagination.hasNext}
                      className="px-4 py-1 text-sm border border-gray-300 rounded-lg hover:bg-gray-100 disabled:opacity-50"
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default Dashboard
