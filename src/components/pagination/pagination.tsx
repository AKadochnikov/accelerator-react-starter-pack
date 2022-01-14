import {MouseEvent, useEffect, useState} from 'react';
import {getPagination} from '../../utils';
import {State} from '../../types/state';
import {getPage, getTotalGuitars} from '../../store/user/selectors';
import {connect, ConnectedProps} from 'react-redux';

const mapStateToProps = (state: State) => ({
  totalGuitars: getTotalGuitars(state),
  page: getPage(state),
});

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;
type ConnectedComponentProps = PropsFromRedux;

function Pagination (props: ConnectedComponentProps):JSX.Element {
  const [totalPagination, setTotalPagination] = useState<number[]>([]);
  const {totalGuitars, page} = props;

  const handleButtonClick = (evt: MouseEvent<HTMLAnchorElement>) => {
    evt.preventDefault();
    // eslint-disable-next-line no-console
    console.log(evt.currentTarget.textContent);
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
            <a className="link pagination__page-link" href="#">Назад</a>
          </li>}
        {totalPagination.map((item) => (
          <li key={item} className={`pagination__page ${item === page? 'pagination__page--active' : ''}`}>
            <a key={item} onClick={handleButtonClick} className="link pagination__page-link" href='#'>{item}</a>
          </li>
        ))}
        {Math.max(...totalPagination) === page? '':
          <li className="pagination__page pagination__page--next" id="next">
            <a className="link pagination__page-link" href="#">Далее</a>
          </li>}
      </ul>
    </div>
  );
}

export default connector(Pagination);
