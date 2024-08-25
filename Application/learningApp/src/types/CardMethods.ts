import { Application } from "./Application";
import { createCard, changeCard, deleteCard } from "./Card";
import { addCardToCardSet } from "./CardSet";

function addNewCardToCardSet(app: Application, cardSetId: string, frontside: string, backside: string): Application {
  const newCard = createCard(frontside, backside);
  const updatedCardSets = addCardToCardSet(app.cardSets, cardSetId, newCard);

  return {
    ...app,
    cardSets: updatedCardSets,
  };
}

function deleteCardFromCardSet(app: Application, cardSetId: string, cardId: string): Application {
  const updatedCardSets = app.cardSets.map((cardSet) => {
    if (cardSet.id !== cardSetId) {
      return cardSet;
    }
    return {
      ...cardSet,
      cards: deleteCard(cardSet.cards, cardId),
    };
  });

  return {
    ...app,
    cardSets: updatedCardSets,
  };
}

function changeCardFrontsideInCardSet(
  app: Application,
  cardSetId: string,
  cardId: string,
  newFrontside: string,
): Application {
  const updatedCardSets = app.cardSets.map((cardSet) => {
    if (cardSet.id !== cardSetId) {
      return cardSet;
    }
    return {
      ...cardSet,
      cards: cardSet.cards.map((card) => {
        if (card.id !== cardId) {
          return card;
        }
        return changeCard(card, newFrontside, card.backside);
      }),
    };
  });

  return {
    ...app,
    cardSets: updatedCardSets,
  };
}

function changeCardBacksideInCardSet(
  app: Application,
  cardSetId: string,
  cardId: string,
  newBackside: string,
): Application {
  const updatedCardSets = app.cardSets.map((cardSet) => {
    if (cardSet.id !== cardSetId) {
      return cardSet;
    }
    return {
      ...cardSet,
      cards: cardSet.cards.map((card) => {
        if (card.id !== cardId) {
          return card;
        }
        return changeCard(card, card.frontside, newBackside);
      }),
    };
  });

  return {
    ...app,
    cardSets: updatedCardSets,
  };
}

export { addNewCardToCardSet, deleteCardFromCardSet, changeCardFrontsideInCardSet, changeCardBacksideInCardSet };
