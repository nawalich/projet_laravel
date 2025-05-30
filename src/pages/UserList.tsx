import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { 
  Search, 
  UserPlus, 
  Filter, 
  Eye, 
  Edit, 
  Trash2,
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  XCircle
} from 'lucide-react';

interface User {
  id: number;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  city?: string;
  country?: string;
  status: 'active' | 'inactive';
  created_at: string;
  photo_url?: string;
}

// Mock data
const mockUsers: User[] = [
  { 
    id: 1, 
    name: 'John Doe', 
    email: 'john@example.com', 
    phone: '+1 (555) 123-4567',
    address: '123 Main St',
    city: 'New York',
    country: 'USA',
    created_at: '2023-01-15', 
    status: 'active',
    photo_url: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  { 
    id: 2, 
    name: 'Jane Smith', 
    email: 'jane@example.com',
    phone: '+1 (555) 987-6543',
    address: '456 Oak Ave',
    city: 'Boston',
    country: 'USA', 
    created_at: '2023-02-20', 
    status: 'active',
    photo_url: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  { 
    id: 3, 
    name: 'Robert Johnson', 
    email: 'robert@example.com',
    phone: '+1 (555) 234-5678',
    address: '789 Pine St',
    city: 'Chicago',
    country: 'USA', 
    created_at: '2023-03-10', 
    status: 'inactive',
    photo_url: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  { 
    id: 4, 
    name: 'Emily Davis', 
    email: 'emily@example.com', 
    phone: '+1 (555) 345-6789',
    address: '101 Maple Rd',
    city: 'San Francisco',
    country: 'USA',
    created_at: '2023-04-05', 
    status: 'active',
    photo_url: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  { 
    id: 5, 
    name: 'Michael Brown', 
    email: 'michael@example.com',
    phone: '+1 (555) 456-7890',
    address: '202 Cedar Blvd',
    city: 'Los Angeles',
    country: 'USA', 
    created_at: '2023-05-22', 
    status: 'active',
    photo_url: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  { 
    id: 6, 
    name: 'Sarah Wilson', 
    email: 'sarah@example.com',
    phone: '+1 (555) 567-8901',
    address: '303 Birch St',
    city: 'Seattle',
    country: 'USA', 
    created_at: '2023-06-18', 
    status: 'inactive' 
  },
  { 
    id: 7, 
    name: 'David Taylor', 
    email: 'david@example.com',
    phone: '+1 (555) 678-9012',
    address: '404 Elm St',
    city: 'Miami',
    country: 'USA', 
    created_at: '2023-07-30', 
    status: 'active' 
  },
];

const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'inactive'>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [loading, setLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);

  useEffect(() => {
    // Simulate API fetch
    setTimeout(() => {
      setUsers(mockUsers);
      setFilteredUsers(mockUsers);
      setLoading(false);
    }, 800);
  }, []);

  useEffect(() => {
    // Apply filters
    let result = users;
    
    // Search filter
    if (searchTerm) {
      result = result.filter(user => 
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Status filter
    if (filterStatus !== 'all') {
      result = result.filter(user => user.status === filterStatus);
    }
    
    setFilteredUsers(result);
    setCurrentPage(1); // Reset to first page on filter change
  }, [searchTerm, filterStatus, users]);

  // Get current users for pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

  const handleDelete = (user: User) => {
    setUserToDelete(user);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (!userToDelete) return;
    
    // Filter out the user to delete
    const updatedUsers = users.filter(user => user.id !== userToDelete.id);
    setUsers(updatedUsers);
    
    toast.success(`User ${userToDelete.name} deleted successfully`);
    setShowDeleteModal(false);
    setUserToDelete(null);
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="space-y-6 animation-fade">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-bold text-neutral-800">User Management</h1>
        <Link to="/form" className="btn btn-primary flex items-center self-start">
          <UserPlus size={18} className="mr-2" />
          Add New User
        </Link>
      </div>
      
      {/* Filters */}
      <div className="card p-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={18} className="text-neutral-400" />
            </div>
            <input
              type="text"
              placeholder="Search users..."
              className="form-input pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <div className="flex items-center">
              <Filter size={16} className="mr-2 text-neutral-500" />
              <span className="text-sm text-neutral-600 mr-2">Status:</span>
            </div>
            <select
              className="form-input py-2"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as 'all' | 'active' | 'inactive')}
            >
              <option value="all">All</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>
      </div>
      
      {/* User Table */}
      <div className="card overflow-hidden">
        {loading ? (
          <div className="p-8 flex justify-center">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary-500"></div>
          </div>
        ) : filteredUsers.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-neutral-600">No users found matching your filters.</p>
            <button 
              className="mt-4 btn btn-outline"
              onClick={() => {
                setSearchTerm('');
                setFilterStatus('all');
              }}
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-neutral-200">
                <thead className="bg-neutral-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                      User
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                      Date Created
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-neutral-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-neutral-200">
                  {currentUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-neutral-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-10 w-10 flex-shrink-0">
                            <div className="h-10 w-10 rounded-full overflow-hidden bg-neutral-200">
                              {user.photo_url ? (
                                <img
                                  src={user.photo_url}
                                  alt={user.name}
                                  className="h-full w-full object-cover"
                                />
                              ) : (
                                <div className="h-full w-full flex items-center justify-center">
                                  <span className="text-neutral-500 text-sm font-medium">
                                    {user.name.split(' ').map(n => n[0]).join('')}
                                  </span>
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-neutral-900">{user.name}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-neutral-600">{user.email}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          user.status === 'active' 
                            ? 'bg-success-100 text-success-800' 
                            : 'bg-error-100 text-error-800'
                        }`}>
                          {user.status === 'active' ? (
                            <CheckCircle size={12} className="mr-1" />
                          ) : (
                            <XCircle size={12} className="mr-1" />
                          )}
                          {user.status === 'active' ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-600">
                        {user.created_at}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center justify-end space-x-2">
                          <Link 
                            to={`/users/${user.id}`}
                            className="text-primary-600 hover:text-primary-800 p-1"
                            title="View"
                          >
                            <Eye size={18} />
                          </Link>
                          <Link 
                            to={`/users/${user.id}/edit`}
                            className="text-secondary-600 hover:text-secondary-800 p-1"
                            title="Edit"
                          >
                            <Edit size={18} />
                          </Link>
                          <button 
                            onClick={() => handleDelete(user)}
                            className="text-error-600 hover:text-error-800 p-1"
                            title="Delete"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {/* Pagination */}
            {totalPages > 1 && (
              <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-neutral-200 sm:px-6">
                <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm text-neutral-700">
                      Showing <span className="font-medium">{indexOfFirstItem + 1}</span> to{' '}
                      <span className="font-medium">
                        {Math.min(indexOfLastItem, filteredUsers.length)}
                      </span>{' '}
                      of <span className="font-medium">{filteredUsers.length}</span> results
                    </p>
                  </div>
                  <div>
                    <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                      <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-neutral-300 bg-white text-sm font-medium ${
                          currentPage === 1
                            ? 'text-neutral-300 cursor-not-allowed'
                            : 'text-neutral-500 hover:bg-neutral-50'
                        }`}
                      >
                        <ChevronLeft size={18} />
                      </button>
                      
                      {Array.from({ length: totalPages }).map((_, index) => (
                        <button
                          key={index}
                          onClick={() => handlePageChange(index + 1)}
                          className={`relative inline-flex items-center px-4 py-2 border border-neutral-300 bg-white text-sm font-medium ${
                            currentPage === index + 1
                              ? 'z-10 bg-primary-50 border-primary-500 text-primary-600'
                              : 'text-neutral-500 hover:bg-neutral-50'
                          }`}
                        >
                          {index + 1}
                        </button>
                      ))}
                      
                      <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-neutral-300 bg-white text-sm font-medium ${
                          currentPage === totalPages
                            ? 'text-neutral-300 cursor-not-allowed'
                            : 'text-neutral-500 hover:bg-neutral-50'
                        }`}
                      >
                        <ChevronRight size={18} />
                      </button>
                    </nav>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
      
      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center">
            <div className="fixed inset-0 bg-neutral-900 bg-opacity-50 transition-opacity" onClick={() => setShowDeleteModal(false)}></div>
            
            <div className="relative inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-error-100 sm:mx-0 sm:h-10 sm:w-10">
                    <Trash2 className="h-6 w-6 text-error-600" />
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-neutral-900">Delete User</h3>
                    <div className="mt-2">
                      <p className="text-sm text-neutral-500">
                        Are you sure you want to delete {userToDelete?.name}? This action cannot be undone.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-neutral-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="btn btn-danger w-full sm:w-auto sm:ml-3"
                  onClick={confirmDelete}
                >
                  Delete
                </button>
                <button
                  type="button"
                  className="btn btn-outline mt-3 sm:mt-0 w-full sm:w-auto"
                  onClick={() => setShowDeleteModal(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserList;