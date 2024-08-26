import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCardSetsStore } from '../../store/useCardSetsStore';
import './LearningProcess.scss';

const LearningProcess: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { app, updateCardSet } = useCardSetsStore();
  
  const cardSet = app.cardSets.find((set) => set.id === id);
  
  const [isFlipped, setIsFlipped] = useState(false);

  if (!cardSet) {
    return <div>Card Set not found</div>;
  }

  if (cardSet.cards.length === 0) {
    return (
      <div className="empty-cardset-container">
        <h2>The "{cardSet.name}" Card Set is empty!</h2>
        <p className='empty-cardset-p'>Please add some cards to start learning.</p>
        <Link to={`/cardset/${cardSet.id}`} className="button button-primary">
          Add Cards
        </Link>
      </div>
    );
  }

  const currentCard = cardSet.cards.find((card) => !card.isLearned);

  if (!currentCard) {
    return (
      <div>
        <h2>All cards in "{cardSet.name}" are learned!</h2>
        <button onClick={() => {
          const updatedCardSet = {
            ...cardSet,
            cards: cardSet.cards.map((card) => ({ ...card, isLearned: false })),
          };
          updateCardSet(updatedCardSet);
        }}>
          Restart Learning
        </button>
        <Link to="/">Back to Home</Link>
      </div>
    );
  }

  const handleFlipCard = () => {
    setIsFlipped(!isFlipped);
  };

  const handleMarkAsLearned = () => {
    const updatedCardSet = {
      ...cardSet,
      cards: cardSet.cards.map((card) =>
        card.id === currentCard.id ? { ...card, isLearned: true } : card
      ),
    };
    updateCardSet(updatedCardSet);
    setIsFlipped(false); // Возвращаем карточку в исходное состояние
  };

  const handleMoveToEnd = () => {
    const remainingCards = cardSet.cards.filter((card) => card.id !== currentCard.id);
    const updatedCardSet = {
      ...cardSet,
      cards: [...remainingCards, { ...currentCard, isLearned: false }],
    };
    updateCardSet(updatedCardSet);
    setIsFlipped(false); // Возвращаем карточку в исходное состояние
  };

  return (
    <div className="learning-container">
      <Link to="/" className="back-button">
        {'<'} Back
      </Link>
      <h2>Learning: {cardSet.name}</h2>
      <div onClick={handleFlipCard} className={`card ${isFlipped ? 'flipped' : ''}`}>
        {isFlipped ? (
          <div className="card-back">
            <p>{currentCard.backside}</p>
            <button onClick={handleMarkAsLearned} className="button button-primary">
              Mark as Learned
            </button>
            <button onClick={handleMoveToEnd} className="button">
              Move to End
            </button>
          </div>
        ) : (
          <div className="card-front">
            <p>{currentCard.frontside}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LearningProcess;