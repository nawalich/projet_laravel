import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { 
  Save, 
  X, 
  Upload, 
  ArrowLeft,
  User
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
  // Utilisateurs existants...
  
  // Utilisateurs du Maroc
  { 
    id: 8, 
    name: 'Hassan Alaoui', 
    email: 'hassan.alaoui@example.com',
    phone: '+212 6-12-345678',
    address: '15 Avenue Mohammed V',
    city: 'Casablanca',
    country: 'Maroc',
    created_at: '2024-01-15',
    status: 'active',
    photo_url: 'https://images.pexels.com/photos/2269872/pexels-photo-2269872.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  { 
    id: 9, 
    name: 'Fatima Bennis', 
    email: 'fatima.bennis@example.com',
    phone: '+212 6-98-765432',
    address: '23 Rue Ibn Sina',
    city: 'Rabat',
    country: 'Maroc',
    created_at: '2024-02-01',
    status: 'active'
  },

  // Utilisateurs de France
  { 
    id: 10, 
    name: 'Sophie Dubois', 
    email: 'sophie.dubois@example.com',
    phone: '+33 6 12 34 56 78',
    address: '25 Rue du Commerce',
    city: 'Paris',
    country: 'France',
    created_at: '2024-01-20',
    status: 'active',
    photo_url: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  { 
    id: 11, 
    name: 'Pierre Martin', 
    email: 'pierre.martin@example.com',
    phone: '+33 6 98 76 54 32',
    address: '45 Avenue des Champs',
    city: 'Lyon',
    country: 'France',
    created_at: '2024-02-05',
    status: 'active'
  },

  // Utilisateurs de Belgique
  { 
    id: 12, 
    name: 'Luc Vandenberg', 
    email: 'luc.vandenberg@example.com',
    phone: '+32 470 12 34 56',
    address: '78 Rue de la Loi',
    city: 'Bruxelles',
    country: 'Belgique',
    created_at: '2024-01-25',
    status: 'active',
    photo_url: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  { 
    id: 13, 
    name: 'Marie Janssens', 
    email: 'marie.janssens@example.com',
    phone: '+32 475 98 76 54',
    address: '12 Avenue Louise',
    city: 'Anvers',
    country: 'Belgique',
    created_at: '2024-02-10',
    status: 'active'
  }
];

const UserEdit: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<{
    name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    country: string;
    status: 'active' | 'inactive';
    photo: File | null;
    photoPreview: string;
  }>({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    country: '',
    status: 'active',
    photo: null,
    photoPreview: ''
  });
  
  useEffect(() => {
    // Simulate API fetch
    setLoading(true);
    setTimeout(() => {
      const user = mockUsers.find(u => u.id === Number(id));
      if (user) {
        setFormData({
          name: user.name,
          email: user.email,
          phone: user.phone || '',
          address: user.address || '',
          city: user.city || '',
          country: user.country || '',
          status: user.status,
          photo: null,
          photoPreview: user.photo_url || ''
        });
      } else {
        toast.error('User not found');
        navigate('/users');
      }
      setLoading(false);
    }, 800);
  }, [id, navigate]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      
      reader.onload = (event) => {
        if (event.target) {
          setFormData(prev => ({
            ...prev,
            photo: file,
            photoPreview: event.target?.result as string
          }));
        }
      };
      
      reader.readAsDataURL(file);
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast.success('User updated successfully!');
      navigate(`/users/${id}`);
      setIsSubmitting(false);
    }, 1000);
  };
  
  const handleCancel = () => {
    navigate(`/users/${id}`);
  };
  
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }
  
  return (
    <div className="space-y-6 animation-fade">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link to={`/users/${id}`} className="btn btn-outline flex items-center">
            <ArrowLeft size={18} className="mr-2" />
            Back
          </Link>
          <h1 className="text-2xl font-bold text-neutral-800">Edit User</h1>
        </div>
      </div>
      
      <div className="card">
        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex flex-col md:flex-row gap-6">
              {/* Profile Photo Upload */}
              <div className="md:w-1/3">
                <label className="form-label">Profile Photo</label>
                <div className="mt-2 flex flex-col items-center">
                  <div className="w-40 h-40 rounded-full overflow-hidden bg-neutral-100 border-2 border-neutral-200 flex items-center justify-center">
                    {formData.photoPreview ? (
                      <img 
                        src={formData.photoPreview} 
                        alt="Profile Preview" 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <User size={30} className="text-neutral-400" />
                    )}
                  </div>
                  <label className="mt-4 btn btn-outline cursor-pointer">
                    <input
                      type="file"
                      name="photo"
                      accept="image/*"
                      className="sr-only"
                      onChange={handlePhotoChange}
                    />
                    <Upload size={16} className="mr-2" />
                    Change Photo
                  </label>
                  <p className="text-xs text-neutral-500 mt-2">JPEG, PNG or GIF (Max 2MB)</p>
                </div>
              </div>
              
              {/* Personal Information */}
              <div className="md:w-2/3 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="form-label">Full Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="form-input"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="form-label">Email Address</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="form-input"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="phone" className="form-label">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="form-input"
                  />
                </div>
                
                <div>
                  <label htmlFor="address" className="form-label">Address</label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="form-input"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="city" className="form-label">City</label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className="form-input"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="country" className="form-label">Country</label>
                    <input
                      type="text"
                      id="country"
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      className="form-input"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="status" className="form-label">Status</label>
                  <select
                    id="status"
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="form-input"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 border-t pt-6">
              <button
                type="button"
                onClick={handleCancel}
                className="btn btn-outline flex items-center"
              >
                <X size={16} className="mr-2" />
                Cancel
              </button>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn btn-primary flex items-center"
              >
                {isSubmitting ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
                ) : (
                  <Save size={16} className="mr-2" />
                )}
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserEdit;