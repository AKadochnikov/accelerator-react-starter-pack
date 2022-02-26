import {useDispatch, useSelector} from 'react-redux';
import {getGuitarsId} from '../../store/data/selectors';
import {Dispatch, MouseEvent, SetStateAction} from 'react';
import {addGuitarsId} from '../../store/data/actions';

export const useAddGuitarId = (id: number, setIsOpenedCartModal: Dispatch<SetStateAction<boolean>>, handleKeyDown: (evt: KeyboardEvent) => void) => {
  const guitarsId = useSelector(getGuitarsId);
  const dispatch = useDispatch();

  const handleAddCartButton = (evt: MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
    evt.preventDefault();
    const newGuitarId: number[] = guitarsId.slice();
    newGuitarId.push(id);
    dispatch(addGuitarsId(newGuitarId));
    document.body.removeEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'scroll';
    setIsOpenedCartModal(false);
  };

  return {handleAddCartButton};
};
