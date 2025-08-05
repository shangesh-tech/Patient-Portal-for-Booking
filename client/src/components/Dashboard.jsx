import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaUserCircle, FaCalendarCheck, FaFlask, FaHistory } from 'react-icons/fa';
import { QuickActionCard } from './QuickActionCard';

const Dashboard = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${apiUrl}/api/auth/profile`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUserProfile(response.data);
      } catch (error) {
        console.error('Error fetching profile:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Profile Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-6 mb-8 text-white">
        <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
          <div className="bg-white p-2 rounded-full">
            <FaUserCircle className="h-16 w-16 text-blue-600" />
          </div>
          <div className="text-center md:text-left">
            <h1 className="text-2xl font-bold">{userProfile?.name || 'Welcome Back!'}</h1>
            <p className="text-blue-100">{userProfile?.email}</p>
          </div>
        </div>
      </div>

      {/* Quick Actions Grid */}
      <h2 className="text-xl font-semibold text-gray-800 mb-6">Quick Actions</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <QuickActionCard
          icon={FaFlask}
          title="Book Lab Test"
          description="Schedule your next lab test"
          onClick={() => window.location.href = '/tests'}
        />
        <QuickActionCard
          icon={FaHistory}
          title="View History"
          description="Check your past bookings"
          onClick={() => window.location.href = '/history'}
        />
      </div>

     
    </div>
  );
};

export default Dashboard;
