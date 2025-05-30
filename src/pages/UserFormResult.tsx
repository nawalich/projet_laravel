import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { User, Mail, Phone, MapPin, ArrowLeft, Copy, Check } from 'lucide-react';

interface FormData {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  country: string;
  photoPreview: string;
}

const UserFormResult: React.FC = () => {
  const [formData, setFormData] = useState<FormData | null>(null);
  const [copied, setCopied] = useState(false);
  
  useEffect(() => {
    const storedData = localStorage.getItem('formData');
    if (storedData) {
      setFormData(JSON.parse(storedData));
    }
  }, []);
  
  const handleCopyData = () => {
    if (!formData) return;
    
    const textToCopy = `
Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}
Address: ${formData.address}
City: ${formData.city}
Country: ${formData.country}
    `.trim();
    
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };
  
  if (!formData) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-neutral-800 mb-2">No form data found</h2>
          <p className="text-neutral-600 mb-6">It seems like you haven't submitted the form yet.</p>
          <Link to="/form" className="btn btn-primary">
            Go to Form
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="space-y-6 animation-fade">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-neutral-800">User Information Result</h1>
        <Link to="/form" className="btn btn-outline flex items-center">
          <ArrowLeft size={16} className="mr-2" />
          Back to Form
        </Link>
      </div>
      
      <div className="card">
        <div className="bg-gradient-to-r from-primary-600 to-accent-700 h-40 rounded-t-lg"></div>
        <div className="px-6 pb-6 relative">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Profile Photo */}
            <div className="md:w-1/4 -mt-16 flex flex-col items-center md:items-start">
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white bg-white shadow-md">
                {formData.photoPreview ? (
                  <img 
                    src={formData.photoPreview} 
                    alt={formData.name} 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-neutral-100">
                    <User size={40} className="text-neutral-400" />
                  </div>
                )}
              </div>
              
              <button 
                onClick={handleCopyData}
                className="mt-4 btn btn-outline flex items-center"
              >
                {copied ? (
                  <>
                    <Check size={16} className="mr-2 text-success-500" />
                    <span className="text-success-500">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy size={16} className="mr-2" />
                    Copy Data
                  </>
                )}
              </button>
            </div>
            
            {/* User Information */}
            <div className="md:w-3/4 mt-6 md:mt-0">
              <h2 className="text-2xl font-bold text-neutral-800">{formData.name}</h2>
              
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-start">
                    <Mail className="w-5 h-5 text-neutral-500 mt-0.5 mr-3" />
                    <div>
                      <p className="text-sm text-neutral-500 font-medium">Email Address</p>
                      <p className="text-neutral-800">{formData.email}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Phone className="w-5 h-5 text-neutral-500 mt-0.5 mr-3" />
                    <div>
                      <p className="text-sm text-neutral-500 font-medium">Phone Number</p>
                      <p className="text-neutral-800">{formData.phone || 'Not provided'}</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <MapPin className="w-5 h-5 text-neutral-500 mt-0.5 mr-3" />
                    <div>
                      <p className="text-sm text-neutral-500 font-medium">Address</p>
                      <p className="text-neutral-800">{formData.address || 'Not provided'}</p>
                      <p className="text-neutral-800">
                        {[formData.city, formData.country].filter(Boolean).join(', ') || 'Not provided'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 pt-6 border-t border-neutral-200">
                <h3 className="text-lg font-semibold text-neutral-800 mb-4">Submitted Information</h3>
                <div className="bg-neutral-50 p-4 rounded-lg border border-neutral-200">
                  <code className="text-sm whitespace-pre-wrap">
                    {JSON.stringify(
                      {...formData, photoPreview: '[Image Data]'}, 
                      null, 
                      2
                    )}
                  </code>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserFormResult;