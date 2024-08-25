import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Application } from '../../types/Application';
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
      const updatedCardSets = prevApp.cardSets.map(set => {
        if (set.id === id) {
          // Перемещаем первую карточку в конец колоды
          const [firstCard, ...remainingCards] = set.cards;
          return {
            ...set,
            cards: [...remainingCards, firstCard],
          };
        }
        return set;
      });
  
      return { ...prevApp, cardSets: updatedCardSets };
    });
  
    setIsFlipped(false);  // Возвращаем карточку в состояние лицевой стороны
  };

  const handleFlipCard = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className='learning-border'>
    <Link to="/main" className="back-button">{"<"} Back</Link>
    <h2>Learning: {cardSet.name}</h2>
      <div onClick={handleFlipCard} className={`card ${isFlipped ? 'flipped' : ''}`}>
        {isFlipped ? (
          <div>
            <p>{currentCard.backside}</p>
            <button onClick={handleMarkAsLearned} className="button button-primary">Mark as Learned</button>
            <button onClick={handleMoveToEnd} className="button">Move to End</button>
          </div>
        ) : (
          <p>{currentCard.frontside}</p>
        )}
      </div>
    </div>
  );
};

export default LearningProcess;