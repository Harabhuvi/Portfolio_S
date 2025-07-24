import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { setLoggedIn } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get("https://6881b47c66a7eb81224b93dd.mockapi.io/api/p1/AdminUsers");
      const user = res.data.find(u => u.username === username && u.password === password);

      if (user) {
        setLoggedIn(true);
        alert("Login successful!");
        navigate("/admin");
      } else {
        alert("Invalid credentials!");
      }
    } catch (err) {
      console.error("Login failed", err);
      alert("Server error!");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <form onSubmit={handleLogin} className="p-6 border rounded bg-white">
        <h2 className="text-xl font-bold mb-4 text-center">Admin Login</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="block mb-4 w-full p-2 border"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="block mb-4 w-full p-2 border"
          required
        />
        <button type="submit" className="bg-orange-400 text-white px-4 py-2 rounded w-full">Login</button>
      </form>
    </div>
  );
};

export default AdminLogin;
