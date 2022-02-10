import {useSearch} from './use-search';
import {Params} from '../const';

export const useTypesCountsGuitar = () => {
  const search = useSearch();
  const currentTypes:string[] = [];
  const currentCounts:number[] = [];
  if (search.has(Params.GuitarType)){
    const types = search.getAll(Params.GuitarType);
    types.forEach((type) => {
      currentTypes.push(type);
    });
  }

  if (search.has(Params.StringCount)){
    const counts = search.getAll(Params.StringCount);
    counts.forEach((count) => {
      currentCounts.push(Number(count));
    });
  }

  return {currentTypes, currentCounts};
};
