import React, { useEffect } from 'react';
import { Navbar } from '../components/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import { PlusIcon } from 'lucide-react';
import { useAuth } from '../AuthContext';

export const Admin = () => {
  const { loggedIn, setLoggedIn } = useAuth();
  const navigate = useNavigate();

  // Protect the route
  useEffect(() => {
    if (!loggedIn) {
      navigate("/adminlogin"); // redirect if not logged in
    }
  }, [loggedIn, navigate]);

  const handleLogout = () => {
    setLoggedIn(false);
    localStorage.removeItem("isAdmin"); // optional: clear persisted login
    console.log("Logged out");
    navigate("/adminlogin"); // go back to login page
  };

  return (
    <>
      <Navbar />
      <div className='flex justify-center items-center flex-col backdrop-blur-sm w-screen h-screen'>
        <div>
          <p className='text-orange-400 font-mono text-4xl'>WELCOME BHUVI!</p>
        </div>
        <div>
          <button className='border-2 text-orange-400 p-8 rounded-lg bg-black w-auto h-30 m-5'>
            <Link to={'/adminproject'}>
              <div className='flex items-center'>
                <PlusIcon className="mr-2" /> Add projects
              </div>
            </Link>
          </button>
          <button className='border-2 text-orange-400 p-8 rounded-lg bg-black w-auto h-30'>
            <Link to={'/adminblog'}>
              <div className='flex items-center'>
                <PlusIcon className="mr-2" /> Add blogs
              </div>
            </Link>
          </button>
        </div>
        <button 
          className='text-white w-auto rounded-lg p-4 bg-red-700 fixed bottom-5' 
          onClick={handleLogout}
        >
          LOGOUT
        </button>
      </div>
    </>
  );
};

export default Admin;
