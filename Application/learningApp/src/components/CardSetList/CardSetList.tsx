import React from 'react';
import { Link } from 'react-router-dom';
import { useCardSetsStore } from '../../store/useCardSetsStore';
import './CardSetList.scss';

const CardSetList: React.FC = () => {
  const {
    app,
    newCardSetName,
    editingCardSetId,
    editingCardSetName,
    setNewCardSetName,
    setEditingCardSetName,
    handleAddCardSet,
    handleDeleteCardSet,
    handleChangeCardSetName,
    startEditingCardSetName,
  } = useCardSetsStore();

  return (
    <div className='cardsetlist-container'>
      <ul className="cardset-list">
        {app.cardSets.map((cardSet) => (
          <li key={cardSet.id} className="cardset-item">
            <Link to={`/cardset/${cardSet.id}`} className="cardset-link">
              {cardSet.name}
            </Link>
            <Link to={`/learning/${cardSet.id}`} className="button button-primary">
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
};

export default CardSetList;