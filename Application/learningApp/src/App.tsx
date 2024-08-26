import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CardSetList from './components/CardSetList/CardSetList';
import CardSet from './components/CardSet/CardSet';
import LearningProcess from './components/LearningProcess/LearningProcess';
import './App.scss';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CardSetList />} />
        <Route path="/cardset/:id" element={<CardSet />} />
        <Route path="/learning/:id" element={<LearningProcess />} />
      </Routes>
    </Router>
  );
};

export default App;