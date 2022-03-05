import {Guitar} from '../../types/types';
import {FormEvent, useEffect, useRef, useState} from 'react';
import {useHistory} from 'react-router-dom';
import {AppRoute, Key} from '../../const';
import {debouncedFetchSought} from '../../utils';
import {Link} from 'react-router-dom';
import {KeyboardEvent} from 'react';
import {useSelector} from 'react-redux';
import {getAddedGuitars} from '../../store/data/selectors';
import {memo} from 'react';

type HeaderProps = {
  isCatalog: boolean;
}

function Header (props: HeaderProps):JSX.Element {
  const {isCatalog} = props;
  const [searchInput, setSearchInput] = useState<string>('');
  const [data, setData] = useState<Guitar[] | undefined>(undefined);
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const formRef = useRef<HTMLDivElement | null>(null);
  const history = useHistory();
  const addedGuitars = useSelector(getAddedGuitars);

  const handleInput = (evt: FormEvent<HTMLInputElement>) => {
    let value = '';
    value = evt.currentTarget.value;
    setSearchInput(value);
    void debouncedFetchSought(value, setData);
  };

  const handleKeyDown = (evt: KeyboardEvent<HTMLLIElement>, id: number) => {
    if(evt.key === Key.Enter) {
      history.push(`${AppRoute.CurrentGuitar}${id}`);
      setSearchInput('');
      setIsDisabled(true);
    }
  };

  const handleClickOnDocument = (evt: MouseEvent) => {
    if (formRef.current?.contains(evt.target as Node)) {
      return;
    }
    document.removeEventListener('click', handleClickOnDocument);
    setIsDisabled(true);
  };

  const handleClickOnSoughtLink = (id: number) => {
    setIsDisabled(true);
    setSearchInput('');
    history.push(`${AppRoute.CurrentGuitar}${id}`);
  };

  const handleClickInput = () => {
    if(searchInput) {
      setIsDisabled(false);
    }
  };

  document.addEventListener('click', handleClickOnDocument);
  useEffect(() => {
    if (data === undefined) {
      setIsDisabled(true);
      return;
    }
    setIsDisabled(false);
  }, [data]);

  return (
    <header className="header" id="header">
      <div className="container header__wrapper">
        <Link to={AppRoute.Main} className="header__logo logo">
          <img className="logo__img" width="70" height="70" src={'img/svg/logo.svg'} alt="Логотип"/>
        </Link>
        <nav className="main-nav">
          <ul className="main-nav__list">
            <li><Link to={AppRoute.Main} className={`link main-nav__link ${isCatalog? 'link--current': ''}`}>Каталог</Link>
            </li>
            <li><Link to={'#top'} className="link main-nav__link">Где купить?</Link>
            </li>
            <li><Link to={'#top'} className="link main-nav__link">О компании</Link>
            </li>
          </ul>
        </nav>
        <div ref={formRef} className="form-search">
          <form className="form-search__form">
            <button className="form-search__submit" type="submit">
              <svg className="form-search__icon" width="14" height="15" aria-hidden="true">
                <use xlinkHref="#icon-search"/>
              </svg>
              <span className="visually-hidden">Начать поиск</span>
            </button>
            <input onClick={handleClickInput} onInput={(evt) => handleInput(evt)} value={searchInput} className="form-search__input" id="search" type="text" autoComplete="off" placeholder="что вы ищите?" data-testid={'search'}/>
            <label className="visually-hidden" htmlFor="search">Поиск</label>
          </form>
          <ul style={{zIndex: 1}} className="form-search__select-list" hidden={isDisabled}>
            {data?.map((item) =>
              (<li key={item.id} className="form-search__select-item" tabIndex={0} onKeyDown={(evt) => handleKeyDown(evt, item.id)} onClick={() => handleClickOnSoughtLink(item.id)}>{item.name}</li>
              ))}
          </ul>
        </div>
        <Link to={AppRoute.Cart} className="header__cart-link" aria-label="Корзина">
          <svg className="header__cart-icon" width="14" height="14" aria-hidden="true">
            <use xlinkHref="#icon-basket"/>
          </svg>
          <span className="visually-hidden">Перейти в корзину</span>{addedGuitars.length !== 0? <span className="header__cart-count">{addedGuitars.length}</span> : ''}
        </Link>
      </div>
    </header>
  );
}

export default memo(Header);
