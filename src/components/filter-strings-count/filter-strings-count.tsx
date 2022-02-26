import {StringsCount} from '../../const';
import {ChangeEvent, useEffect, useState} from 'react';
import {debouncedChangeCountAndType, getAvailableCounts, getFilteredTypes} from '../../utils';
import {Dispatch, SetStateAction} from 'react';
import {useHistory} from 'react-router-dom';
import {useSearch} from '../../hooks/use-search/use-search';

type FilterStringsCountProps = {
  newGuitarCounts: number[];
  newGuitarTypes: string[];
  onChangeCounts:  Dispatch<SetStateAction<number[]>>
  onChangeTypes:  Dispatch<SetStateAction<string[]>>
}

function FilterStringsCount (props: FilterStringsCountProps):JSX.Element {
  const {onChangeCounts, newGuitarCounts, newGuitarTypes, onChangeTypes} = props;

  const [availableCounts, setAvailableCounts] = useState<Set<number>>(new Set());
  const history = useHistory();
  const search = useSearch();

  const changeCountHandler = (evt: ChangeEvent<HTMLInputElement>) => {
    const newCounts = newGuitarCounts.slice();
    const value = Number(evt.target.value);
    if (newCounts.includes(value)) {
      const index = newCounts.indexOf(value);
      newCounts.splice(index, 1);
      onChangeCounts(newCounts);
      onChangeTypes(getFilteredTypes(newCounts, newGuitarTypes));
      void debouncedChangeCountAndType(newCounts, newGuitarTypes, history, search);
      return;
    }
    newCounts.push(value);
    onChangeCounts(newCounts);
    onChangeTypes(getFilteredTypes(newCounts, newGuitarTypes));
    void debouncedChangeCountAndType(newCounts, newGuitarTypes, history, search);
  };

  useEffect(() => {
    setAvailableCounts((getAvailableCounts(newGuitarTypes)));
  }, [newGuitarTypes]);

  return (
    <fieldset className="catalog-filter__block">
      <legend className="catalog-filter__block-title">Количество струн</legend>
      <div className="form-checkbox catalog-filter__block-item">
        <input onChange={changeCountHandler} className="visually-hidden" type="checkbox" id="4-strings" name="4-strings" value={StringsCount.Four} checked={newGuitarCounts.includes(StringsCount.Four)} disabled={!availableCounts.has(StringsCount.Four)}/>
        <label htmlFor="4-strings">4</label>
      </div>
      <div className="form-checkbox catalog-filter__block-item">
        <input onChange={changeCountHandler} className="visually-hidden" type="checkbox" id="6-strings" name="6-strings" value={StringsCount.Six} checked={newGuitarCounts.includes(StringsCount.Six)} disabled={!availableCounts.has(StringsCount.Six)}/>
        <label htmlFor="6-strings">6</label>
      </div>
      <div className="form-checkbox catalog-filter__block-item">
        <input onChange={changeCountHandler} className="visually-hidden" type="checkbox" id="7-strings" name="7-strings" value={StringsCount.Seven} checked={newGuitarCounts.includes(StringsCount.Seven)} disabled={!availableCounts.has(StringsCount.Seven)}/>
        <label htmlFor="7-strings">7</label>
      </div>
      <div className="form-checkbox catalog-filter__block-item">
        <input onChange={changeCountHandler} className="visually-hidden" type="checkbox" id="12-strings" name="12-strings" value={StringsCount.Twelve} checked={newGuitarCounts.includes(StringsCount.Twelve)} disabled={!availableCounts.has(StringsCount.Twelve)}/>
        <label htmlFor="12-strings">12</label>
      </div>
    </fieldset>
  );
}

export default FilterStringsCount;
