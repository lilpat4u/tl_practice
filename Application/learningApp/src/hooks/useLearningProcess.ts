import { useState, useEffect } from 'react';
import { Application } from '../types/Application';
import { CardSet } from '../types/CardSet';
import { useNavigate } from 'react-router-dom';
import { Card } from '../types/Card';

export const useLearningProcess = (app: Application, cardSetId: string) => {
  const [cardSet, setCardSet] = useState<CardSet | null>(null);
  const [isFlipped, setIsFlipped] = useState(false);
  const [allLearned, setAllLearned] = useState(false);
  const [currentCard, setCurrentCard] = useState<Card | null>(null);
  const [unlearnedCards, setUnlearnedCards] = useState<Card[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    const foundCardSet = app.cardSets.find(set => set.id === cardSetId);
    if (foundCardSet) {
      setCardSet(foundCardSet);
      setUnlearnedCards(foundCardSet.cards.filter(card => !card.isLearned));
      setCurrentCard(foundCardSet.cards.find(card => !card.isLearned) || null);
    }
  }, [app, cardSetId]);

  const handleMarkAsLearned = () => {
    if (cardSet && currentCard) {
      const updatedCards = cardSet.cards.map(card =>
        card.id === currentCard.id ? { ...card, isLearned: true } : card
      );
      const updatedCardSet = { ...cardSet, cards: updatedCards };
      setCardSet(updatedCardSet);
      setUnlearnedCards(unlearnedCards.filter(card => card.id !== currentCard.id));
      setCurrentCard(unlearnedCards.find(card => !card.isLearned) || null);
    }
  };

  const handleMoveToEnd = () => {
    if (cardSet && currentCard) {
      const updatedCards = cardSet.cards.filter(card => card.id !== currentCard.id);
      updatedCards.push(currentCard);
      const updatedCardSet = { ...cardSet, cards: updatedCards };
      setCardSet(updatedCardSet);
      setUnlearnedCards(updatedCards.filter(card => !card.isLearned));
    }
  };

  const handleFlipCard = () => {
    setIsFlipped(!isFlipped);
  };

  const handleRestartLearning = () => {
    setAllLearned(false);
    setUnlearnedCards(cardSet?.cards.filter(card => !card.isLearned) || []);
    setCurrentCard(cardSet?.cards.find(card => !card.isLearned) || null);
  };

  return {
    cardSet,
    isFlipped,
    allLearned,
    setAllLearned,
    unlearnedCards,
    currentCard,
    handleMarkAsLearned,
    handleMoveToEnd,
    handleFlipCard,
    handleRestartLearning,
    navigate,
  };
};