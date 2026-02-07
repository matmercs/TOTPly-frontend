import React, { useState } from 'react';
import { useAuth } from '../context/AuthProvider';
import { Button } from '../components/Button';
import { IconEdit } from '../components/Icons';

export default function Profile() {
  const { user, logout } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState('Demo User');
  const [email, setEmail] = useState(user?.email || 'demo@example.com');
  const [theme, setTheme] = useState('light');
  const [notifications, setNotifications] = useState(true);

  const handleSave = () => {
    setIsEditing(false);
  };

  return (
    <div className="container max-w-4xl mx-auto p-6 py-12">
      <h1 className="text-3xl font-bold mb-8 text-slate-900">Account Settings</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <nav className="flex flex-col gap-2">
            <button className="text-left px-4 py-2 rounded-lg bg-primary/10 text-primary font-medium">
              General
            </button>
            <button className="text-left px-4 py-2 rounded-lg text-slate-600 hover:bg-slate-50">
              Security
            </button>
            <button className="text-left px-4 py-2 rounded-lg text-slate-600 hover:bg-slate-50">
              Preferences
            </button>
            <button className="text-left px-4 py-2 rounded-lg text-slate-600 hover:bg-slate-50 text-red-600" onClick={logout}>
              Log out
            </button>
          </nav>
        </div>

        <div className="md:col-span-2 space-y-8">
          
          <section className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center">
              <h2 className="text-xl font-bold text-slate-900">Profile Information</h2>
              {!isEditing && (
                <button 
                  onClick={() => setIsEditing(true)} 
                  className="text-sm text-primary font-medium hover:underline flex items-center gap-1"
                >
                  <IconEdit className="w-4 h-4"/> Edit
                </button>
              )}
            </div>
            
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Full Name</label>
                  {isEditing ? (
                    <input 
                      type="text" 
                      value={name} 
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                    />
                  ) : (
                    <div className="text-slate-900 font-medium">{name}</div>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Email Address</label>
                  {isEditing ? (
                    <input 
                      type="email" 
                      value={email} 
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                    />
                  ) : (
                    <div className="text-slate-900 font-medium">{email}</div>
                  )}
                </div>
              </div>

              {isEditing && (
                <div className="flex justify-end gap-3 mt-4">
                  <Button variant="ghost" onClick={() => setIsEditing(false)}>Cancel</Button>
                  <Button onClick={handleSave}>Save Changes</Button>
                </div>
              )}
            </div>
          </section>

          <section className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden opacity-70 pointer-events-none relative">
            <div className="absolute top-4 right-4 bg-slate-100 text-slate-500 text-xs font-bold px-2 py-1 rounded uppercase tracking-wider">Coming Soon</div>
            <div className="p-6 border-b border-slate-100">
              <h2 className="text-xl font-bold text-slate-900">Preferences</h2>
            </div>
            <div className="p-6 space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-slate-900">Theme</div>
                  <div className="text-sm text-slate-500">Select your preferred interface appearance</div>
                </div>
                <select 
                  value={theme} 
                  disabled
                  className="px-4 py-2 rounded-lg border border-slate-300 bg-slate-50 outline-none text-slate-500 cursor-not-allowed"
                >
                  <option value="light">Light</option>
                  <option value="dark">Dark</option>
                  <option value="system">System</option>
                </select>
              </div>

              <div className="flex items-center justify-between pt-6 border-t border-slate-100">
                <div>
                  <div className="font-medium text-slate-900">Email Notifications</div>
                  <div className="text-sm text-slate-500">Receive security alerts and updates</div>
                </div>
                <label className="relative inline-flex items-center cursor-not-allowed">
                  <input 
                    type="checkbox" 
                    disabled
                    checked={notifications} 
                    className="sr-only peer" 
                  />
                  <div className="w-11 h-6 bg-slate-200 rounded-full peer after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-slate-300"></div>
                </label>
              </div>
            </div>
          </section>

           <section className="bg-red-50 rounded-2xl border border-red-100 shadow-sm overflow-hidden">
            <div className="p-6">
              <h2 className="text-xl font-bold text-red-900 mb-2">Danger Zone</h2>
              <p className="text-red-700 mb-6 text-sm">Once you delete your account, there is no going back. Please be certain.</p>
              <Button variant="secondary" className="bg-white border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300">Delete Account</Button>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}
