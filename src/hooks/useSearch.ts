import {useLocation} from 'react-router-dom';

export const useSearch = () => {
  const location = useLocation();
  const search = new URLSearchParams(location.search);
  /*if (!search.has(Params.Start) && !search.has(Params.End)) {
    search.set(Params.Start, '0');
    search.set(Params.End, '9');
  }

  if(params !== search.toString() && isInit === false) {
    const newTypes = guitarTypes.slice();
    const newCounts = guitarCounts.slice();
    const counts = search.getAll(Params.StringCount);
    const types = search.getAll(Params.GuitarType);
    types.forEach((type) => {
      newTypes.push(type);
    });
    counts.forEach((count) => {
      newCounts.push(Number(count));
    });

    const currentStart = Number(search.get(Params.Start));
    if (currentStart !== start && search.has(Params.Start)){
      onChangeStart(currentStart);
    }

    const currentEnd = Number(search.get(Params.End));
    if (currentEnd !== end && search.has(Params.End)) {
      onChangeEnd(currentEnd);
    }

    if (adaptedId !== page && id !== undefined) {
      onChangePage(adaptedId);
    }

    changeTypes(newTypes);
    changeCounts(newCounts);
    initParams(search.toString());
  } else if (isInit === false) {
    initParams(params);
  }*/
  return search;
};
