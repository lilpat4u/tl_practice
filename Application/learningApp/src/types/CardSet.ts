import { Card } from "./Card";
import { v4 as uuidv4 } from "uuid";

export type CardSet = {
  id: string;
  name: string;
  cards: Card[];
};

export function createCardSet(name: string): CardSet {
  return {
    id: uuidv4(),
    name,
    cards: [],
  };
}

export function updateNameCardSet(CardSet: CardSet, name: string): CardSet {
  return {
    ...CardSet,
    name,
  };
}

export function deleteCardSet(cardSets: CardSet[], cardSetId: string): CardSet[] {
  return cardSets.filter((cardSet) => cardSet.id !== cardSetId);
}

export function addCardToCardSet(cardSets: CardSet[], cardSetId: string, newCard: Card): CardSet[] {
  return cardSets.map((cardSet) =>
    cardSet.id === cardSetId ? { ...cardSet, cards: [...cardSet.cards, newCard] } : cardSet,
  );
}
