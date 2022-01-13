import {ChangeEvent, Dispatch, SetStateAction, useEffect, useState} from 'react';
import {connect, ConnectedProps} from 'react-redux';
import {ThunkAppDispatch} from '../../types/actions';
import {changeGuitarTypes} from '../../store/actions';
import {GuitarType} from '../../const';
import {debouncedChangeType, getAvailableTypes} from '../../utils';

type FilterTypeProps = {
  newGuitarTypes: string[];
  newGuitarCounts: number[];
  onChange:  Dispatch<SetStateAction<string[]>>
}

const mapDispatchToProps = (dispatch: ThunkAppDispatch) => ({
  onChangeType(item: string[]){
    dispatch(changeGuitarTypes(item));
  },
});

const connector = connect(null, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;
type ConnectedComponentProps = PropsFromRedux & FilterTypeProps;

function FilterType (props: ConnectedComponentProps):JSX.Element {
  const {onChangeType, newGuitarTypes, newGuitarCounts, onChange} = props;
  const [availableTypes, setAvailableTypes] = useState<Set<string>>(new Set());

  const changeTypeHandler = (evt: ChangeEvent<HTMLInputElement>) => {
    const newTypes = newGuitarTypes.slice();
    if(newTypes.includes(evt.target.name)) {
      const index =  newTypes.indexOf(evt.target.name);
      newTypes.splice(index, 1);
      onChange(newTypes);
      void debouncedChangeType(newTypes, onChangeType);
      return;
    }
    newTypes.push(evt.target.name);
    onChange(newTypes);
    void debouncedChangeType(newTypes, onChangeType);
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

export default connector(FilterType);
