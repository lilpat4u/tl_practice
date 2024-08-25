import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  Navigate,
} from "react-router-dom";
import CardSet from "./components/CardSet/CardSet";
import LearningProcess from "../src/components/LearningProcess/LearningProcess";
import { Application } from "../src/types/Application";
import {
  addNewCardSet,
  deleteCardSetFromApp,
  changeCardSetName,
} from "../src/types/CardSetMethods";

import './App.css';

const App: React.FC = () => {
  const [app, setApp] = useState<Application>(() => {
    const savedData = localStorage.getItem('cardAppData');
    return savedData ? JSON.parse(savedData) : { cardSets: [] };
  });
  const [newCardSetName, setNewCardSetName] = useState('');
  const [editingCardSetId, setEditingCardSetId] = useState<string | null>(null);
  const [editingCardSetName, setEditingCardSetName] = useState('');

  const handleAddCardSet = () => {
    if (newCardSetName.trim()) {
      setApp(addNewCardSet(app, newCardSetName.trim()));
      setNewCardSetName('');
    }
  };

  const handleDeleteCardSet = (cardSetId: string) => {
    setApp(deleteCardSetFromApp(app, cardSetId));
  };
  
  

  const handleChangeCardSetName = () => {
    if (editingCardSetId && editingCardSetName.trim()) {
      setApp(changeCardSetName(app, editingCardSetId, editingCardSetName.trim()));
      setEditingCardSetId(null);
      setEditingCardSetName('');
    }
  };

  const startEditingCardSetName = (cardSetId: string, currentName: string) => {
    setEditingCardSetId(cardSetId);
    setEditingCardSetName(currentName);
  };

  return (
    <Router>
      <div className="app-container">
        <h1>LearningApp</h1>

        <Routes>
          {/* Перенаправление с "/" на список колод */}
          <Route path="/" element={<Navigate to="/main" />} />
          {/* Маршрут для списка колод */}
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

// Компонент для отображения списка колод карточек
const CardSetList: React.FC<{
  app: Application;
  handleDeleteCardSet: (cardSetId: string) => void;
  startEditingCardSetName: (cardSetId: string, currentName: string) => void;
  newCardSetName: string;
  setNewCardSetName: React.Dispatch<React.SetStateAction<string>>;
  handleAddCardSet: () => void;
  setEditingCardSetName: React.Dispatch<React.SetStateAction<string>>;
  editingCardSetId: string | null;
  editingCardSetName: string;
  handleChangeCardSetName: () => void;
}> = ({
  app,
  handleDeleteCardSet,
  startEditingCardSetName,
  newCardSetName,
  setNewCardSetName,
  handleAddCardSet,
  editingCardSetId,
  setEditingCardSetName,
  editingCardSetName,
  handleChangeCardSetName,
}) => (
  <div>
    <ul className="cardset-list">
      {app.cardSets.map(cardSet => (
        <li key={cardSet.id} className="cardset-item">
          <Link to={`/cardset/${cardSet.id}`} className="cardset-link">{cardSet.name}</Link>
          <Link to={`/learn/${cardSet.id}`} className="button button-primary">Start Learning</Link>
          <button onClick={() => handleDeleteCardSet(cardSet.id)} className="button button-danger">Delete</button>
          <button onClick={() => startEditingCardSetName(cardSet.id, cardSet.name)} className="button">Edit Name</button>
        </li>
      ))}
    </ul>

    {!editingCardSetId ? (
      <div className="add-cardset">
        <input
          type="text"
          placeholder="New Card Set Name"
          value={newCardSetName}
          onChange={(e) => setNewCardSetName(e.target.value)}
          className="input"
        />
        <button onClick={handleAddCardSet} className="button button-primary">Add New Card Set</button>
      </div>
    ) : (
      <div className="edit-cardset">
        <input
          type="text"
          placeholder="Edit Card Set Name"
          value={editingCardSetName}
          onChange={(e) => setEditingCardSetName(e.target.value)}
          className="input"
        />
        <button onClick={handleChangeCardSetName} className="button button-primary">Save Name</button>
      </div>
    )}
  </div>
);

export default App;