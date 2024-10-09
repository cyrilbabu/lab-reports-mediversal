import React, { useState } from 'react';

const AdminUserManagementDashboard = () => {
  const [newUser, setNewUser] = useState({ name: '', userId: '', password: '', role: 'uploader', isActive: true });
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleCreateUser = (e) => {
    e.preventDefault();
    if (editingUser) {
      setUsers(users.map(user => user.id === editingUser.id ? { ...newUser, id: user.id } : user));
      setSuccessMessage('User updated successfully!');
    } else {
      setUsers([...users, { ...newUser, id: Date.now() }]);
      setSuccessMessage('User created successfully!');
    }
    setNewUser({ name: '', userId: '', password: '', role: 'uploader', isActive: true });
    setEditingUser(null);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  const handleEditUser = (user) => {
    setNewUser({ ...user, password: '' });
    setEditingUser(user);
  };

  const handleCancelEdit = () => {
    setNewUser({ name: '', userId: '', password: '', role: 'uploader', isActive: true });
    setEditingUser(null);
  };

  const handleToggleUserStatus = (userId) => {
    setUsers(users.map(user => 
      user.id === userId ? { ...user, isActive: !user.isActive } : user
    ));
  };

  const SuccessMessage = ({ message }) => (
    <div className="fixed bottom-5 right-5 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center transition-all duration-500 ease-in-out transform translate-y-0 opacity-100">
      <svg className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
      </svg>
      {message}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-4 sm:p-6 lg:p-8">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-gradient-to-r from-teal-500 to-teal-600 p-8">
          <h1 className="text-4xl font-extrabold text-white tracking-wide">Admin User Management</h1>
        </div>
        <div className="p-8">
          <div className="bg-gray-50 rounded-xl p-6 mb-8 shadow-inner">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              {editingUser ? 'Edit Admin User' : 'Create New Admin User'}
            </h2>
            <form onSubmit={handleCreateUser} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input type="text" id="name" name="name" value={newUser.name} onChange={handleInputChange} className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition duration-200" required />
                </div>
                <div>
                  <label htmlFor="userId" className="block text-sm font-medium text-gray-700 mb-1">User ID</label>
                  <input type="text" id="userId" name="userId" value={newUser.userId} onChange={handleInputChange} className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition duration-200" required />
                </div>
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                  <input type="password" id="password" name="password" value={newUser.password} onChange={handleInputChange} className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition duration-200" required={!editingUser} />
                </div>
                <div>
                  <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                  <select id="role" name="role" value={newUser.role} onChange={handleInputChange} className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition duration-200">
                    <option value="uploader">Uploader</option>
                    <option value="admin">Admin</option>
                    <option value="superadmin">Super Admin</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-end space-x-4">
                {editingUser && (
                  <button type="button" onClick={handleCancelEdit} className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 transition duration-200">
                    Cancel
                  </button>
                )}
                <button type="submit" className="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50 transition duration-200">
                  {editingUser ? 'Update User' : 'Create User'}
                </button>
              </div>
            </form>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Existing Admin Users</h2>
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <ul className="divide-y divide-gray-200">
                {users.map(user => (
                  <li key={user.id} className="p-6 hover:bg-gray-50 transition duration-150 ease-in-out">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800">{user.name}</h3>
                        <p className="text-sm text-gray-600">User ID: {user.userId}</p>
                        <p className="text-sm text-gray-600">Role: {user.role}</p>
                      </div>
                      <div className="flex items-center space-x-3">
                        <button 
                          onClick={() => handleEditUser(user)}
                          className="px-4 py-2 bg-blue-100 text-blue-800 rounded-lg hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-200"
                        >
                          Edit
                        </button>
                        <button 
                          onClick={() => handleToggleUserStatus(user.id)}
                          className={`px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50 transition duration-200 ${
                            user.isActive 
                              ? 'bg-green-100 text-green-800 hover:bg-green-200 focus:ring-green-500' 
                              : 'bg-red-100 text-red-800 hover:bg-red-200 focus:ring-red-500'
                          }`}
                        >
                          {user.isActive ? 'Active' : 'Inactive'}
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
      {showSuccess && <SuccessMessage message={successMessage} />}
    </div>
  );
};

export default AdminUserManagementDashboard;