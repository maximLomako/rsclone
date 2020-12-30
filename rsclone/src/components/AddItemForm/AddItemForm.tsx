import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import s from './addItemForm.module.css'

type AddItemFormPropsTYpe = {
  addItem: (title: string) => void
}

export const AddItemForm: React.FC<AddItemFormPropsTYpe> = (props) => {
  const {addItem} = props
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [error, setError] = useState<string | null>(null);
  const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (newTaskTitle.trim() === '') {
    }
    setNewTaskTitle(e.currentTarget.value)
    setError(null);
  };
  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    const {key} = e;
    if (key === 'Enter') {
      addItem(newTaskTitle);
      setNewTaskTitle('');
    }
  };
  const addTaskHandler = () => {
    if (newTaskTitle.trim() === '') {
      setError('Title is required');
      return;
    }
    addItem(newTaskTitle.trim());
    setNewTaskTitle('');
  };
  return (
    <div>
      <input value={newTaskTitle}
             onChange={onNewTitleChangeHandler}
             onKeyPress={onKeyPressHandler}
             className={error ? `${s.error}` : ''}
      />
      <button onClick={addTaskHandler}>+</button>
      {error && <div className={s.errorMessage}>{error}</div>}
    </div>
  )
}