import CatalogFilter from '../catalog-filter/catalog-filter';
import CatalogSort from '../catalog-sort/catalog-sort';
import CatalogCards from '../catalog-cards/catalog-cards';
import Pagination from '../pagination/pagination';
import {useFetchGuitars} from '../../hooks/use-fetch-guitars/use-fetch-guitars';
import {useSearch} from '../../hooks/use-search/use-search';

function Catalog ():JSX.Element {
  const search = useSearch();
  const {guitars, totalGuitars, loadStatus} = useFetchGuitars(search.toString());

  return (
    <div className="catalog" data-testid={'catalog'}>
      <CatalogFilter/>
      <CatalogSort/>
      <CatalogCards guitars={guitars} loadStatus={loadStatus}/>
      <Pagination total={totalGuitars}/>
    </div>
  );
}

export default Catalog;
