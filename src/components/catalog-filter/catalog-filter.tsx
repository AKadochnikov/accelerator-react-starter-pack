import FilterPrice from '../filter-price/filter-price';
import FilterType from '../filter-type/filter-type';
import FilterStringsCount from '../filter-strings-count/filter-strings-count';
import {useState} from 'react';
import {Params} from '../../const';
import {useTypesCountsGuitar} from '../../hooks/use-types-counts-guitar/use-types-counts-guitar';

function CatalogFilter (): JSX.Element {
  const {currentCounts, currentTypes} = useTypesCountsGuitar();
  const [newGuitarCounts, setNewGuitarCounts] = useState<number[]>(currentCounts.slice());
  const [newGuitarTypes, setNewGuitarTypes] = useState<string[]>(currentTypes.slice());

  return (
    <form className="catalog-filter">
      <h2 className="title title--bigger catalog-filter__title">Фильтр</h2>
      <FilterPrice/>
      <FilterType key={Params.GuitarType} newGuitarCounts={newGuitarCounts} newGuitarTypes={newGuitarTypes} onChangeTypes={setNewGuitarTypes} onChangeCounts={setNewGuitarCounts}/>
      <FilterStringsCount key={Params.StringCount} newGuitarCounts={newGuitarCounts} newGuitarTypes={newGuitarTypes} onChangeCounts={setNewGuitarCounts} onChangeTypes={setNewGuitarTypes}/>
    </form>
  );
}

export default CatalogFilter;
