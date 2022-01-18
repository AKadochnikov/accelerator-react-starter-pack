import {useLocation} from 'react-router-dom';

export const useSearch = () => {
  const location = useLocation();
  return new URLSearchParams(location.search);
};
