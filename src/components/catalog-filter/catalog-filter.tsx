import FilterPrice from '../filter-price/filter-price';
import FilterType from '../filter-type/filter-type';
import FilterStringsCount from '../filter-strings-count/filter-strings-count';
import {connect, ConnectedProps} from 'react-redux';
import {State} from '../../types/state';
import {getGuitarCounts, getGuitarTypes} from '../../store/user/selectors';
import {useState} from 'react';
import {Params} from '../../const';

const mapStateToProps = (state: State) => ({
  guitarTypes: getGuitarTypes(state),
  guitarCounts: getGuitarCounts(state),
});

const connector = connect(mapStateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;
type ConnectedComponentProps = PropsFromRedux;

function CatalogFilter (props: ConnectedComponentProps): JSX.Element {
  const {guitarTypes, guitarCounts} = props;
  const [newGuitarCounts, setNewGuitarCounts] = useState<number[]>(guitarCounts.slice());
  const [newGuitarTypes, setNewGuitarTypes] = useState<string[]>(guitarTypes.slice());

  return (
    <form className="catalog-filter">
      <h2 className="title title--bigger catalog-filter__title">Фильтр</h2>
      <FilterPrice/>
      <FilterType key={Params.GuitarType} newGuitarCounts={newGuitarCounts} newGuitarTypes={newGuitarTypes} onChange={setNewGuitarTypes}/>
      <FilterStringsCount key={Params.StringCount} newGuitarCounts={newGuitarCounts} newGuitarTypes={newGuitarTypes} onChange={setNewGuitarCounts}/>
    </form>
  );
}

export default connector(CatalogFilter);
