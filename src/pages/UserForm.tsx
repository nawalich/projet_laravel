import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Save, X, Upload } from 'lucide-react';

interface FormData {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  country: string;
  photo: File | null;
  photoPreview: string;
}

const UserForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    country: '',
    photo: null,
    photoPreview: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
    
    // Simulate form submission and redirect to result page
    setTimeout(() => {
      // Store form data in localStorage for the result page
      localStorage.setItem('formData', JSON.stringify({
        ...formData,
        photoPreview: formData.photoPreview // Include the photo preview
      }));
      
      toast.success('User information submitted successfully!');
      navigate('/form/result');
      setIsSubmitting(false);
    }, 1000);
  };
  
  const handleCancel = () => {
    if (confirm('Are you sure you want to cancel? All entered data will be lost.')) {
      setFormData({
        name: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        country: '',
        photo: null,
        photoPreview: ''
      });
      toast.info('Form has been reset');
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-neutral-800">User Information Form</h1>
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
                      <Upload size={30} className="text-neutral-400" />
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
                    Upload Photo
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
                      placeholder="John Doe"
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
                      placeholder="john@example.com"
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
                    placeholder="+1 (555) 123-4567"
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
                    placeholder="123 Main St"
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
                      placeholder="New York"
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
                      placeholder="United States"
                    />
                  </div>
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
                Save User Information
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserForm;