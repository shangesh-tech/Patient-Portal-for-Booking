import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const LabTests = () => {
  const [tests, setTests] = useState([]);
  const [error, setError] = useState('');
  const apiUrl = import.meta.env.VITE_API_URL;


  useEffect(() => {
    const fetchTests = async () => {
      try {
        const res = await axios.get(`${apiUrl}/api/tests`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setTests(res.data);
      } catch (err) {
        setError('Failed to load tests');
      }
    };
    fetchTests();
  }, []);

const handleBook = async (testId) => {
  try {
    await axios.post(
      `${apiUrl}/api/bookings/book`, 
      { testId }, 
      {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      }
    );
    toast.success('Test booked successfully!');
  } catch (err) {
    toast.error('Booking failed. Please try again.');
  }
};


  return (
    <div className="max-w-4xl mx-auto mt-10">
      <h2 className="text-2xl mb-4">Available Lab Tests</h2>
      {error && <p className="text-red-500">{error}</p>}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {tests.map((test) => (
          <div key={test._id} className="p-4 bg-white rounded shadow">
            <h3 className="text-xl">{test.name}</h3>
            <p>{test.description}</p>
            <button onClick={() => handleBook(test._id)} className="mt-2 bg-green-600 text-white p-2">Book</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LabTests;
