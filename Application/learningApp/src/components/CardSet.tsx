// src/components/CardSet.tsx
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Application } from '../types/Application';
import { addNewCardToCardSet, deleteCardFromCardSet, changeCardFrontsideInCardSet, changeCardBacksideInCardSet } from '../types/CardMethods';

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

  const handleEditCard = (cardId: string) => {
    if (frontside && backside) {
      setApp(changeCardFrontsideInCardSet(app, id!, cardId, frontside));
      setApp(changeCardBacksideInCardSet(app, id!, cardId, backside));
      setFrontside('');
      setBackside('');
      setEditingCardId(null);
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
    <div>
      <h2>{cardSet.name}</h2>

      <ul>
        {cardSet.cards.map(card => (
          <li key={card.id}>
            <div>
              <p>Front: {card.frontside}</p>
              <p>Back: {card.backside}</p>
              <button onClick={() => startEditing(card.id, card.frontside, card.backside)}>Edit</button>
              <button onClick={() => handleDeleteCard(card.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>

      <div>
        <input
          type="text"
          placeholder="Frontside"
          value={frontside}
          onChange={(e) => setFrontside(e.target.value)}
        />
        <input
          type="text"
          placeholder="Backside"
          value={backside}
          onChange={(e) => setBackside(e.target.value)}
        />

        {editingCardId ? (
          <button onClick={() => handleEditCard(editingCardId)}>Update Card</button>
        ) : (
          <button onClick={handleAddCard}>Add New Card</button>
        )}
      </div>
    </div>
  );
};

export default CardSet;