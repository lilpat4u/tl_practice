import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Application } from '../../types/Application';
import { addNewCardToCardSet, deleteCardFromCardSet } from '../../types/CardMethods';
import './CardSet.css';

interface CardSetProps {
  app: Application;
  setApp: React.Dispatch<React.SetStateAction<Application>>;
}

const CardSet: React.FC<CardSetProps> = ({ app, setApp }) => {
  const { id } = useParams<{ id: string }>();
  const cardSet = app.cardSets.find(set => set.id === id);

  const [frontside, setFrontside] = useState('');
  const [backside, setBackside] = useState('');
  const [editingCardId, setEditingCardId] = useState<string | null>(null);

  if (!cardSet) return <div>Card Set not found</div>;

  const handleAddCard = () => {
    if (frontside && backside) {
      setApp(addNewCardToCardSet(app, id!, frontside, backside));
      setFrontside('');
      setBackside('');
    }
  };

  const handleEditCard = () => {
    if (editingCardId && frontside && backside) {
      setApp(prevApp => {
        const updatedCardSets = prevApp.cardSets.map(set => {
          if (set.id === id) {
            return {
              ...set,
              cards: set.cards.map(card => 
                card.id === editingCardId 
                  ? { ...card, frontside: frontside, backside: backside } 
                  : card
              )
            };
          }
          return set;
        });
        return { ...prevApp, cardSets: updatedCardSets };
      });
      setEditingCardId(null);
      setFrontside('');
      setBackside('');
    }
  };

  const handleDeleteCard = (cardId: string) => {
    setApp(deleteCardFromCardSet(app, id!, cardId));
  };

  const startEditing = (cardId: string, currentFrontside: string, currentBackside: string) => {
    setEditingCardId(cardId);
    setFrontside(currentFrontside);
    setBackside(currentBackside);
  };

  return (
    <div className="cardset-container">
            <Link to="/main" className="back-button">{"<"} Back</Link>
      <h2 className='cardset-header'>{cardSet.name}</h2>

      <ul className="card-list">
        {cardSet.cards.map(card => (
          <li key={card.id} className="card-item">
            <div className="card-content">
              <p>Front: {card.frontside}</p>
              <p>Back: {card.backside}</p>
              <button onClick={() => startEditing(card.id, card.frontside, card.backside)} className="button">Edit</button>
              <button onClick={() => handleDeleteCard(card.id)} className="button button-danger">Delete</button>
            </div>
          </li>
        ))}
      </ul>

      <div className="add-card">
        <input
          type="text"
          placeholder="Frontside"
          value={frontside}
          onChange={(e) => setFrontside(e.target.value)}
          className="input"
        />
        <input
          type="text"
          placeholder="Backside"
          value={backside}
          onChange={(e) => setBackside(e.target.value)}
          className="input"
        />

        {editingCardId ? (
          <button onClick={handleEditCard} className="button button-primary">Update Card</button>
        ) : (
          <button onClick={handleAddCard} className="button button-primary">Add New Card</button>
        )}
      </div>
    </div>
  );
};

export default CardSet;