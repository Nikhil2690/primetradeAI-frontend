import React, { useCallback, useEffect, useState } from 'react';
import { getTasks, createTask, updateTask, deleteTask } from '../api/task'; 

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState({ title: '', description: '' });
  const [isEditing, setIsEditing] = useState(false); // Track if we are editing

  const fetchTasks = useCallback(async () => {
    try {
      const res = await getTasks(); 
      setTasks(res.data);
    } catch (err) {
      console.log("Failed to fetch Tasks", err);
    }
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  // Handle both Create and Update
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await updateTask(currentTask._id, currentTask);
      } else {
        await createTask(currentTask);
      }
      closeModal();
      fetchTasks();
    } catch (err) {
      console.log(err)
      alert(isEditing ? "Error updating task" : "Error adding task");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      try {
        await deleteTask(id);
        fetchTasks(); // Refresh list
      } catch (err) {
        console.log(err)
        alert("Error deleting task");
      }
    }
  };

  const openEditModal = (task) => {
    setIsEditing(true);
    setCurrentTask(task);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsEditing(false);
    setCurrentTask({ title: '', description: '' });
  };

  return (
    <div className="p-4 sm:ml-64 pt-20">
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <h3 className="font-bold text-gray-800">Recent Tasks</h3>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg text-sm font-medium"
          >
            + Add Task
          </button>
        </div>

        <div className="p-4 min-h-64 flex flex-col gap-4">
          {tasks?.length > 0 ? (
            tasks.map((task) => (
              <div key={task._id} className="p-4 border rounded-lg bg-gray-50 flex justify-between items-center"> 
                <div>
                  <h2 className="font-semibold text-gray-800">{task.title}</h2>
                  <p className="text-gray-600 text-sm">{task.description}</p>
                </div>
                <div className="flex gap-2">
                  <button 
                    onClick={() => openEditModal(task)}
                    className="text-blue-600 hover:text-blue-800 border px-4 py-2 rounded-md text-lg font-medium cursor-pointer"
                  >
                    Edit
                  </button>
                  <button 
                    onClick={() => handleDelete(task._id)}
                    className="text-red-600 hover:text-red-800 border px-4 py-2 rounded-md text-lg font-medium cursor-pointer"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="h-full flex items-center justify-center text-gray-400">
              <h3>No tasks found.</h3>
            </div>
          )}
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-s60">
          <div className="bg-white p-6 rounded-xl w-full max-w-md shadow-2xl">
            <h2 className="text-xl font-bold mb-4">{isEditing ? 'Edit Task' : 'Add New Task'}</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Title</label>
                <input 
                  type="text" required
                  className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-amber-500"
                  value={currentTask.title}
                  onChange={(e) => setCurrentTask({...currentTask, title: e.target.value})}
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Description</label>
                <textarea 
                  className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-amber-500"
                  value={currentTask.description}
                  onChange={(e) => setCurrentTask({...currentTask, description: e.target.value})}
                />
              </div>
              <div className="flex justify-end gap-2">
                <button type="button" onClick={closeModal} className="px-4 py-2 text-gray-600">Cancel</button>
                <button type="submit" className="bg-amber-600 text-white px-4 py-2 rounded-lg">
                  {isEditing ? 'Update Task' : 'Create Task'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;