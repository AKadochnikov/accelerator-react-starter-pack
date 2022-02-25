import {useDispatch, useSelector} from 'react-redux';
import {getGuitarsId} from '../store/data/selectors';
import {MouseEvent} from 'react';
import {addGuitarsId} from '../store/data/actions';

export const useAddGuitarId = (id: number) => {
  const guitarsId = useSelector(getGuitarsId);
  const dispatch = useDispatch();

  const handleAddCartButton = (evt: MouseEvent<HTMLAnchorElement>) => {
    evt.preventDefault();
    guitarsId.push(id);
    dispatch(addGuitarsId(guitarsId));
  };

  return {handleAddCartButton};
};
