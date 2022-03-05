import {useDispatch, useSelector} from 'react-redux';
import {getAddedGuitars} from '../../store/data/selectors';
import {MouseEvent} from 'react';
import {addGuitar} from '../../store/data/actions';

export const useDeleteGuitar = (handleClick: (evt: MouseEvent<HTMLAnchorElement | HTMLDivElement | HTMLButtonElement, globalThis.MouseEvent>) => void, id: number) => {
  const addedGuitars = useSelector(getAddedGuitars);
  const dispatch = useDispatch();

  const handleDeleteGuitars = (evt: MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    const index = addedGuitars.findIndex((item) => item.id === id);
    const cartGuitars = addedGuitars.slice();
    cartGuitars.splice(index, 1);
    handleClick(evt);
    dispatch(addGuitar(cartGuitars));
  };

  return handleDeleteGuitars;
};
