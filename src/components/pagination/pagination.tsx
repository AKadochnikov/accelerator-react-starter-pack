import {MouseEvent, useEffect, useState} from 'react';
import {changePage, checkId, getPagination} from '../../utils';
import {useHistory, useParams} from 'react-router-dom';
import {useSearch} from '../../hooks/use-search';

type PaginationProps = {
  total: number;
}

function Pagination (props: PaginationProps):JSX.Element {
  const [totalPagination, setTotalPagination] = useState<number[]>([]);
  const {total} = props;
  const {id} = useParams<{id: string}>();
  const page = checkId(id);
  const history = useHistory();
  const search = useSearch();

  const handleButtonClick = (evt: MouseEvent<HTMLAnchorElement>) => {
    evt.preventDefault();
    const currentPage = Number(evt.currentTarget.textContent);
    changePage(currentPage, total, history, search);
  };

  const handleNextButton = (evt: MouseEvent<HTMLAnchorElement>) => {
    evt.preventDefault();
    const currentPage = page+1;
    changePage(currentPage, total, history, search);
  };

  const handleBackButton = (evt: MouseEvent<HTMLAnchorElement>) => {
    evt.preventDefault();
    const currentPage = page-1;
    changePage(currentPage, total, history, search);
  };

  useEffect(() => {
    const newTotalPagination = getPagination(total);
    setTotalPagination(newTotalPagination);
  }, [total]);

  if (totalPagination.length === 0) {
    return (<div>   </div>);
  }

  return (
    <div className="pagination page-content__pagination" data-testid={'pagination'}>
      <ul className="pagination__list">
        {Math.min(...totalPagination) === page? '':
          <li className="pagination__page pagination__page--next" id="next">
            <a onClick={handleBackButton} className="link pagination__page-link" href="#handleNextPage">Назад</a>
          </li>}
        {totalPagination.map((item) => (
          <li key={item} className={`pagination__page ${item === page? 'pagination__page--active' : ''}`}>
            <a key={item} onClick={handleButtonClick} className="link pagination__page-link" href={`#page_${item}`}>{item}</a>
          </li>
        ))}
        {Math.max(...totalPagination) === page? '':
          <li className="pagination__page pagination__page--next" id="next">
            <a onClick={handleNextButton} className="link pagination__page-link" href="#handleBackPage">Далее</a>
          </li>}
      </ul>
    </div>
  );
}

export default Pagination;
