import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Application } from "../types/Application";
import { CardSet } from "../types/CardSet"; // Импортируем тип CardSet
import { addNewCardSet, deleteCardSetFromApp, changeCardSetName } from "../types/CardSetMethods";

interface CardSetsState {
  app: Application;
  newCardSetName: string;
  editingCardSetId: string | null;
  editingCardSetName: string;
  setNewCardSetName: (name: string) => void;
  setEditingCardSetName: (name: string) => void;
  setEditingCardSetId: (id: string | null) => void;
  handleAddCardSet: () => void;
  handleDeleteCardSet: (cardSetId: string) => void;
  handleChangeCardSetName: () => void;
  startEditingCardSetName: (cardSetId: string, currentName: string) => void;
  updateCardSet: (updatedCardSet: CardSet) => void; // Используем правильный тип
}

export const useCardSetsStore = create<CardSetsState>()(
  persist(
    (set, get) => ({
      app: { cardSets: [] },
      newCardSetName: "",
      editingCardSetId: null,
      editingCardSetName: "",
      setNewCardSetName: (name) => set({ newCardSetName: name }),
      setEditingCardSetName: (name) => set({ editingCardSetName: name }),
      setEditingCardSetId: (id) => set({ editingCardSetId: id }),
      handleAddCardSet: () => {
        const { app, newCardSetName } = get();
        if (newCardSetName.trim()) {
          const updatedApp = addNewCardSet(app, newCardSetName.trim());
          set({ app: updatedApp, newCardSetName: "" });
        }
      },
      handleDeleteCardSet: (cardSetId) => {
        const { app } = get();
        const updatedApp = deleteCardSetFromApp(app, cardSetId);
        set({ app: updatedApp });
      },
      handleChangeCardSetName: () => {
        const { app, editingCardSetId, editingCardSetName } = get();
        if (editingCardSetId && editingCardSetName.trim()) {
          const updatedApp = changeCardSetName(app, editingCardSetId, editingCardSetName.trim());
          set({ app: updatedApp, editingCardSetId: null, editingCardSetName: "" });
        }
      },
      startEditingCardSetName: (cardSetId, currentName) => {
        set({ editingCardSetId: cardSetId, editingCardSetName: currentName });
      },
      updateCardSet: (updatedCardSet) => {
        const { app } = get();
        const updatedCardSets = app.cardSets.map((set) => (set.id === updatedCardSet.id ? updatedCardSet : set));
        set({ app: { ...app, cardSets: updatedCardSets } });
      },
    }),
    {
      name: "card-app-storage", // Имя ключа в localStorage
      getStorage: () => localStorage, // Используем localStorage для хранения
    },
  ),
);
