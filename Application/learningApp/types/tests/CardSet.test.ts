import { createCardSet, updateNameCardSet, deleteCardSet, addCardToCardSet, CardSet } from '../CardSet';
import { Card } from '../Card';
import { v4 as uuidv4 } from "uuid";

describe('CardSet functions', () => {

  test('createCardSet creates a new CardSet with the given name', () => {
    const name = 'Test Set';
    const cardSet = createCardSet(name);
    
    expect(cardSet).toHaveProperty('id');
    expect(cardSet.name).toBe(name);
    expect(cardSet.cards).toEqual([]);
  });

  test('updateNameCardSet updates the name of an existing CardSet', () => {
    const initialCardSet: CardSet = createCardSet('Initial Name');
    const updatedName = 'Updated Name';
    const updatedCardSet = updateNameCardSet(initialCardSet, updatedName);
    
    expect(updatedCardSet.name).toBe(updatedName);
    expect(updatedCardSet.id).toBe(initialCardSet.id); // ID должен остаться тем же
    expect(updatedCardSet.cards).toEqual(initialCardSet.cards); // Карточки должны остаться теми же
  });

  test('deleteCardSet removes the CardSet with the given ID from the array', () => {
    const cardSet1 = createCardSet('Set 1');
    const cardSet2 = createCardSet('Set 2');
    const cardSets = [cardSet1, cardSet2];
    
    const updatedCardSets = deleteCardSet(cardSets, cardSet1.id);
    
    expect(updatedCardSets.length).toBe(1);
    expect(updatedCardSets[0].id).toBe(cardSet2.id);
  });

  test('addCardToCardSet adds a new card to the correct CardSet', () => {
    const cardSet = createCardSet('Test Set');
    const newCard: Card = { id: '1', frontside: 'Test Term', backside: 'Test Definition' };
    const cardSets = [cardSet];
    
    const updatedCardSets = addCardToCardSet(cardSets, cardSet.id, newCard);
    const updatedCardSet = updatedCardSets.find(cs => cs.id === cardSet.id);
    
    expect(updatedCardSet?.cards.length).toBe(1);
    expect(updatedCardSet?.cards[0]).toEqual(newCard);
  });

});