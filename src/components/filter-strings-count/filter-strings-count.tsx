import {StringsCount} from '../../const';
import {ThunkAppDispatch} from '../../types/actions';
import {changeGuitarCounts, changePage, changeParams} from '../../store/actions';
import {connect, ConnectedProps} from 'react-redux';
import {ChangeEvent, useEffect, useState} from 'react';
import {debouncedChangeCount, debouncedChangePageStartEnd, getAvailableCounts} from '../../utils';
import {Dispatch, SetStateAction} from 'react';
import {State} from '../../types/state';
import {getPage, getParams} from '../../store/user/selectors';

type FilterStringsCountProps = {
  newGuitarTypes: string[];
  newGuitarCounts: number[];
  onChange:  Dispatch<SetStateAction<number[]>>
}

const mapStateToProps = (state: State) => ({
  params: getParams(state),
  page: getPage(state),
});

const mapDispatchToProps = (dispatch: ThunkAppDispatch) => ({
  onChangeCounts(item: number[]){
    dispatch(changeGuitarCounts(item));
  },
  onChangeParams(value: string) {
    dispatch(changeParams(value));
  },
  onChangePage(value: number) {
    dispatch(changePage(value));
  },
});

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;
type ConnectedComponentProps = PropsFromRedux & FilterStringsCountProps;

function FilterStringsCount (props: ConnectedComponentProps):JSX.Element {
  const {onChangeCounts, newGuitarTypes, onChange, newGuitarCounts, page, params, onChangeParams, onChangePage} = props;
  const [availableCounts, setAvailableCounts] = useState<Set<number>>(new Set());

  const changeCountHandler = (evt: ChangeEvent<HTMLInputElement>) => {
    const newCounts = newGuitarCounts.slice();
    const value = Number(evt.target.value);
    if (newCounts.includes(value)) {
      const index = newCounts.indexOf(value);
      newCounts.splice(index, 1);
      onChange(newCounts);
      void debouncedChangePageStartEnd(onChangePage, onChangeParams, params, page);
      void debouncedChangeCount(newCounts, onChangeCounts);
      return;
    }
    newCounts.push(value);
    onChange(newCounts);
    void debouncedChangePageStartEnd(onChangePage, onChangeParams, params, page);
    void debouncedChangeCount(newCounts, onChangeCounts);
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

export default connector(FilterStringsCount);
