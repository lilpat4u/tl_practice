import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import CardSet from '../src/components/CardSet';
import LearningProcess from '../src/components/LearningProcess';
import { Application } from '../src/types/Application';
import { addNewCardSet, deleteCardSetFromApp, changeCardSetName } from '../src/types/CardSetMethods';

const App: React.FC = () => {
  const [app, setApp] = useState<Application>({ cardSets: [] });
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
      <div>
        <h1>Card Sets</h1>
        
        <ul>
    {app.cardSets.map(cardSet => (
      <li key={cardSet.id}>
        <Link to={`/cardset/${cardSet.id}`}>{cardSet.name}</Link>
        <Link to={`/learn/${cardSet.id}`}> | Start Learning</Link> {/* Добавлено */}
        <button onClick={() => handleDeleteCardSet(cardSet.id)}>Delete</button>
        <button onClick={() => startEditingCardSetName(cardSet.id, cardSet.name)}>Edit Name</button>
      </li>
    ))}
  </ul>

        {editingCardSetId ? (
          <div>
            <input
              type="text"
              placeholder="Edit Card Set Name"
              value={editingCardSetName}
              onChange={(e) => setEditingCardSetName(e.target.value)}
            />
            <button onClick={handleChangeCardSetName}>Save Name</button>
          </div>
        ) : (
          <div>
            <input
              type="text"
              placeholder="New Card Set Name"
              value={newCardSetName}
              onChange={(e) => setNewCardSetName(e.target.value)}
            />
            <button onClick={handleAddCardSet}>Add New Card Set</button>
          </div>
        )}

        <Routes>
          <Route path="/cardset/:id" element={<CardSet app={app} setApp={setApp} />} />
          <Route path="/learn/:id" element={<LearningProcess app={app} setApp={setApp} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;