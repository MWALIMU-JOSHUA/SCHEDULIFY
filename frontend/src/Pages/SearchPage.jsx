// src/pages/SearchPage.jsx
import { useState } from 'react';
import axios from 'axios';

function SearchPage() {
  const [courseCode, setCourseCode] = useState('');
  const [courseName, setCourseName] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    const params = {};
    if (courseCode) params.courseCode = courseCode;
    if (courseName) params.courseName = courseName;

    try {
      const response = await axios.get('http://localhost:3000/timetable', { params });
      setResults(response.data);
    } catch (error) {
      console.error('Failed to retrieve data.');
    }
  };

  return (
    <div className="container mx-auto mt-10 p-5">
      <h2 className="text-3xl font-semibold">Search Timetable</h2>
      <div className="mt-5">
        <input
          type="text"
          placeholder="Course Code"
          value={courseCode}
          onChange={(e) => setCourseCode(e.target.value)}
          className="border p-2 mr-2"
        />
        <input
          type="text"
          placeholder="Course Name"
          value={courseName}
          onChange={(e) => setCourseName(e.target.value)}
          className="border p-2 mr-2"
        />
        <button onClick={handleSearch} className="bg-blue-500 text-white py-2 px-4 rounded">
          Search
        </button>
      </div>
      <div className="mt-5">
        {results.length > 0 ? (
          results.map((result, index) => (
            <div key={index} className="bg-gray-100 p-4 mt-2 rounded shadow">
              <p><strong>Course Code:</strong> {result.courseCode}</p>
              <p><strong>Course Name:</strong> {result.courseName}</p>
              <p><strong>Exam Date:</strong> {result.examDate}</p>
              <p><strong>Exam Time:</strong> {result.examTime}</p>
              <p><strong>Venue:</strong> {result.venue}</p>
              <p><strong>Instructor:</strong> {result.instructor}</p>
              <p><strong>Seating Row:</strong> {result.seatingRow}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No results found.</p>
        )}
      </div>
    </div>
  );
}

export default SearchPage;
