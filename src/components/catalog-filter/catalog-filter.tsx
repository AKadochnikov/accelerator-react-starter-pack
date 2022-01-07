import FilterPrice from '../filter-price/filter-price';
import FilterType from '../filter-type/filter-type';
import FilterStringsCount from '../filter-strings-count/filter-strings-count';

function CatalogFilter (): JSX.Element {
  return (
    <form className="catalog-filter">
      <h2 className="title title--bigger catalog-filter__title">Фильтр</h2>
      <FilterPrice/>
      <FilterType/>
      <FilterStringsCount/>
    </form>
  );
}

export default CatalogFilter;
