import React from 'react';
import { Link } from 'react-router-dom';
import "./CardSetItem.scss"

interface CardSetItemProps {
  id: string;
  name: string;
  onDelete: () => void;
  onEdit: () => void;
}

const CardSetItem: React.FC<CardSetItemProps> = ({ id, name, onDelete, onEdit }) => (
  <li className="cardset-item">
    <Link to={`/cardset/${id}`} className="cardset-link">
      {name}
    </Link>
    <Link to={`/learn/${id}`} className="button button-primary">
      Start Learning
    </Link>
    <button onClick={onDelete} className="button button-danger">
      Delete
    </button>
    <button onClick={onEdit} className="button">
      Edit Name
    </button>
  </li>
);

export default CardSetItem;