import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { 
  FileDown, 
  FileText, 
  Download, 
  Calendar, 
  ChevronDown,
  DownloadCloud
} from 'lucide-react';
import { jsPDF } from 'jspdf';

// Mock user data
const mockUsers = [
  { id: 1, name: 'John Doe', email: 'john@example.com', status: 'active', created_at: '2023-01-15' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', status: 'active', created_at: '2023-02-20' },
  { id: 3, name: 'Robert Johnson', email: 'robert@example.com', status: 'inactive', created_at: '2023-03-10' },
  { id: 4, name: 'Emily Davis', email: 'emily@example.com', status: 'active', created_at: '2023-04-05' },
  { id: 5, name: 'Michael Brown', email: 'michael@example.com', status: 'active', created_at: '2023-05-22' },
  { id: 6, name: 'Sarah Wilson', email: 'sarah@example.com', status: 'inactive', created_at: '2023-06-18' },
  { id: 7, name: 'David Taylor', email: 'david@example.com', status: 'active', created_at: '2023-07-30' },
];

// Mock statistics data
const mockStats = {
  totalUsers: 7,
  activeUsers: 5,
  inactiveUsers: 2,
  newUsersThisMonth: 1,
  usersByMonth: [
    { month: 'Jan', count: 1 },
    { month: 'Feb', count: 1 },
    { month: 'Mar', count: 1 },
    { month: 'Apr', count: 1 },
    { month: 'May', count: 1 },
    { month: 'Jun', count: 1 },
    { month: 'Jul', count: 1 },
    { month: 'Aug', count: 0 },
    { month: 'Sep', count: 0 },
    { month: 'Oct', count: 0 },
    { month: 'Nov', count: 0 },
    { month: 'Dec', count: 0 },
  ]
};

const ExportData: React.FC = () => {
  const [exportType, setExportType] = useState<'users' | 'statistics'>('users');
  const [format, setFormat] = useState<'csv' | 'pdf'>('csv');
  const [dateRange, setDateRange] = useState<'all' | 'thisMonth' | 'lastMonth' | 'thisYear'>('all');
  const [isExporting, setIsExporting] = useState(false);
  
  // Function to convert users to CSV format
  const generateUsersCsv = () => {
    // Filter users based on date range
    let filteredUsers = [...mockUsers];
    const today = new Date();
    
    if (dateRange === 'thisMonth') {
      const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
      filteredUsers = mockUsers.filter(user => new Date(user.created_at) >= firstDayOfMonth);
    } else if (dateRange === 'lastMonth') {
      const firstDayLastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);
      const firstDayThisMonth = new Date(today.getFullYear(), today.getMonth(), 1);
      filteredUsers = mockUsers.filter(user => {
        const date = new Date(user.created_at);
        return date >= firstDayLastMonth && date < firstDayThisMonth;
      });
    } else if (dateRange === 'thisYear') {
      const firstDayOfYear = new Date(today.getFullYear(), 0, 1);
      filteredUsers = mockUsers.filter(user => new Date(user.created_at) >= firstDayOfYear);
    }
    
    // Create CSV headers
    const headers = ['ID', 'Name', 'Email', 'Status', 'Created Date'];
    
    // Create CSV rows
    const rows = filteredUsers.map(user => [
      user.id,
      user.name,
      user.email,
      user.status,
      user.created_at
    ]);
    
    // Combine headers and rows
    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');
    
    return csvContent;
  };
  
  // Function to convert statistics to CSV format
  const generateStatisticsCsv = () => {
    // Create general stats
    const generalStats = [
      ['Metric', 'Value'],
      ['Total Users', mockStats.totalUsers],
      ['Active Users', mockStats.activeUsers],
      ['Inactive Users', mockStats.inactiveUsers],
      ['New Users This Month', mockStats.newUsersThisMonth],
      ['', ''],
      ['Monthly Registration Stats', ''],
      ['Month', 'New Users']
    ];
    
    // Add monthly stats
    const monthlyStats = mockStats.usersByMonth.map(item => [
      item.month,
      item.count
    ]);
    
    // Combine all stats
    const csvContent = [
      ...generalStats,
      ...monthlyStats
    ].map(row => row.join(',')).join('\n');
    
    return csvContent;
  };
  
  // Function to generate PDF
  const generatePdf = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    
    if (exportType === 'users') {
      // Filter users based on date range
      let filteredUsers = [...mockUsers];
      const today = new Date();
      
      if (dateRange === 'thisMonth') {
        const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
        filteredUsers = mockUsers.filter(user => new Date(user.created_at) >= firstDayOfMonth);
      } else if (dateRange === 'lastMonth') {
        const firstDayLastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);
        const firstDayThisMonth = new Date(today.getFullYear(), today.getMonth(), 1);
        filteredUsers = mockUsers.filter(user => {
          const date = new Date(user.created_at);
          return date >= firstDayLastMonth && date < firstDayThisMonth;
        });
      } else if (dateRange === 'thisYear') {
        const firstDayOfYear = new Date(today.getFullYear(), 0, 1);
        filteredUsers = mockUsers.filter(user => new Date(user.created_at) >= firstDayOfYear);
      }
      
      // Add title
      doc.text('User Report', 105, 15, { align: 'center' });
      doc.setFontSize(12);
      doc.text(`Date Range: ${dateRange}`, 105, 25, { align: 'center' });
      doc.text(`Total Users: ${filteredUsers.length}`, 105, 35, { align: 'center' });
      
      // Add table headers
      doc.setFontSize(10);
      doc.text('ID', 20, 50);
      doc.text('Name', 40, 50);
      doc.text('Email', 90, 50);
      doc.text('Status', 150, 50);
      doc.text('Created Date', 175, 50);
      
      // Add line
      doc.line(20, 52, 190, 52);
      
      // Add users
      let yPos = 60;
      filteredUsers.forEach((user, index) => {
        if (yPos > 270) {
          doc.addPage();
          yPos = 20;
          
          // Add headers on new page
          doc.text('ID', 20, yPos);
          doc.text('Name', 40, yPos);
          doc.text('Email', 90, yPos);
          doc.text('Status', 150, yPos);
          doc.text('Created Date', 175, yPos);
          
          // Add line
          doc.line(20, yPos + 2, 190, yPos + 2);
          yPos += 10;
        }
        
        doc.text(user.id.toString(), 20, yPos);
        doc.text(user.name, 40, yPos);
        doc.text(user.email, 90, yPos);
        doc.text(user.status, 150, yPos);
        doc.text(user.created_at, 175, yPos);
        
        yPos += 10;
      });
    } else {
      // Statistics report
      doc.text('Statistics Report', 105, 15, { align: 'center' });
      doc.setFontSize(14);
      
      // General stats
      doc.text('General Statistics', 20, 30);
      doc.setFontSize(10);
      doc.text(`Total Users: ${mockStats.totalUsers}`, 20, 40);
      doc.text(`Active Users: ${mockStats.activeUsers}`, 20, 50);
      doc.text(`Inactive Users: ${mockStats.inactiveUsers}`, 20, 60);
      doc.text(`New Users This Month: ${mockStats.newUsersThisMonth}`, 20, 70);
      
      // Monthly stats
      doc.setFontSize(14);
      doc.text('Monthly Registration Stats', 20, 90);
      doc.setFontSize(10);
      
      // Headers
      doc.text('Month', 20, 100);
      doc.text('New Users', 60, 100);
      
      // Add line
      doc.line(20, 102, 100, 102);
      
      // Monthly data
      let yPos = 110;
      mockStats.usersByMonth.forEach((item, index) => {
        doc.text(item.month, 20, yPos);
        doc.text(item.count.toString(), 60, yPos);
        yPos += 10;
      });
    }
    
    return doc;
  };
  
  const handleExport = () => {
    setIsExporting(true);
    
    // Simulate processing delay
    setTimeout(() => {
      try {
        let content = '';
        let filename = '';
        
        if (format === 'csv') {
          if (exportType === 'users') {
            content = generateUsersCsv();
            filename = `users_export_${dateRange}_${new Date().toISOString().split('T')[0]}.csv`;
          } else {
            content = generateStatisticsCsv();
            filename = `statistics_export_${new Date().toISOString().split('T')[0]}.csv`;
          }
          
          // Create blob and download
          const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
          const link = document.createElement('a');
          link.href = URL.createObjectURL(blob);
          link.setAttribute('download', filename);
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        } else {
          // PDF export
          const doc = generatePdf();
          if (exportType === 'users') {
            filename = `users_export_${dateRange}_${new Date().toISOString().split('T')[0]}.pdf`;
          } else {
            filename = `statistics_export_${new Date().toISOString().split('T')[0]}.pdf`;
          }
          doc.save(filename);
        }
        
        toast.success(`${exportType === 'users' ? 'Users' : 'Statistics'} exported successfully as ${format.toUpperCase()}`);
      } catch (error) {
        console.error('Export error:', error);
        toast.error('Failed to export data. Please try again.');
      } finally {
        setIsExporting(false);
      }
    }, 1500);
  };
  
  return (
    <div className="space-y-6 animation-fade">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-neutral-800">Export Data</h1>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Export Options Card */}
        <div className="card p-6 space-y-6">
          <h2 className="text-lg font-semibold text-neutral-800 pb-2 border-b border-neutral-200">
            Export Options
          </h2>
          
          <div className="space-y-4">
            <div>
              <label className="form-label">What to Export</label>
              <div className="mt-2 grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setExportType('users')}
                  className={`flex items-center justify-center p-3 border rounded-md ${
                    exportType === 'users'
                      ? 'bg-primary-50 border-primary-500 text-primary-700'
                      : 'border-neutral-300 text-neutral-700 hover:bg-neutral-50'
                  }`}
                >
                  <FileText size={20} className="mr-2" />
                  User Data
                </button>
                <button
                  type="button"
                  onClick={() => setExportType('statistics')}
                  className={`flex items-center justify-center p-3 border rounded-md ${
                    exportType === 'statistics'
                      ? 'bg-primary-50 border-primary-500 text-primary-700'
                      : 'border-neutral-300 text-neutral-700 hover:bg-neutral-50'
                  }`}
                >
                  <Calendar size={20} className="mr-2" />
                  Statistics
                </button>
              </div>
            </div>
            
            <div>
              <label className="form-label">Format</label>
              <div className="mt-2 grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setFormat('csv')}
                  className={`flex items-center justify-center p-3 border rounded-md ${
                    format === 'csv'
                      ? 'bg-primary-50 border-primary-500 text-primary-700'
                      : 'border-neutral-300 text-neutral-700 hover:bg-neutral-50'
                  }`}
                >
                  <FileDown size={20} className="mr-2" />
                  CSV
                </button>
                <button
                  type="button"
                  onClick={() => setFormat('pdf')}
                  className={`flex items-center justify-center p-3 border rounded-md ${
                    format === 'pdf'
                      ? 'bg-primary-50 border-primary-500 text-primary-700'
                      : 'border-neutral-300 text-neutral-700 hover:bg-neutral-50'
                  }`}
                >
                  <Download size={20} className="mr-2" />
                  PDF
                </button>
              </div>
            </div>
            
            {exportType === 'users' && (
              <div>
                <label htmlFor="dateRange" className="form-label">Date Range</label>
                <div className="relative">
                  <select
                    id="dateRange"
                    value={dateRange}
                    onChange={(e) => setDateRange(e.target.value as any)}
                    className="form-input pr-10 appearance-none"
                  >
                    <option value="all">All Time</option>
                    <option value="thisMonth">This Month</option>
                    <option value="lastMonth">Last Month</option>
                    <option value="thisYear">This Year</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <ChevronDown size={16} className="text-neutral-400" />
                  </div>
                </div>
              </div>
            )}
            
            <div className="pt-4">
              <button
                onClick={handleExport}
                disabled={isExporting}
                className="btn btn-primary w-full flex items-center justify-center"
              >
                {isExporting ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></div>
                ) : (
                  <DownloadCloud size={18} className="mr-2" />
                )}
                Export {exportType === 'users' ? 'User Data' : 'Statistics'} as {format.toUpperCase()}
              </button>
            </div>
          </div>
        </div>
        
        {/* Preview Card */}
        <div className="card p-6 space-y-4">
          <h2 className="text-lg font-semibold text-neutral-800 pb-2 border-b border-neutral-200">
            Export Preview
          </h2>
          
          <div className="h-80 overflow-y-auto p-4 bg-neutral-50 rounded-md border border-neutral-200">
            {exportType === 'users' ? (
              <div>
                <h3 className="text-md font-medium text-neutral-800 mb-3">User Data Preview</h3>
                <table className="min-w-full divide-y divide-neutral-200">
                  <thead className="bg-neutral-100">
                    <tr>
                      <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                        ID
                      </th>
                      <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                        Name
                      </th>
                      <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                        Email
                      </th>
                      <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-neutral-200">
                    {mockUsers.slice(0, 5).map((user) => (
                      <tr key={user.id}>
                        <td className="px-3 py-2 whitespace-nowrap text-sm text-neutral-800">{user.id}</td>
                        <td className="px-3 py-2 whitespace-nowrap text-sm text-neutral-800">{user.name}</td>
                        <td className="px-3 py-2 whitespace-nowrap text-sm text-neutral-600">{user.email}</td>
                        <td className="px-3 py-2 whitespace-nowrap text-sm">
                          <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                            user.status === 'active' 
                              ? 'bg-success-100 text-success-800' 
                              : 'bg-error-100 text-error-800'
                          }`}>
                            {user.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {mockUsers.length > 5 && (
                  <p className="text-xs text-neutral-500 mt-2">
                    Showing 5 of {mockUsers.length} users. The full export will include all users.
                  </p>
                )}
              </div>
            ) : (
              <div>
                <h3 className="text-md font-medium text-neutral-800 mb-3">Statistics Preview</h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-white p-3 rounded-md border border-neutral-200">
                      <p className="text-xs text-neutral-500">Total Users</p>
                      <p className="text-xl font-bold text-neutral-800">{mockStats.totalUsers}</p>
                    </div>
                    <div className="bg-white p-3 rounded-md border border-neutral-200">
                      <p className="text-xs text-neutral-500">Active Users</p>
                      <p className="text-xl font-bold text-success-600">{mockStats.activeUsers}</p>
                    </div>
                    <div className="bg-white p-3 rounded-md border border-neutral-200">
                      <p className="text-xs text-neutral-500">Inactive Users</p>
                      <p className="text-xl font-bold text-error-600">{mockStats.inactiveUsers}</p>
                    </div>
                    <div className="bg-white p-3 rounded-md border border-neutral-200">
                      <p className="text-xs text-neutral-500">New This Month</p>
                      <p className="text-xl font-bold text-primary-600">{mockStats.newUsersThisMonth}</p>
                    </div>
                  </div>
                  
                  <div className="bg-white p-3 rounded-md border border-neutral-200">
                    <h4 className="text-sm font-medium text-neutral-700 mb-2">Monthly User Registration</h4>
                    <table className="min-w-full divide-y divide-neutral-200">
                      <thead className="bg-neutral-50">
                        <tr>
                          <th scope="col" className="px-2 py-1 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                            Month
                          </th>
                          <th scope="col" className="px-2 py-1 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                            New Users
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-neutral-200">
                        {mockStats.usersByMonth.slice(0, 6).map((item, index) => (
                          <tr key={index}>
                            <td className="px-2 py-1 whitespace-nowrap text-xs text-neutral-800">{item.month}</td>
                            <td className="px-2 py-1 whitespace-nowrap text-xs text-neutral-800">{item.count}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <p className="text-xs text-neutral-500 mt-2">
                      Showing 6 of 12 months. The full export will include all months.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          <div className="bg-amber-50 border border-amber-200 rounded-md p-3">
            <p className="text-sm text-amber-800">
              <strong>Note:</strong> This is a preview of the data that will be exported. The actual export may contain more records and be formatted differently based on your selected options.
            </p>
          </div>
        </div>
      </div>
      
      <div className="card p-6">
        <h2 className="text-lg font-semibold text-neutral-800 mb-4">Export History</h2>
        <div className="bg-neutral-50 rounded-md p-4 text-center">
          <p className="text-neutral-600">
            Export history will be displayed here in a real implementation.
          </p>
          <p className="text-sm text-neutral-500 mt-2">
            This would include a list of previous exports, their dates, formats, and options.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ExportData;