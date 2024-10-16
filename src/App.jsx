import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './components/layout/Layout';
import appRoutes from './routes/appRoutes';
import Unauthorized from './components/Unauthorized';
import ProductDetails from './pages/Products/ProductDetails';

const App = () => (
  <Router>
    <Routes>
      <Route path='/' element={<ProductDetails />}/>
      <Route element={<Layout />}>
        {appRoutes.map((route, index) => (
          <Route key={index} path={route.path} element={route.element} />
        ))}
        <Route path="/unauthorized" element={<Unauthorized />} />
      </Route>
    </Routes>
  </Router>
);

export default App;
