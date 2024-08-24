import { v4 as uuidv4 } from 'uuid';

export type Card = {
  id: string;
  frontside: string;
  backside: string;
  isLearned: boolean; // Новый флаг для отметки карточки как выученной
};

export function createCard(frontside: string, backside: string): Card {
  return {
    id: uuidv4(),
    frontside,
    backside,
    isLearned: false, // Карточка по умолчанию не выучена
  };
}

export function changeCard(card: Card, frontside: string, backside: string): Card {
  return {
    ...card,
    frontside,
    backside,
  };
}

export function markCardAsLearned(card: Card): Card {
  return {
    ...card,
    isLearned: true,
  };
}

export function deleteCard(cards: Card[], cardId: string): Card[] {
  return cards.filter(card => card.id !== cardId);
}