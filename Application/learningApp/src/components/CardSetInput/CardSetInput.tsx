import React from 'react';

interface CardSetInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
  isEditing: boolean;
}

const CardSetInput: React.FC<CardSetInputProps> = ({ value, onChange, onSubmit, isEditing }) => (
  <div className={isEditing ? "edit-cardset" : "add-cardset"}>
    <input
      type="text"
      placeholder={isEditing ? "Edit Card Set Name" : "New Card Set Name"}
      value={value}
      onChange={onChange}
      className="input"
    />
    <button onClick={onSubmit} className="button button-primary">
      {isEditing ? "Save Name" : "Add New Card Set"}
    </button>
  </div>
);

export default CardSetInput;