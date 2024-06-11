import React from 'react';
import HomePage from './pages/HomePage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AppDetailPage from './components/AppDetailsPage';
import styled from 'styled-components';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route path="/apps/:id" element={<AppDetailPage />} />
      </Routes>
    </Router>
  );
};

export default App;