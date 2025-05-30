import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { 
  ArrowLeft, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Edit, 
  Trash2,
  User,
  CheckCircle,
  XCircle
} from 'lucide-react';

interface UserData {
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

// Mock data - same as in UserList
const mockUsers = [
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

const UserView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  
  useEffect(() => {
    // Simulate API fetch
    setLoading(true);
    setTimeout(() => {
      const foundUser = mockUsers.find(u => u.id === Number(id));
      if (foundUser) {
        setUser(foundUser);
      } else {
        toast.error('User not found');
        navigate('/users');
      }
      setLoading(false);
    }, 800);
  }, [id, navigate]);
  
  const handleDelete = () => {
    setShowDeleteModal(true);
  };
  
  const confirmDelete = () => {
    // In a real app, this would be an API call
    setTimeout(() => {
      toast.success('User deleted successfully');
      navigate('/users');
    }, 500);
  };
  
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }
  
  if (!user) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-neutral-800">User Not Found</h2>
        <p className="mt-2 text-neutral-600">The user you're looking for doesn't exist or has been removed.</p>
        <Link to="/users" className="btn btn-primary mt-4 inline-flex items-center">
          <ArrowLeft size={16} className="mr-2" />
          Back to Users
        </Link>
      </div>
    );
  }
  
  return (
    <div className="space-y-6 animation-fade">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link to="/users" className="btn btn-outline flex items-center">
            <ArrowLeft size={18} className="mr-2" />
            Back to Users
          </Link>
          <h1 className="text-2xl font-bold text-neutral-800">User Details</h1>
        </div>
        
        <div className="flex items-center space-x-2">
          <Link to={`/users/${id}/edit`} className="btn btn-secondary flex items-center">
            <Edit size={16} className="mr-2" />
            Edit
          </Link>
          <button onClick={handleDelete} className="btn btn-danger flex items-center">
            <Trash2 size={16} className="mr-2" />
            Delete
          </button>
        </div>
      </div>
      
      <div className="card">
        <div className="bg-gradient-to-r from-primary-600 to-accent-700 h-48 rounded-t-lg"></div>
        <div className="px-6 pb-6 relative">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Profile Photo */}
            <div className="md:w-1/4 -mt-16 flex flex-col items-center md:items-start">
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white bg-white shadow-md">
                {user.photo_url ? (
                  <img 
                    src={user.photo_url} 
                    alt={user.name} 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-neutral-100">
                    <User size={40} className="text-neutral-400" />
                  </div>
                )}
              </div>
              
              <div className="mt-4 flex flex-col items-center md:items-start">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                  user.status === 'active' 
                    ? 'bg-success-100 text-success-800' 
                    : 'bg-error-100 text-error-800'
                }`}>
                  {user.status === 'active' ? (
                    <CheckCircle size={14} className="mr-1" />
                  ) : (
                    <XCircle size={14} className="mr-1" />
                  )}
                  {user.status === 'active' ? 'Active' : 'Inactive'}
                </span>
              </div>
            </div>
            
            {/* User Information */}
            <div className="md:w-3/4 mt-6 md:mt-0">
              <h2 className="text-2xl font-bold text-neutral-800">{user.name}</h2>
              
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-start">
                    <Mail className="w-5 h-5 text-neutral-500 mt-0.5 mr-3" />
                    <div>
                      <p className="text-sm text-neutral-500 font-medium">Email Address</p>
                      <p className="text-neutral-800">{user.email}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Phone className="w-5 h-5 text-neutral-500 mt-0.5 mr-3" />
                    <div>
                      <p className="text-sm text-neutral-500 font-medium">Phone Number</p>
                      <p className="text-neutral-800">{user.phone || 'Not provided'}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Calendar className="w-5 h-5 text-neutral-500 mt-0.5 mr-3" />
                    <div>
                      <p className="text-sm text-neutral-500 font-medium">Date Created</p>
                      <p className="text-neutral-800">{user.created_at}</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <MapPin className="w-5 h-5 text-neutral-500 mt-0.5 mr-3" />
                    <div>
                      <p className="text-sm text-neutral-500 font-medium">Address</p>
                      <p className="text-neutral-800">{user.address || 'Not provided'}</p>
                      <p className="text-neutral-800">
                        {[user.city, user.country].filter(Boolean).join(', ') || 'Not provided'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 pt-6 border-t border-neutral-200">
                <h3 className="text-lg font-semibold text-neutral-800 mb-4">User Activity</h3>
                <div className="bg-neutral-50 p-4 rounded-lg border border-neutral-200">
                  <p className="text-neutral-600">
                    This is a placeholder for user activity data. In a real application, this section would display:
                  </p>
                  <ul className="list-disc ml-5 mt-2 text-neutral-600">
                    <li>Login history</li>
                    <li>Recent actions</li>
                    <li>System changes</li>
                    <li>Other relevant user activities</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
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
                        Are you sure you want to delete {user.name}? This action cannot be undone.
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

export default UserView;