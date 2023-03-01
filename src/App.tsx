import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Users from './pages/Users';
import UserInfo from './pages/Users/UserInfo';
import PrivateRoute from './utils/PrivateRoute';

type Props = {}

const App = (props: Props) => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth/login" element={<Login />} />
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<Users />} />
          <Route path="/users" element={<Users />} />
          <Route path="/users/:userId" element={<UserInfo />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;