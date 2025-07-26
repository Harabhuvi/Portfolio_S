import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Navbar } from '../components/Navbar';
import { Procomponent } from '../components/Procomponent';
import { Loader } from 'lucide-react';

const Projects = () => {
  const url = "https://6881b47c66a7eb81224b93dd.mockapi.io/api/p1/Projects";
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all project data
  const fetchData = async () => {
    try {
      const response = await axios.get(url);
      if (response.status === 200 || response.status === 201) {
        setProjects(response.data);
      } else {
        alert("Failed to load projects. Please check the API.");
      }
    } catch (error) {
      console.error("Error fetching projects:", error);
      alert("Server error! Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="backdrop-blur-sm min-h-screen px-4 py-6">
        <h1 className="text-orange-400 font-mono text-4xl text-center mb-10">PROJECTS</h1>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader className="text-white animate-spin w-10 h-10" />
          </div>
        ) : projects.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 justify-items-center">
            {projects.map((item, index) => (
              <Procomponent
                key={index}
                id={item.id}
                title={item.Title}
                description={item.Description}
                coverlink={item.CoverLink}
                gitlink={item.GitLink}
                previewlink={item.Previewlink}
                fetchData={fetchData}
              />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600">No projects available.</p>
        )}
      </div>
    </div>
  );
};

export default Projects;
