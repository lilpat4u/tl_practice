import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Application } from '../../types/Application';
import { moveCurrentCardToEnd } from '../../types/LearningProcess';
import { markCardAsLearned } from '../../types/Card';
import "./LearningProcess.css"

interface LearningProcessProps {
  app: Application;
  setApp: React.Dispatch<React.SetStateAction<Application>>;
}



const LearningProcess: React.FC<LearningProcessProps> = ({ app, setApp }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const cardSet = app.cardSets.find(set => set.id === id);
  const [isFlipped, setIsFlipped] = useState(false);
  const [allLearned, setAllLearned] = useState(false);

  if (!cardSet) return <div>Card Set not found</div>;

  // Фильтруем карточки, чтобы исключить выученные
  const unlearnedCards = cardSet.cards.filter(card => !card.isLearned);

  // Если все карточки выучены, показываем соответствующее сообщение и предоставляем выбор действий
  if (unlearnedCards.length === 0 && !allLearned) {
    setAllLearned(true);
    return null; // Ожидаем, чтобы избежать повторного рендеринга
  }

  if (allLearned) {
    return (
      <div>
        <h2 className='wrong-title'>All cards are learned in "{cardSet.name}"!</h2>
        <button
          onClick={() => {
            setApp(prevApp => ({
              ...prevApp,
              cardSets: prevApp.cardSets.map(set =>
                set.id === id
                  ? {
                      ...set,
                      cards: set.cards.map(card => ({ ...card, isLearned: false })),
                    }
                  : set
              ),
            }));
            setAllLearned(false);
          }}
        >
          Restart Learning
        </button>
        <button onClick={() => navigate('/')}>Back to Home</button>
      </div>
    );
  }

  const currentCard = unlearnedCards[0];

  const handleMarkAsLearned = () => {
    setApp(prevApp => {
      const updatedCardSets = prevApp.cardSets.map(set =>
        set.id === id
          ? {
              ...set,
              cards: set.cards.map(card =>
                card.id === currentCard.id ? markCardAsLearned(card) : card
              ),
            }
          : set
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

  return (
    <div className='learning-border'>
      <h2>Learning: {cardSet.name}</h2>
      <div onClick={handleFlipCard} style={{ cursor: 'pointer' }}>
        {isFlipped ? (
          <div className='learning-table'>
            <span>{currentCard.backside}</span>
            <button onClick={handleMarkAsLearned}>Mark as Learned</button>
            <button onClick={handleMoveToEnd}>Move to End</button>
          </div>
        ) : (
          <span>{currentCard.frontside}</span>
        )}
      </div>
    </div>
  );
};

export default LearningProcess;