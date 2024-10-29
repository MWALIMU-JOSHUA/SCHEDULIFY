import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar';
import SearchPage from './Pages/SearchPage';
import UploadPage from './Pages/UploadPage';

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<UploadPage />} />
        <Route path="/search" element={<SearchPage />} />
        {/* Add other routes here as needed */}
      </Routes>
    </div>
  );
}

export default App;
