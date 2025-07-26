import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { setLoggedIn } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await axios.get("https://6881b47c66a7eb81224b93dd.mockapi.io/api/p1/AdminUsers");
      const user = res.data.find(
        (u) => u.username === username && u.password === password
      );

      if (user) {
        setLoggedIn(true);
        alert("Login successful!");
        navigate("/admin");
      } else {
        setError("Invalid username or password.");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Server error! Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 px-4">
      <form
        onSubmit={handleLogin}
        className="p-6 border rounded bg-white shadow-md w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold mb-4 text-center text-orange-500">Admin Login</h2>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="block mb-4 w-full p-2 border border-gray-300 rounded"
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="block mb-4 w-full p-2 border border-gray-300 rounded"
          required
        />

        {error && <p className="text-red-500 text-sm mb-2 text-center">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className={`bg-orange-400 text-white px-4 py-2 rounded w-full ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-orange-500'}`}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;
