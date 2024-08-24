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
    const canChange = set.cards.length >= 2;

    if (!canChange) {
        return set;
    }

    const currentCard = set.cards[0];
    const otherCards = set.cards.slice(1);
    const updatedCards = [ ...otherCards, currentCard ];

    return {
        ...set,
        cards: updatedCards
    };
}