import {useDispatch, useSelector} from 'react-redux';
import {getAddedGuitars} from '../../store/data/selectors';
import {MouseEvent} from 'react';
import {addGuitar} from '../../store/data/actions';

export const useDeleteGuitar = (handleKeyDown: (evt: KeyboardEvent) => void, id: number) => {
  const addedGuitars = useSelector(getAddedGuitars);
  const dispatch = useDispatch();

  return (evt: MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    const index = addedGuitars.findIndex((item) => item.id === id);
    const cartGuitars = addedGuitars.slice();
    cartGuitars.splice(index, 1);
    document.body.style.overflow = 'scroll';
    document.body.removeEventListener('keydown', handleKeyDown);
    dispatch(addGuitar(cartGuitars));
  };
};
