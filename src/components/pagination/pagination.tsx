import {MouseEvent, useEffect, useState} from 'react';
import {changePaginationPageStartEnd, getPagination} from '../../utils';
import {State} from '../../types/state';
import {getPage, getParams, getTotalGuitars} from '../../store/user/selectors';
import {connect, ConnectedProps} from 'react-redux';
import {ThunkAppDispatch} from '../../types/actions';
import {changePage, changeParams} from '../../store/actions';

const mapStateToProps = (state: State) => ({
  totalGuitars: getTotalGuitars(state),
  page: getPage(state),
  params: getParams(state),
});

const mapDispatchToProps = (dispatch: ThunkAppDispatch) => ({
  onChangePage(value: number) {
    dispatch(changePage(value));
  },
  onChangeParams(newParams: string) {
    dispatch(changeParams(newParams));
  },
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;
type ConnectedComponentProps = PropsFromRedux;

function Pagination (props: ConnectedComponentProps):JSX.Element {
  const [totalPagination, setTotalPagination] = useState<number[]>([]);
  const {totalGuitars, page, onChangePage, params, onChangeParams} = props;

  const handleButtonClick = (evt: MouseEvent<HTMLAnchorElement>) => {
    evt.preventDefault();
    const currentValue = Number(evt.currentTarget.textContent);
    changePaginationPageStartEnd(currentValue, totalGuitars, onChangePage, onChangeParams, params);
  };

  const handleNextButton = (evt: MouseEvent<HTMLAnchorElement>) => {
    evt.preventDefault();
    const currentValue = page+1;
    changePaginationPageStartEnd(currentValue, totalGuitars, onChangePage, onChangeParams, params);
  };

  const handleBackButton = (evt: MouseEvent<HTMLAnchorElement>) => {
    evt.preventDefault();
    const currentValue = page-1;
    changePaginationPageStartEnd(currentValue, totalGuitars, onChangePage, onChangeParams, params);
  };

  useEffect(() => {
    const newTotalPagination = getPagination(totalGuitars);
    setTotalPagination(newTotalPagination);
  }, [totalGuitars]);

  return (
    <div className="pagination page-content__pagination">
      <ul className="pagination__list">
        {Math.min(...totalPagination) === page? '':
          <li className="pagination__page pagination__page--next" id="next">
            <a onClick={handleBackButton} className="link pagination__page-link" href="#">Назад</a>
          </li>}
        {totalPagination.map((item) => (
          <li key={item} className={`pagination__page ${item === page? 'pagination__page--active' : ''}`}>
            <a key={item} onClick={handleButtonClick} className="link pagination__page-link" href='#'>{item}</a>
          </li>
        ))}
        {Math.max(...totalPagination) === page? '':
          <li className="pagination__page pagination__page--next" id="next">
            <a onClick={handleNextButton} className="link pagination__page-link" href="#">Далее</a>
          </li>}
      </ul>
    </div>
  );
}

export default connector(Pagination);
