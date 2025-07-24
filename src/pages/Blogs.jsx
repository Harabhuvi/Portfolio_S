import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    axios.get("https://6881b47c66a7eb81224b93dd.mockapi.io/api/p1/Blogs")
      .then(res => setBlogs(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="p-10">
      <h1 className="text-3xl text-orange-500 font-bold mb-6">Blogs</h1>
      {blogs.map(blog => (
        <div key={blog.id} className="border p-4 mb-4 rounded shadow">
          <h2 className="text-xl font-semibold">{blog.Title}</h2>
          <p className="text-gray-700">{blog.Body}</p>
          <p className="text-sm mt-2 text-gray-500">{blog.Blog}</p>
        </div>
      ))}
    </div>
  );
};

export default Blogs;
