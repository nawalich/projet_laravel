import React, { useState, useEffect } from 'react';
import { 
  Users, 
  UserPlus, 
  UserMinus,
  ActivitySquare,
  TrendingUp,
  Calendar
} from 'lucide-react';
import { Bar, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

// Mock data
const mockUsers = [
  { id: 1, name: 'John Doe', email: 'john@example.com', created_at: '2023-01-15', status: 'active' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', created_at: '2023-02-20', status: 'active' },
  { id: 3, name: 'Robert Johnson', email: 'robert@example.com', created_at: '2023-03-10', status: 'inactive' },
  { id: 4, name: 'Emily Davis', email: 'emily@example.com', created_at: '2023-04-05', status: 'active' },
  { id: 5, name: 'Michael Brown', email: 'michael@example.com', created_at: '2023-05-22', status: 'active' },
  { id: 6, name: 'Sarah Wilson', email: 'sarah@example.com', created_at: '2023-06-18', status: 'inactive' },
  { id: 7, name: 'David Taylor', email: 'david@example.com', created_at: '2023-07-30', status: 'active' },
];

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeUsers: 0,
    inactiveUsers: 0,
    newUsersThisMonth: 0
  });

  useEffect(() => {
    // Calculate statistics from mock data
    const activeUsers = mockUsers.filter(user => user.status === 'active').length;
    const inactiveUsers = mockUsers.filter(user => user.status === 'inactive').length;
    
    // Calculate new users this month
    const today = new Date();
    const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const newUsersThisMonth = mockUsers.filter(user => {
      const createdAt = new Date(user.created_at);
      return createdAt >= firstDayOfMonth;
    }).length;
    
    setStats({
      totalUsers: mockUsers.length,
      activeUsers,
      inactiveUsers,
      newUsersThisMonth
    });
  }, []);

  // Bar chart data - User registrations by month
  const barChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [
      {
        label: 'New Users',
        data: [1, 1, 1, 1, 1, 1, 1], // One user per month based on mock data
        backgroundColor: 'rgba(59, 130, 246, 0.7)',
        borderColor: 'rgba(59, 130, 246, 1)',
        borderWidth: 1,
      },
    ],
  };

  // Doughnut chart data - User status
  const doughnutChartData = {
    labels: ['Active', 'Inactive'],
    datasets: [
      {
        data: [stats.activeUsers, stats.inactiveUsers],
        backgroundColor: [
          'rgba(16, 185, 129, 0.7)', // Success color for active
          'rgba(239, 68, 68, 0.7)',   // Error color for inactive
        ],
        borderColor: [
          'rgba(16, 185, 129, 1)',
          'rgba(239, 68, 68, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-neutral-800">Dashboard</h1>
        <div className="flex items-center space-x-2">
          <button className="btn btn-outline flex items-center">
            <Calendar size={16} className="mr-2" />
            Today
          </button>
        </div>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-neutral-500">Total Users</p>
              <h3 className="text-3xl font-bold text-neutral-800 mt-1">{stats.totalUsers}</h3>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Users size={24} className="text-primary-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <TrendingUp size={16} className="text-success-500 mr-1" />
            <span className="text-success-700 font-medium">+12.5%</span>
            <span className="text-neutral-500 ml-1">from last month</span>
          </div>
        </div>
        
        <div className="card p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-neutral-500">Active Users</p>
              <h3 className="text-3xl font-bold text-neutral-800 mt-1">{stats.activeUsers}</h3>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <UserPlus size={24} className="text-success-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <TrendingUp size={16} className="text-success-500 mr-1" />
            <span className="text-success-700 font-medium">+8.2%</span>
            <span className="text-neutral-500 ml-1">from last month</span>
          </div>
        </div>
        
        <div className="card p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-neutral-500">Inactive Users</p>
              <h3 className="text-3xl font-bold text-neutral-800 mt-1">{stats.inactiveUsers}</h3>
            </div>
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <UserMinus size={24} className="text-error-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <TrendingUp size={16} className="text-error-500 mr-1 transform rotate-180" />
            <span className="text-error-700 font-medium">-3.1%</span>
            <span className="text-neutral-500 ml-1">from last month</span>
          </div>
        </div>
        
        <div className="card p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-neutral-500">New This Month</p>
              <h3 className="text-3xl font-bold text-neutral-800 mt-1">{stats.newUsersThisMonth}</h3>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <ActivitySquare size={24} className="text-accent-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <TrendingUp size={16} className="text-success-500 mr-1" />
            <span className="text-success-700 font-medium">+22.5%</span>
            <span className="text-neutral-500 ml-1">from last month</span>
          </div>
        </div>
      </div>
      
      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="card p-6 lg:col-span-2">
          <h3 className="text-lg font-semibold text-neutral-800 mb-4">User Registration Trend</h3>
          <div className="h-80">
            <Bar 
              data={barChartData} 
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: 'top' as const,
                  },
                },
                scales: {
                  y: {
                    beginAtZero: true,
                    ticks: {
                      precision: 0
                    }
                  }
                }
              }} 
            />
          </div>
        </div>
        
        <div className="card p-6">
          <h3 className="text-lg font-semibold text-neutral-800 mb-4">User Status</h3>
          <div className="h-80 flex items-center justify-center">
            <Doughnut 
              data={doughnutChartData} 
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: 'bottom' as const,
                  }
                }
              }} 
            />
          </div>
        </div>
      </div>
      
      {/* Recent Users */}
      <div className="card p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-neutral-800">Recent Users</h3>
          <a href="/users" className="text-sm text-primary-600 hover:text-primary-700 font-medium">
            View All
          </a>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-neutral-200">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Date Joined
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200">
              {mockUsers.slice(0, 5).map((user) => (
                <tr key={user.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-neutral-800">{user.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-neutral-600">
                    {user.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-neutral-600">
                    {user.created_at}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      user.status === 'active' 
                        ? 'bg-success-100 text-success-800' 
                        : 'bg-error-100 text-error-800'
                    }`}>
                      {user.status === 'active' ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;