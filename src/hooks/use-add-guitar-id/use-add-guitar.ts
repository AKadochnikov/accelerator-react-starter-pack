import {useDispatch, useSelector} from 'react-redux';
import {getAddedGuitars} from '../../store/data/selectors';
import {Dispatch, MouseEvent, SetStateAction} from 'react';
import {addGuitar} from '../../store/data/actions';
import {AddedGuitar} from '../../types/types';

export const useAddGuitarId = (id: number, setIsOpenedCartModal: Dispatch<SetStateAction<boolean>>, handleKeyDown: (evt: KeyboardEvent) => void) => {
  const addedGuitars = useSelector(getAddedGuitars);
  const dispatch = useDispatch();

  const handleAddCartButton = (evt: MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
    evt.preventDefault();
    const count = 1;
    const guitars: AddedGuitar[] = addedGuitars.slice();
    const index: number = addedGuitars.findIndex((item) => item.id === id);

    if(index !== -1) {
      const currentGuitar: AddedGuitar = addedGuitars[index];
      const newGuitar: AddedGuitar = {...currentGuitar, count: currentGuitar.count + count};
      guitars.splice(index, 1, newGuitar);
    } else {
      guitars.push({
        id: id,
        count: count,
      });
    }

    dispatch(addGuitar(guitars));
    document.body.removeEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'scroll';
    setIsOpenedCartModal(false);
  };

  return {handleAddCartButton};
};
