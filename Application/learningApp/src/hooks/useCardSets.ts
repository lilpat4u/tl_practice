import { useState } from 'react';
import { Application } from '../types/Application';
import { addNewCardSet, deleteCardSetFromApp, changeCardSetName } from '../types/CardSetMethods';

export const useCardSets = () => {
  const [app, setApp] = useState<Application>(() => {
    const savedData = localStorage.getItem('cardAppData');
    return savedData ? JSON.parse(savedData) : { cardSets: [] };
  });
  const [newCardSetName, setNewCardSetName] = useState('');
  const [editingCardSetId, setEditingCardSetId] = useState<string | null>(null);
  const [editingCardSetName, setEditingCardSetName] = useState('');

  const handleAddCardSet = () => {
    if (newCardSetName.trim()) {
      setApp(addNewCardSet(app, newCardSetName.trim()));
      setNewCardSetName('');
    }
  };

  const handleDeleteCardSet = (cardSetId: string) => {
    setApp(deleteCardSetFromApp(app, cardSetId));
  };

  const handleChangeCardSetName = () => {
    if (editingCardSetId && editingCardSetName.trim()) {
      setApp(changeCardSetName(app, editingCardSetId, editingCardSetName.trim()));
      setEditingCardSetId(null);
      setEditingCardSetName('');
    }
  };

  const startEditingCardSetName = (cardSetId: string, currentName: string) => {
    setEditingCardSetId(cardSetId);
    setEditingCardSetName(currentName);
  };

  return {
    app,
    setApp,
    newCardSetName,
    editingCardSetId,
    editingCardSetName,
    setNewCardSetName,
    setEditingCardSetName,
    handleAddCardSet,
    handleDeleteCardSet,
    handleChangeCardSetName,
    startEditingCardSetName,
  };
};