import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaUserCircle, FaCalendarCheck, FaFlask, FaHistory } from 'react-icons/fa';

const Dashboard = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/api/auth/profile', {
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

  const QuickActionCard = ({ icon: Icon, title, description, onClick }) => (
    <div 
      onClick={onClick}
      className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer border border-gray-100 hover:border-blue-500"
    >
      <div className="flex items-center space-x-4">
        <div className="bg-blue-50 p-3 rounded-full">
          <Icon className="h-6 w-6 text-blue-600" />
        </div>
        <div>
          <h3 className="font-semibold text-lg text-gray-800">{title}</h3>
          <p className="text-gray-600 text-sm">{description}</p>
        </div>
      </div>
    </div>
  );

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
        <QuickActionCard
          icon={FaCalendarCheck}
          title="Upcoming Tests"
          description="View your scheduled tests"
          onClick={() => window.location.href = '/upcoming'}
        />
      </div>

     
    </div>
  );
};

export default Dashboard;
