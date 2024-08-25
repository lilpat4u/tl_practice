import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import CardSet from './components/CardSet/CardSet';
import LearningProcess from './components/LearningProcess/LearningProcess';
import CardSetList from './components/CardSetList/CardSetList';
import { useCardSets } from './hooks/useCardSets';
import './App.css';

const App: React.FC = () => {
  const {
    app,
    setApp,
    newCardSetName,
    editingCardSetId,
    editingCardSetName,
    setNewCardSetName,
    setEditingCardSetName,
    handleAddCardSet,
    handleDeleteCardSet,
    handleChangeCardSetName,
    startEditingCardSetName,
  } = useCardSets();

  return (
    <Router>
      <div className="app-container">
        <h1>LearningApp</h1>

        <Routes>
          <Route path="/" element={<Navigate to="/main" />} />
          <Route
            path="/main"
            element={
              <CardSetList
                app={app}
                handleDeleteCardSet={handleDeleteCardSet}
                startEditingCardSetName={startEditingCardSetName}
                newCardSetName={newCardSetName}
                setEditingCardSetName={setEditingCardSetName}
                setNewCardSetName={setNewCardSetName}
                handleAddCardSet={handleAddCardSet}
                editingCardSetId={editingCardSetId}
                editingCardSetName={editingCardSetName}
                handleChangeCardSetName={handleChangeCardSetName}
              />
            }
          />
          <Route path="/cardset/:id" element={<CardSet app={app} setApp={setApp} />} />
          <Route path="/learn/:id" element={<LearningProcess app={app} setApp={setApp} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;