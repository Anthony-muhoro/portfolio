import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Swal from 'sweetalert2';
import { Edit, Trash, Plus } from 'lucide-react';

const AdminDashboard: React.FC = () => {
  const [contactInfo, setContactInfo] = useState({
    email: '',
    phone: '',
    whatsapp: '',
  });
  const [skills, setSkills] = useState([]);
  const [projects, setProjects] = useState([]);
  const [messages, setMessages] = useState([]);
  const [newPassword, setNewPassword] = useState('');
  const [editingSkill, setEditingSkill] = useState(null);
  const [editingProject, setEditingProject] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost/portfolio-api/admin-data.php', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      setContactInfo(data.contactInfo);
      setSkills(data.skills);
      setProjects(data.projects);
      setMessages(data.messages);
    } catch (error) {
      console.error('Error fetching data:', error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Failed to fetch data!',
      });
    }
  };

  const handleContactInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContactInfo({ ...contactInfo, [e.target.name]: e.target.value });
  };

  const handleSkillChange = (index: number, field: string, value: string) => {
    const updatedSkills = [...skills];
    updatedSkills[index] = { ...updatedSkills[index], [field]: field === 'level' ? parseInt(value) : value };
    setSkills(updatedSkills);
  };

  const handleProjectChange = (index: number, field: string, value: string) => {
    const updatedProjects = [...projects];
    updatedProjects[index] = { ...updatedProjects[index], [field]: value };
    setProjects(updatedProjects);
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost/portfolio-api/update-data.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          contactInfo,
          skills,
          projects
        })
      });
      const data = await response.json();
      if (data.success) {
        Swal.fire({
          icon: 'success',
          title: 'Saved!',
          text: 'Your changes have been saved successfully.',
        });
      } else {
        throw new Error('Failed to save data');
      }
    } catch (error) {
      console.error('Error saving data:', error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Failed to save data!',
      });
    }
  };

  const handleChangePassword = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost/portfolio-api/change-password.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ newPassword })
      });
      const data = await response.json();
      if (data.success) {
        Swal.fire({
          icon: 'success',
          title: 'Password Changed',
          text: 'Your password has been updated successfully.',
        });
        setNewPassword('');
      } else {
        throw new Error('Failed to change password');
      }
    } catch (error) {
      console.error('Error changing password:', error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Failed to change password!',
      });
    }
  };

  const openSkillModal = (skill = null) => {
    setEditingSkill(skill || { name: '', level: 0 });
    Swal.fire({
      title: skill ? 'Edit Skill' : 'Add Skill',
      html:
        '<input id="swal-input1" class="swal2-input" placeholder="Skill Name">' +
        '<input id="swal-input2" class="swal2-input" type="number" min="0" max="100" placeholder="Skill Level">',
      focusConfirm: false,
      preConfirm: () => {
        return [
          (document.getElementById('swal-input1') as HTMLInputElement).value,
          (document.getElementById('swal-input2') as HTMLInputElement).value
        ]
      }
    }).then((result) => {
      if (result.isConfirmed) {
        const [name, level] = result.value;
        if (name && level) {
          if (skill) {
            const updatedSkills = skills.map(s => s.id === skill.id ? { ...s, name, level: parseInt(level) } : s);
            setSkills(updatedSkills);
          } else {
            setSkills([...skills, { name, level: parseInt(level) }]);
          }
        }
      }
    });
  };

  const openProjectModal = (project = null) => {
    setEditingProject(project || { title: '', description: '' });
    Swal.fire({
      title: project ? 'Edit Project' : 'Add Project',
      html:
        '<input id="swal-input1" class="swal2-input" placeholder="Project Title">' +
        '<textarea id="swal-input2" class="swal2-textarea" placeholder="Project Description"></textarea>',
      focusConfirm: false,
      preConfirm: () => {
        return [
          (document.getElementById('swal-input1') as HTMLInputElement).value,
          (document.getElementById('swal-input2') as HTMLTextAreaElement).value
        ]
      }
    }).then((result) => {
      if (result.isConfirmed) {
        const [title, description] = result.value;
        if (title && description) {
          if (project) {
            const updatedProjects = projects.map(p => p.id === project.id ? { ...p, title, description } : p);
            setProjects(updatedProjects);
          } else {
            setProjects([...projects, { title, description }]);
          }
        }
      }
    });
  };

  const deleteSkill = (skillId) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        setSkills(skills.filter(skill => skill.id !== skillId));
        Swal.fire(
          'Deleted!',
          'The skill has been deleted.',
          'success'
        );
      }
    });
  };

  const deleteProject = (projectId) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        setProjects(projects.filter(project => project.id !== projectId));
        Swal.fire(
          'Deleted!',
          'The project has been deleted.',
          'success'
        );
      }
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="container mx-auto px-6 py-12"
    >
      <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-8">Admin Dashboard</h1>
      
      <section className="mb-12 bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Contact Information</h2>
        <div className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={contactInfo.email}
              onChange={handleContactInfoChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Phone</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={contactInfo.phone}
              onChange={handleContactInfoChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>
          <div>
            <label htmlFor="whatsapp" className="block text-sm font-medium text-gray-700 dark:text-gray-300">WhatsApp</label>
            <input
              type="tel"
              id="whatsapp"
              name="whatsapp"
              value={contactInfo.whatsapp}
              onChange={handleContactInfoChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>
        </div>
      </section>

      <section className="mb-12 bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Skills</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {skills.map((skill, index) => (
            <div key={index} className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg flex justify-between items-center">
              <div>
                <h3 className="font-semibold">{skill.name}</h3>
                <p>Level: {skill.level}</p>
              </div>
              <div>
                <button onClick={() => openSkillModal(skill)} className="text-blue-600 hover:text-blue-800 mr-2">
                  <Edit size={20} />
                </button>
                <button onClick={() => deleteSkill(skill.id)} className="text-red-600 hover:text-red-800">
                  <Trash size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>
        <button
          onClick={() => openSkillModal()}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300 flex items-center"
        >
          <Plus size={20} className="mr-2" /> Add Skill
        </button>
      </section>

      <section className="mb-12 bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Projects</h2>
        <div className="space-y-4">
          {projects.map((project, index) => (
            <div key={index} className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold">{project.title}</h3>
                <div>
                  <button onClick={() => openProjectModal(project)} className="text-blue-600 hover:text-blue-800 mr-2">
                    <Edit size={20} />
                  </button>
                  <button onClick={() => deleteProject(project.id)} className="text-red-600 hover:text-red-800">
                    <Trash size={20} />
                  </button>
                </div>
              </div>
              <p className="text-sm">{project.description}</p>
            </div>
          ))}
        </div>
        <button
          onClick={() => openProjectModal()}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300 flex items-center"
        >
          <Plus size={20} className="mr-2" /> Add Project
        </button>
      </section>

      <section className="mb-12 bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Messages</h2>
        <div className="space-y-4">
          {messages.map((message, index) => (
            <div key={index} className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4">
              <h3 className="font-semibold text-gray-800 dark:text-white">{message.name}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">{message.email}</p>
              <p className="mt-2 text-gray-700 dark:text-gray-200">{message.message}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-12 bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Change Password</h2>
        <div className="space-y-4">
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            placeholder="New Password"
          />
          <button
            onClick={handleChangePassword}
            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition duration-300"
          >
            Change Password
          </button>
        </div>
      </section>

      <button
        onClick={handleSave}
        className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300"
      >
        Save All Changes
      </button>
    </motion.div>
  );
};

export default AdminDashboard;