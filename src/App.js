import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Login from './Pages/Account/Login';
import Register from './Pages/Account/Register';
import Home from './Pages/Home/Home';
import Header from './Pages/Shared/Header/Header';

import 'react-toastify/dist/ReactToastify.css';
import NotFound from './Pages/Shared/NotFound';

const App = () => {
  return (
    <div className="font-nunito">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <ToastContainer />
    </div>
  );
};

export default App;
