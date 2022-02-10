import {ChangeEvent, Dispatch, SetStateAction, useEffect, useState} from 'react';
import {GuitarType} from '../../const';
import {debouncedChangeCountAndType, getAvailableTypes, getFilteredCounts} from '../../utils';
import {useHistory} from 'react-router-dom';
import {useSearch} from '../../hooks/use-search';

type FilterTypeProps = {
  newGuitarTypes: string[];
  newGuitarCounts: number[];
  onChangeTypes:  Dispatch<SetStateAction<string[]>>;
  onChangeCounts:  Dispatch<SetStateAction<number[]>>;
}

function FilterType (props: FilterTypeProps):JSX.Element {
  const {newGuitarTypes, newGuitarCounts, onChangeTypes, onChangeCounts} = props;
  const [availableTypes, setAvailableTypes] = useState<Set<string>>(new Set());
  const history = useHistory();
  const search = useSearch();

  const changeTypeHandler = (evt: ChangeEvent<HTMLInputElement>) => {
    const newTypes = newGuitarTypes.slice();
    if(newTypes.includes(evt.target.name)) {
      const index =  newTypes.indexOf(evt.target.name);
      newTypes.splice(index, 1);
      onChangeTypes(newTypes);
      onChangeCounts(getFilteredCounts(newGuitarCounts, newTypes));
      void debouncedChangeCountAndType(newGuitarCounts, newTypes, history, search);
      return;
    }
    newTypes.push(evt.target.name);
    onChangeTypes(newTypes);
    onChangeCounts(getFilteredCounts(newGuitarCounts, newTypes));
    void debouncedChangeCountAndType(newGuitarCounts, newTypes, history, search);
  };

  useEffect(() => {
    setAvailableTypes(getAvailableTypes(newGuitarCounts));
  }, [newGuitarCounts]);

  return (
    <fieldset className="catalog-filter__block">
      <legend className="catalog-filter__block-title">Тип гитар</legend>
      <div className="form-checkbox catalog-filter__block-item">
        <input onChange={changeTypeHandler} className="visually-hidden" type="checkbox" id="acoustic" name="acoustic" checked={newGuitarTypes.includes(GuitarType.Acoustic)} disabled={!availableTypes.has(GuitarType.Acoustic)}/>
        <label htmlFor="acoustic">Акустические гитары</label>
      </div>
      <div className="form-checkbox catalog-filter__block-item">
        <input onChange={changeTypeHandler} className="visually-hidden" type="checkbox" id="electric" name="electric" checked={newGuitarTypes.includes(GuitarType.Electric)} disabled={!availableTypes.has(GuitarType.Electric)}/>
        <label htmlFor="electric">Электрогитары</label>
      </div>
      <div className="form-checkbox catalog-filter__block-item">
        <input onChange={changeTypeHandler} className="visually-hidden" type="checkbox" id="ukulele" name="ukulele" checked={newGuitarTypes.includes(GuitarType.Ukulele)} disabled={!availableTypes.has(GuitarType.Ukulele)}/>
        <label htmlFor="ukulele">Укулеле</label>
      </div>
    </fieldset>
  );
}

export default FilterType;
