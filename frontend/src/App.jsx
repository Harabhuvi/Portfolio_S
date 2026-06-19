import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Home from './pages/Home';
import Projects from './pages/Projects';
import Contact from './pages/Contact';
import Blogs from './pages/Blogs';
import Error from './pages/Error';
import DSizer from './pages/DSizer';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route index path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/dsizer" element={<DSizer />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/hell" element={<hell />} />
        <Route path="/blogs" element={<Blogs />} />

        {/* Fallback Route */}
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
