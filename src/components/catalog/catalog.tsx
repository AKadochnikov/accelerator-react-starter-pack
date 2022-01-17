import CatalogFilter from '../catalog-filter/catalog-filter';
import CatalogSort from '../catalog-sort/catalog-sort';
import CatalogCards from '../catalog-cards/catalog-cards';
import Pagination from '../pagination/pagination';
import {State} from '../../types/state';
import {getGuitars} from '../../store/data/selectors';
import {connect, ConnectedProps} from 'react-redux';

const mapStateToProps = (state: State) => ({
  guitars: getGuitars(state),
});

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;
type ConnectedComponentProps = PropsFromRedux;

function Catalog (props: ConnectedComponentProps):JSX.Element {
  const {guitars} = props;
  return (
    <div className="catalog" data-testid={'catalog'}>
      <CatalogFilter/>
      <CatalogSort/>
      <CatalogCards guitars={guitars}/>
      <Pagination/>
    </div>
  );
}

export default connector(Catalog);
