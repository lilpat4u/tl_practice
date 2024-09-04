import { getCurrentCard, removeCurrentCard, moveCurrentCardToEnd, CardSet } from '../LearningProcess';
import { Card } from '../Card';

describe('LearningProcess functions', () => {

  test('getCurrentCard returns the first card from the set', () => {
    const card1: Card = { id: '1', frontside: 'Term 1', backside: 'Definition 1' };
    const card2: Card = { id: '2', frontside: 'Term 2', backside: 'Definition 2' };
    const cardSet: CardSet = { id: 'set1', name: 'Test Set', cards: [card1, card2] };
    
    const currentCard = getCurrentCard(cardSet);
    
    expect(currentCard).toBe(card1);
  });

  test('getCurrentCard returns undefined if the card set is empty', () => {
    const cardSet: CardSet = { id: 'set1', name: 'Test Set', cards: [] };
    
    const currentCard = getCurrentCard(cardSet);
    
    expect(currentCard).toBeUndefined();
  });

  test('removeCurrentCard removes the first card from the set', () => {
    const card1: Card = { id: '1', frontside: 'Term 1', backside: 'Definition 1' };
    const card2: Card = { id: '2', frontside: 'Term 2', backside: 'Definition 2' };
    const cardSet: CardSet = { id: 'set1', name: 'Test Set', cards: [card1, card2] };
    
    const updatedCardSet = removeCurrentCard(cardSet);
    
    expect(updatedCardSet.cards.length).toBe(1);
    expect(updatedCardSet.cards[0]).toBe(card2);
  });

  test('removeCurrentCard returns an empty set if there is only one card', () => {
    const card1: Card = { id: '1', frontside: 'Term 1', backside: 'Definition 1' };
    const cardSet: CardSet = { id: 'set1', name: 'Test Set', cards: [card1] };
    
    const updatedCardSet = removeCurrentCard(cardSet);
    
    expect(updatedCardSet.cards.length).toBe(0);
  });

  test('moveCurrentCardToEnd moves the first card to the end of the set', () => {
    const card1: Card = { id: '1', frontside: 'Term 1', backside: 'Definition 1' };
    const card2: Card = { id: '2', frontside: 'Term 2', backside: 'Definition 2' };
    const cardSet: CardSet = { id: 'set1', name: 'Test Set', cards: [card1, card2] };
    
    const updatedCardSet = moveCurrentCardToEnd(cardSet);
    
    expect(updatedCardSet.cards.length).toBe(2);
    expect(updatedCardSet.cards[0]).toBe(card2);
    expect(updatedCardSet.cards[1]).toBe(card1);
  });

  test('moveCurrentCardToEnd returns the original set if there is only one card', () => {
    const card1: Card = { id: '1', frontside: 'Term 1', backside: 'Definition 1' };
    const cardSet: CardSet = { id: 'set1', name: 'Test Set', cards: [card1] };
    
    const updatedCardSet = moveCurrentCardToEnd(cardSet);
    
    expect(updatedCardSet.cards.length).toBe(1);
    expect(updatedCardSet.cards[0]).toBe(card1);
  });

});