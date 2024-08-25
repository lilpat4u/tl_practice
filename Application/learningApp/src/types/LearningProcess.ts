import { Card } from "./Card";

export type CardSet = {
    id: string;
    name: string;
    cards: Card[];
};

export function getCurrentCard(set: CardSet): Card | undefined {
    return set.cards[0];
}

export function removeCurrentCard(set: CardSet): CardSet {
    return {
        ...set,
        cards: set.cards.slice(1)
    };
}

export function moveCurrentCardToEnd(set: CardSet): CardSet {
    const canMove = set.cards.length > 1;
  
    if (!canMove) {
      return set;
    }
  
    const [firstCard, ...remainingCards] = set.cards;
    return {
      ...set,
      cards: [...remainingCards, firstCard],
    };
  }