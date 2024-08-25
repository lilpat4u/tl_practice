import { Application } from "./Application";
import { createCardSet, updateNameCardSet, deleteCardSet } from "./CardSet";

function addNewCardSet(app: Application, name: string): Application {
  return {
    ...app,
    cardSets: app.cardSets.concat(createCardSet(name)),
  };
}

function deleteCardSetFromApp(app: Application, cardSetId: string): Application {
  return {
    ...app,
    cardSets: deleteCardSet(app.cardSets, cardSetId),
  };
}

function changeCardSetName(app: Application, cardSetId: string, newName: string): Application {
  const updatedCardSets = app.cardSets.map((cardSet) => {
    if (cardSet.id !== cardSetId) {
      return cardSet;
    }
    return updateNameCardSet(cardSet, newName);
  });

  return {
    ...app,
    cardSets: updatedCardSets,
  };
}

export { addNewCardSet, deleteCardSetFromApp, changeCardSetName };
