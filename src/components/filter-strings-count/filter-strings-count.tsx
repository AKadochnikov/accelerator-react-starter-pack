import {StringsCount} from '../../const';
import {State} from '../../types/state';
import {getGuitarCounts, getGuitarTypes} from '../../store/user/selectors';
import {ThunkAppDispatch} from '../../types/actions';
import {changeGuitarCounts} from '../../store/actions';
import {connect, ConnectedProps} from 'react-redux';
import {ChangeEvent, useEffect, useState} from 'react';
import {getAvailableCounts} from '../../utils';

const mapStateToProps = (state: State) => ({
  guitarTypes: getGuitarTypes(state),
  guitarCounts: getGuitarCounts(state),
});

const mapDispatchToProps = (dispatch: ThunkAppDispatch) => ({
  onChangeCounts(item: number[]){
    dispatch(changeGuitarCounts(item));
  },
});

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;
type ConnectedComponentProps = PropsFromRedux;

function FilterStringsCount (props: ConnectedComponentProps):JSX.Element {
  const {guitarTypes, guitarCounts, onChangeCounts} = props;
  const [availableCounts, setAvailableCounts] = useState<Set<number>>(new Set());

  const changeCountHandler = (evt: ChangeEvent<HTMLInputElement>) => {
    const newGuitarCounts = guitarCounts.slice();
    const value = Number(evt.target.value);
    if (guitarCounts.includes(value)) {
      const index = newGuitarCounts.indexOf(value);
      newGuitarCounts.splice(index, 1);
      onChangeCounts(newGuitarCounts);
      return;
    }
    newGuitarCounts.push(value);
    onChangeCounts(newGuitarCounts);
  };

  useEffect(() => {
    setAvailableCounts((getAvailableCounts(guitarTypes)));
  }, [guitarTypes]);

  // eslint-disable-next-line no-console
  console.log(availableCounts);

  return (
    <fieldset className="catalog-filter__block">
      <legend className="catalog-filter__block-title">Количество струн</legend>
      <div className="form-checkbox catalog-filter__block-item">
        <input onChange={changeCountHandler} className="visually-hidden" type="checkbox" id="4-strings" name="4-strings" value={StringsCount.Four} checked={guitarCounts.includes(StringsCount.Four)} disabled={!availableCounts.has(StringsCount.Four)}/>
        <label htmlFor="4-strings">4</label>
      </div>
      <div className="form-checkbox catalog-filter__block-item">
        <input onChange={changeCountHandler} className="visually-hidden" type="checkbox" id="6-strings" name="6-strings" value={StringsCount.Six} checked={guitarCounts.includes(StringsCount.Six)} disabled={!availableCounts.has(StringsCount.Six)}/>
        <label htmlFor="6-strings">6</label>
      </div>
      <div className="form-checkbox catalog-filter__block-item">
        <input onChange={changeCountHandler} className="visually-hidden" type="checkbox" id="7-strings" name="7-strings" value={StringsCount.Seven} checked={guitarCounts.includes(StringsCount.Seven)} disabled={!availableCounts.has(StringsCount.Seven)}/>
        <label htmlFor="7-strings">7</label>
      </div>
      <div className="form-checkbox catalog-filter__block-item">
        <input onChange={changeCountHandler} className="visually-hidden" type="checkbox" id="12-strings" name="12-strings" value={StringsCount.Twelve} checked={guitarCounts.includes(StringsCount.Twelve)} disabled={!availableCounts.has(StringsCount.Twelve)}/>
        <label htmlFor="12-strings">12</label>
      </div>
    </fieldset>
  );
}

export default connector(FilterStringsCount);
