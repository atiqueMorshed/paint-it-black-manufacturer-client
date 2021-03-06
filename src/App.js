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
import ManageOrder from './Pages/Dashboard/ManageOrder/ManageOrder';
import MakeAdmin from './Pages/Dashboard/MakeAdmin/MakeAdmin';
import AddTool from './Pages/Dashboard/AddTool';
import Blog from './Pages/Blog';
import Portfolio from './Pages/Portfolio';
import ManageTool from './Pages/Dashboard/ManageTool/ManageTool';
import RequireUser from './Pages/Shared/RequireUser';

const App = () => {
  return (
    <div className="font-nunito">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/blog" element={<Blog />} />
        <Route
          path="/tools/:toolId"
          element={
            <RequireAuth>
              <RequireUser>
                <Purchase />
              </RequireUser>
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
          <Route
            path="review"
            element={
              <RequireUser>
                <AddReview />
              </RequireUser>
            }
          />
          <Route
            path="order"
            element={
              <RequireUser>
                <MyOrders />
              </RequireUser>
            }
          />
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
            path="manage-tool"
            element={
              <RequireAdmin>
                <ManageTool />
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
