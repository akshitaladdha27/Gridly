import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../api/axiosInstance';
import toast from 'react-hot-toast';
import { LogOut, Plus, Search, Trash2, CheckCircle, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Task {
  _id: string;
  title: string;
  description: string;
  status: string;
}

const Dashboard = () => {
  const { user, logout, loading } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [newTask, setNewTask] = useState({ title: '', description: '' });
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();        
    navigate("/login"); 
  };

  useEffect(() => {
    if (!loading && user) {
      fetchTasks();
    }
  }, [loading, user]);

  const fetchTasks = async () => {
    try {
        const res = await api.get('/tasks');
        setTasks(res.data);
    } catch {
        toast.error('Failed to load tasks');
    }
    };

  useEffect(() => {
    fetchTasks();
  }, []);


  const handleCreateTask = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await api.post('/tasks', newTask);
      setTasks(prev => [res.data, ...prev]);
      setNewTask({ title: '', description: '' });
    } catch (err) {
      toast.error('Failed to add task');
    }
  };

  const handleDeleteTask = async (id: string) => {
    try {
      await api.delete(`/tasks/${id}`);
      setTasks(prev => prev.filter(t => t._id !== id));
    } catch (err) {
      toast.error('Delete failed');
    }
  };

  const handleToggleStatus = async (task: Task) => {
  try {
    const newStatus = task.status === 'completed' ? 'pending' : 'completed';
    
    const res = await api.put(`/tasks/${task._id}`, {
      status: newStatus
    });

    setTasks(prev =>
        prev.map(t => (t._id === task._id ? res.data : t))
    );

    toast.success(`Task marked as ${newStatus}`);
  } catch (err) {
    toast.error('Failed to update status');
  }
};

  const filteredTasks = tasks.filter(task => 
    task.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-blue-100">
      <nav className="bg-blue-950 shadow-sm px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-purple-600">Dashboard</h1>
        <div className="flex items-center gap-4">
          <span className="text-gray-300 font-medium capitalize">Hello, {user?.name}</span>
          <button onClick={handleLogout}  className="flex items-center text-gray-100 hover:text-gray-300">
            <LogOut className="h-3 w-3 mr-1" /> Logout
          </button>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="md:col-span-2 bg-white p-6 rounded-xl shadow-sm">
            <h3 className="text-lg font-semibold mb-4">Add New Task</h3>
            <form onSubmit={handleCreateTask} className="space-y-3">
              <input 
                className="w-full border p-2 rounded-md outline-none focus:ring-2 focus:ring-blue-900" 
                placeholder="Task Title"
                value={newTask.title}
                onChange={(e) => setNewTask({...newTask, title: e.target.value})}
                required
              />
              <textarea 
                className="w-full border p-2 rounded-md outline-none focus:ring-2 focus:ring-blue-900" 
                placeholder="Description"
                value={newTask.description}
                onChange={(e) => setNewTask({...newTask, description: e.target.value})}
              />
              <button className="bg-blue-900 text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-blue-800 transition">
                <Plus className="h-4 w-4" /> Add Task
              </button>
            </form>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="text-lg font-semibold mb-4">Search & Filter</h3>
            <div className="relative">
              <Search className="absolute left-3 top-3 text-gray-400 h-5 w-5" />
              <input 
                className="w-full pl-10 border p-2 rounded-md outline-none focus:ring-2 focus:ring-blue-900" 
                placeholder="Filter by title..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTasks.map(task => (
            <div key={task._id} className="bg-white p-5 rounded-xl border-l-4 border-blue-900 shadow-sm hover:shadow-md transition">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-bold text-gray-800">{task.title}</h4>
                <button onClick={() => handleDeleteTask(task._id)} className="text-gray-400 hover:text-green-500">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
              <p className="text-sm text-gray-600 mb-4">{task.description}</p>
                <div 
                onClick={() => handleToggleStatus(task)}
                className={`flex items-center gap-2 text-xs font-semibold uppercase cursor-pointer p-1 rounded transition ${
                    task.status === 'completed' 
                    ? 'text-blue-950 bg-blue-50 hover:bg-blue-100' 
                    : 'text-purple-600 bg-purple-50 hover:bg-purple-100'
                }`}
                >
                {task.status === 'completed' ? (
                    <CheckCircle className="h-4 w-4" />
                ) : (
                    <Clock className="h-4 w-4" />
                )}
                {task.status}
                </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;