import React from 'react';
import { Application } from '../../types/Application';
import { Link } from 'react-router-dom';
import "./CardSetList.scss"
interface CardSetListProps {
  app: Application;
  handleDeleteCardSet: (cardSetId: string) => void;
  startEditingCardSetName: (cardSetId: string, currentName: string) => void;
  newCardSetName: string;
  setNewCardSetName: React.Dispatch<React.SetStateAction<string>>;
  handleAddCardSet: () => void;
  editingCardSetId: string | null;
  editingCardSetName: string;
  setEditingCardSetName: React.Dispatch<React.SetStateAction<string>>;
  handleChangeCardSetName: () => void;
}

const CardSetList: React.FC<CardSetListProps> = ({
  app,
  handleDeleteCardSet,
  startEditingCardSetName,
  newCardSetName,
  setNewCardSetName,
  handleAddCardSet,
  editingCardSetId,
  setEditingCardSetName,
  editingCardSetName,
  handleChangeCardSetName,
}) => (
  <div>
    <ul className="cardset-list">
      {app.cardSets.map((cardSet) => (
        <li key={cardSet.id} className="cardset-item">
          <Link to={`/cardset/${cardSet.id}`} className="cardset-link">
            {cardSet.name}
          </Link>
          <Link to={`/learn/${cardSet.id}`} className="button button-primary">
            Start Learning
          </Link>
          <button onClick={() => handleDeleteCardSet(cardSet.id)} className="button button-danger">
            Delete
          </button>
          <button onClick={() => startEditingCardSetName(cardSet.id, cardSet.name)} className="button">
            Edit Name
          </button>
        </li>
      ))}
    </ul>

    {!editingCardSetId ? (
      <div className="add-cardset">
        <input
          type="text"
          placeholder="New Card Set Name"
          value={newCardSetName}
          onChange={(e) => setNewCardSetName(e.target.value)}
          className="input"
        />
        <button onClick={handleAddCardSet} className="button button-primary">
          Add New Card Set
        </button>
      </div>
    ) : (
      <div className="edit-cardset">
        <input
          type="text"
          placeholder="Edit Card Set Name"
          value={editingCardSetName}
          onChange={(e) => setEditingCardSetName(e.target.value)}
          className="input"
        />
        <button onClick={handleChangeCardSetName} className="button button-primary">
          Save Name
        </button>
      </div>
    )}
  </div>
);

export default CardSetList;