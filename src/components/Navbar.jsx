import { User2, Menu, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';

export const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [error, setError] = useState("");
  const idref = useRef(null);
  const passref = useRef(null);

  const { loggedIn, setLoggedIn } = useAuth();
  const navigate = useNavigate();

  const id = "0";
  const pass = "admin";

  useEffect(() => {
    document.body.style.overflow = visible || sidebarVisible ? 'hidden' : 'auto';
  }, [visible, sidebarVisible]);

  const handleLogin = () => {
    const enteredId = idref.current.value;
    const enteredPass = passref.current.value;

    if (!enteredId || !enteredPass) {
      setError("Please fill all fields.");
      return;
    }

    if (enteredId === id && enteredPass === pass) {
      setVisible(false);
      setError("");
      setLoggedIn(true);
      navigate('/admin');
    } else {
      setError("Wrong ID or Password");
    }
  };

  const handleLogout = () => {
    setLoggedIn(false);
    localStorage.removeItem("loggedIn");
    navigate("/adminLogin");
  };

  const handleSidebarLinkClick = () => {
    setSidebarVisible(false);
  };

  return (
    <>
      {/* Top Navbar */}
      <div className="w-full h-[4rem] bg-slate-800 flex justify-between items-center p-5 sticky top-0 z-10">
        <h1 className="font-mono text-blue-50 font-bold text-2xl pl-5">Portfolio</h1>

        <ul className="hidden md:flex font-serif text-white space-x-7">
          <li className="hover:text-blue-400"><Link to="/">Home</Link></li>
          <li className="hover:text-blue-400"><Link to="/projects">Projects</Link></li>
          <li className="hover:text-blue-400"><Link to="/blogs">Blogs</Link></li>
          <li className="hover:text-blue-400"><Link to="/contact">Contact</Link></li>
        </ul>

        {/* Admin Login / Logout Icon */}
        <div className="hidden md:block">
          {loggedIn ? (
            <button
              onClick={handleLogout}
              className="text-white border-2 border-red-400 px-3 py-1 rounded hover:bg-red-600"
            >
              Logout
            </button>
          ) : (
            <User2
              className="w-8 h-8 hover:text-yellow-400 text-white border-2 border-white rounded-xl cursor-pointer"
              onClick={() => setVisible(true)}
            />
          )}
        </div>

        {/* Hamburger Icon */}
        <div className="block md:hidden">
          <Menu
            className="w-8 h-8 text-white cursor-pointer"
            onClick={() => setSidebarVisible(true)}
          />
        </div>
      </div>

      {/* Sidebar */}
      <div className={`fixed top-0 right-0 h-full w-[60%] bg-slate-900 bg-opacity-90 z-20 transform ${sidebarVisible ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out`}>
        <div className="flex justify-end p-4">
          <X className="text-white w-8 h-8 cursor-pointer" onClick={() => setSidebarVisible(false)} />
        </div>
        <div className="text-white font-serif text-lg">
          <Link to="/" onClick={handleSidebarLinkClick} className="block p-4 border-b border-slate-600 hover:bg-slate-700">Home</Link>
          <Link to="/projects" onClick={handleSidebarLinkClick} className="block p-4 border-b border-slate-600 hover:bg-slate-700">Projects</Link>
          <Link to="/blogs" onClick={handleSidebarLinkClick} className="block p-4 border-b border-slate-600 hover:bg-slate-700">Blogs</Link>
          <Link to="/contact" onClick={handleSidebarLinkClick} className="block p-4 border-b border-slate-600 hover:bg-slate-700">Contact</Link>
          {loggedIn ? (
            <button
              onClick={() => {
                handleSidebarLinkClick();
                handleLogout();
              }}
              className="w-full text-left p-4 border-b border-slate-600 hover:bg-slate-700"
            >
              Logout
            </button>
          ) : (
            <button
              onClick={() => {
                handleSidebarLinkClick();
                setVisible(true);
              }}
              className="w-full text-left p-4 border-b border-slate-600 hover:bg-slate-700"
            >
              Admin Login
            </button>
          )}
        </div>
      </div>

      {/* Admin Login Popup */}
      {visible && !loggedIn && (
        <div className="fixed inset-0 z-50 backdrop-blur-sm flex justify-center items-center">
          <div className="w-[90vw] md:w-[400px] p-6 bg-black text-white border-2 rounded-md flex flex-col items-center relative">
            <X className="absolute top-3 right-3 text-red-600 cursor-pointer" onClick={() => setVisible(false)} />
            <p className="mb-4 text-xl font-semibold">Admin Login - CodewithBhuvi</p>
            <input
              ref={idref}
              className="m-2 p-2 w-full rounded-md text-black"
              placeholder="ID"
              autoComplete="off"
              onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
            />
            <input
              ref={passref}
              type="password"
              className="m-2 p-2 w-full rounded-md text-black"
              placeholder="Password"
              autoComplete="off"
              onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
            />
            <button onClick={handleLogin} className="mt-2 rounded-md bg-green-600 p-2 px-4">
              Login
            </button>
            {error && <p className="text-red-500 mt-2">{error}</p>}
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
