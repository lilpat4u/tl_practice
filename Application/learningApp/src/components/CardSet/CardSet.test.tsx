import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CardSetList from './CardSet';
import { Application } from '../../types/Application';

const mockApp: Application = {
  cardSets: [
    { id: '1', name: 'Test Set 1', cards: [] },
    { id: '2', name: 'Test Set 2', cards: [] },
  ],
};

test('renders list of card sets', () => {
  render(
    <CardSetList
      app={mockApp}
      handleDeleteCardSet={jest.fn()}
      startEditingCardSetName={jest.fn()}
      newCardSetName=""
      setNewCardSetName={jest.fn()}
      handleAddCardSet={jest.fn()}
      setEditingCardSetName={jest.fn()}
      editingCardSetId={null}
      editingCardSetName=""
      handleChangeCardSetName={jest.fn()}
    />
  );
  
  expect(screen.getByText(/Test Set 1/i)).toBeInTheDocument();
  expect(screen.getByText(/Test Set 2/i)).toBeInTheDocument();
});

test('allows the user to add a new card set', () => {
  const handleAddCardSet = jest.fn();
  
  render(
    <CardSetList
      app={mockApp}
      handleDeleteCardSet={jest.fn()}
      startEditingCardSetName={jest.fn()}
      newCardSetName="New Set"
      setNewCardSetName={jest.fn()}
      handleAddCardSet={handleAddCardSet}
      setEditingCardSetName={jest.fn()}
      editingCardSetId={null}
      editingCardSetName=""
      handleChangeCardSetName={jest.fn()}
    />
  );

  const addButton = screen.getByText(/Add New Card Set/i);
  fireEvent.click(addButton);
  
  expect(handleAddCardSet).toHaveBeenCalledTimes(1);
});