import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BookingsHistory = () => {
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/bookings/history', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setBookings(res.data);
      } catch (err) {
        setError('Failed to load history');
      }
    };
    fetchBookings();
  }, []);

  const handleDownload = async (bookingId) => {
    try {
      const res = await axios.get(`http://localhost:5000/api/bookings/report/${bookingId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        responseType: 'blob',
      });
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'report.pdf');
      document.body.appendChild(link);
      link.click();
    } catch (err) {
      setError('Download failed');
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <h2 className="text-2xl mb-4">Bookings History</h2>
      {error && <p className="text-red-500">{error}</p>}
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2">Test Name</th>
            <th className="p-2">Date</th>
            <th className="p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking._id}>
              <td className="p-2">{booking.test.name}</td>
              <td className="p-2">{new Date(booking.date).toLocaleDateString()}</td>
              <td className="p-2">
                <button onClick={() => handleDownload(booking._id)} className="bg-blue-600 text-white p-1">Download Report</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookingsHistory;
