import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './Pages/Account/Login';
import Home from './Pages/Home/Home';
import Header from './Pages/Shared/Header/Header';

const App = () => {
  return (
    <div className="font-nunito">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
};

export default App;
