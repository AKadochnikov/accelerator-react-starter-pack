import {ChangeEvent, useEffect, useState} from 'react';
import {State} from '../../types/state';
import {connect, ConnectedProps} from 'react-redux';
import {ThunkAppDispatch} from '../../types/actions';
import {getGuitarCounts, getGuitarTypes} from '../../store/user/selectors';
import {changeGuitarTypes} from '../../store/actions';
import {GuitarType} from '../../const';
import {getAvailableTypes} from '../../utils';

const mapStateToProps = (state: State) => ({
  guitarTypes: getGuitarTypes(state),
  guitarCounts: getGuitarCounts(state),
});

const mapDispatchToProps = (dispatch: ThunkAppDispatch) => ({
  onChangeType(item: string[]){
    dispatch(changeGuitarTypes(item));
  },
});

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;
type ConnectedComponentProps = PropsFromRedux;

function FilterType (props: ConnectedComponentProps):JSX.Element {
  const {guitarTypes, guitarCounts, onChangeType} = props;
  const [availableTypes, setAvailableTypes] = useState<Set<string>>(new Set());

  const changeTypeHandler = (evt: ChangeEvent<HTMLInputElement>) => {
    const newGuitarTypes = guitarTypes.slice();
    if(guitarTypes.includes(evt.target.name)) {
      const index =  newGuitarTypes.indexOf(evt.target.name);
      newGuitarTypes.splice(index, 1);
      onChangeType(newGuitarTypes);
      return;
    }
    newGuitarTypes.push(evt.target.name);
    onChangeType(newGuitarTypes);
  };

  useEffect(() => {
    setAvailableTypes(getAvailableTypes(guitarCounts));
  }, [guitarCounts]);

  return (
    <fieldset className="catalog-filter__block">
      <legend className="catalog-filter__block-title">Тип гитар</legend>
      <div className="form-checkbox catalog-filter__block-item">
        <input onChange={changeTypeHandler} className="visually-hidden" type="checkbox" id="acoustic" name="acoustic" checked={guitarTypes.includes(GuitarType.Acoustic)} disabled={!availableTypes.has(GuitarType.Acoustic)}/>
        <label htmlFor="acoustic">Акустические гитары</label>
      </div>
      <div className="form-checkbox catalog-filter__block-item">
        <input onChange={changeTypeHandler} className="visually-hidden" type="checkbox" id="electric" name="electric" checked={guitarTypes.includes(GuitarType.Electric)} disabled={!availableTypes.has(GuitarType.Electric)}/>
        <label htmlFor="electric">Электрогитары</label>
      </div>
      <div className="form-checkbox catalog-filter__block-item">
        <input onChange={changeTypeHandler} className="visually-hidden" type="checkbox" id="ukulele" name="ukulele" checked={guitarTypes.includes(GuitarType.Ukulele)} disabled={!availableTypes.has(GuitarType.Ukulele)}/>
        <label htmlFor="ukulele">Укулеле</label>
      </div>
    </fieldset>
  );
}

export default connector(FilterType);
