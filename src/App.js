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
import Dashboard from './Pages/Dashboard/Dashboard';
import MyOrders from './Pages/Dashboard/MyOrders/MyOrders';
import Profile from './Pages/Dashboard/Profile';
import AddReview from './Pages/Dashboard/AddReview';
import RequireAdmin from './Pages/Shared/RequireAdmin';
import ManageOrder from './Pages/Dashboard/ManageOrder';
import MakeAdmin from './Pages/Dashboard/MakeAdmin/MakeAdmin';
import AddTool from './Pages/Dashboard/AddTool';

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
        <Route
          path="/dashboard"
          element={
            <RequireAuth>
              <Dashboard />
            </RequireAuth>
          }
        >
          <Route index element={<Profile />} />
          <Route path="review" element={<AddReview />} />
          <Route path="order" element={<MyOrders />} />
          <Route
            path="manage-order"
            element={
              <RequireAdmin>
                <ManageOrder />
              </RequireAdmin>
            }
          />
          <Route
            path="make-admin"
            element={
              <RequireAdmin>
                <MakeAdmin />
              </RequireAdmin>
            }
          />
          <Route
            path="add-tool"
            element={
              <RequireAdmin>
                <AddTool />
              </RequireAdmin>
            }
          />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
      <SendEmailVerification />
      <Toaster position="top-right" />
    </div>
  );
};

export default App;
