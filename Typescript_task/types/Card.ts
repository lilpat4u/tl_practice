import { v4 as uuidv4 } from "uuid";

export type Card = {
  id: string;
  frontside: string;
  backside: string;
}

export function createCard(frontside: string, backside: string): Card {
    return {
        id: uuidv4(),
        frontside,
        backside
    };
}

export function changeCard(card: Card, frontside: string, backside: string): Card {
    return {
        ...card,
        frontside,
        backside
    };
}

export function deleteCard(cards: Card[], cardId: string): Card[] {
    return cards.filter(card => card.id !== cardId);
  }

