// src/components/LearningProcess.tsx
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Application } from '../types/Application';
import { getCurrentCard, removeCurrentCard, moveCurrentCardToEnd } from '../types/LearningProcess';

interface LearningProcessProps {
  app: Application;
  setApp: React.Dispatch<React.SetStateAction<Application>>;
}

const LearningProcess: React.FC<LearningProcessProps> = ({ app, setApp }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const cardSet = app.cardSets.find(set => set.id === id);
  const [isFlipped, setIsFlipped] = useState(false);

  if (!cardSet) return <div>Card Set not found</div>;

  const currentCard = getCurrentCard(cardSet);

  const handleMarkAsLearned = () => {
    setApp(prevApp => {
      const updatedCardSets = prevApp.cardSets.map(set =>
        set.id === id ? removeCurrentCard(set) : set
      );
      return { ...prevApp, cardSets: updatedCardSets };
    });
    setIsFlipped(false);
  };

  const handleMoveToEnd = () => {
    setApp(prevApp => {
      const updatedCardSets = prevApp.cardSets.map(set =>
        set.id === id ? moveCurrentCardToEnd(set) : set
      );
      return { ...prevApp, cardSets: updatedCardSets };
    });
    setIsFlipped(false);
  };

  const handleFlipCard = () => {
    setIsFlipped(!isFlipped);
  };

  if (!currentCard) {
    return (
      <div>
        <h2>{cardSet.name}</h2>
        <p>No more cards to learn.</p>
        <button onClick={() => navigate('/')}>Back to Home</button>
      </div>
    );
  }

  return (
    <div>
      <h2>Learning: {cardSet.name}</h2>
      <div onClick={handleFlipCard} style={{ cursor: 'pointer' }}>
        {isFlipped ? (
          <div>
            <p>{currentCard.backside}</p>
            <button onClick={handleMarkAsLearned}>Mark as Learned</button>
            <button onClick={handleMoveToEnd}>Move to End</button>
          </div>
        ) : (
          <p>{currentCard.frontside}</p>
        )}
      </div>
    </div>
  );
};

export default LearningProcess;