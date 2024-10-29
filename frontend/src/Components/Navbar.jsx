// src/components/Navbar.jsx
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-blue-600 p-4 text-white">
      <div className="container mx-auto flex justify-between">
        <h1 className="text-2xl font-bold">Schedulify</h1>
        <div className="space-x-4">
          <Link to="/upload" className="hover:text-blue-200">Upload Timetable</Link>
          <Link to="/search" className="hover:text-blue-200">Search Timetable</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
