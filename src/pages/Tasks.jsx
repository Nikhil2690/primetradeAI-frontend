import React, { useEffect, useState, useCallback } from 'react';
import { getTasks } from '../api/task';

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTasks = useCallback(async () => {
    try {
      setLoading(true);
      const res = await getTasks();
      setTasks(res.data);
    } catch (err) {
      console.error("Failed to fetch Tasks", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  return (
    <div className="w-full max-w-4xl bg-white shadow-md rounded-lg p-8 self-start mt-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">My Tasks</h1>
        <span className="text-sm text-gray-500">{tasks.length} Tasks Total</span>
      </div>

      <div className="space-y-4">
        {loading ? (
          <div className="text-center py-10 text-gray-500">Loading your tasks...</div>
        ) : tasks.length > 0 ? (
          tasks.map((task) => (
            <div key={task._id} className="p-4 border rounded-lg flex justify-between items-center hover:bg-gray-50 transition-colors">
              <div>
                <h3 className="font-medium text-gray-900">{task.title}</h3>
                <p className="text-sm text-gray-500">{task.description}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                task.completed ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
              }`}>
                {task.completed ? 'Completed' : 'Pending'}
              </span>
            </div>
          ))
        ) : (
          <div className="text-center py-10 border-2 border-dashed border-gray-200 rounded-lg">
            <p className="text-gray-400">No tasks available. Head to the dashboard to create one!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Tasks;