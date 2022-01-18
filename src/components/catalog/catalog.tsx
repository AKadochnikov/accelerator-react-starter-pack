import CatalogFilter from '../catalog-filter/catalog-filter';
import CatalogSort from '../catalog-sort/catalog-sort';
import CatalogCards from '../catalog-cards/catalog-cards';
import Pagination from '../pagination/pagination';
import {useFetchGuitars} from '../../hooks/useFetchGuitars';
import {useSearch} from '../../hooks/useSearch';

function Catalog ():JSX.Element {
  const search = useSearch();
  const {guitars, totalGuitars} = useFetchGuitars(search.toString());

  return (
    <div className="catalog" data-testid={'catalog'}>
      <CatalogFilter/>
      <CatalogSort/>
      <CatalogCards guitars={guitars}/>
      <Pagination total={totalGuitars}/>
    </div>
  );
}

export default Catalog;
