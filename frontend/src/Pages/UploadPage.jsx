// src/pages/UploadPage.jsx
import { useState } from 'react';
import axios from 'axios';

function UploadPage() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return alert("Please select a file.");

    const formData = new FormData();
    formData.append('timetable', file);

    try {
      const response = await axios.post('http://localhost:3000/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setMessage(response.data.message);
    } catch (error) {
      setMessage('Failed to upload timetable.');
    }
  };

  return (
    <div className="container mx-auto mt-10 p-5">
      <h2 className="text-3xl font-semibold">Upload Timetable PDF</h2>
      <input type="file" onChange={handleFileChange} className="mt-5" />
      <button onClick={handleUpload} className="mt-5 bg-blue-500 text-white py-2 px-4 rounded">
        Upload
      </button>
      {message && <p className="mt-5 text-green-600">{message}</p>}
    </div>
  );
}

export default UploadPage;
