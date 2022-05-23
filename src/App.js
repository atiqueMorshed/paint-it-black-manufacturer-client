import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Login from './Pages/Account/Login';
import Register from './Pages/Account/Register';
import Home from './Pages/Home/Home';
import Header from './Pages/Shared/Header/Header';

import NotFound from './Pages/Shared/NotFound';
import Footer from './Pages/Shared/Footer';
import RequireAuth from './Pages/Shared/RequireAuth';
import Purchase from './Pages/Purchase/Purchase';
import SendEmailVerification from './Pages/Shared/SendEmailVerification';

const App = () => {
  return (
    <div className="font-nunito">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route
          path="/tools/:toolId"
          element={
            <RequireAuth>
              <Purchase />
            </RequireAuth>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
      <SendEmailVerification />
      <Toaster position="top-right" />
    </div>
  );
};

export default App;
