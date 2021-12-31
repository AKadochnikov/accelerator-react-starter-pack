import {useSearch} from '../../hooks/useSearch';
import {Guitar} from '../../types/types';
import {FormEvent, useState} from 'react';
import {useHistory} from 'react-router-dom';
import {AppRoute} from '../../const';

function Header ():JSX.Element {
  const [search, setSearch] = useState<string>('');
  const history = useHistory();

  const { data } = useSearch<Guitar[]>(search);
  // eslint-disable-next-line no-console
  console.log(data?.length);

  const handleInput = (evt: FormEvent<HTMLInputElement>) => {
    // eslint-disable-next-line no-console
    console.log('yoy');
    setSearch(evt.currentTarget.value);
  };

  // eslint-disable-next-line no-console
  console.log(search);

  return (
    <header className="header" id="header">
      <div className="container header__wrapper">
        <a className="header__logo logo">
          <img className="logo__img" width="70" height="70" src="./img/svg/logo.svg" alt="Логотип"/>
        </a>
        <nav className="main-nav">
          <ul className="main-nav__list">
            <li><a className="link main-nav__link link--current" href="#">Каталог</a>
            </li>
            <li><a className="link main-nav__link" href="#">Где купить?</a>
            </li>
            <li><a className="link main-nav__link" href="#">О компании</a>
            </li>
          </ul>
        </nav>
        <div className="form-search">
          <form className="form-search__form">
            <button className="form-search__submit" type="submit">
              <svg className="form-search__icon" width="14" height="15" aria-hidden="true">
                <use xlinkHref="#icon-search"></use>
              </svg>
              <span className="visually-hidden">Начать поиск</span>
            </button>
            <input onInput={(evt) => handleInput(evt)} className="form-search__input" id="search" type="text" autoComplete="off" placeholder="что вы ищите?"/>
            <label className="visually-hidden" htmlFor="search">Поиск</label>
          </form>
          <ul style={{zIndex: 1}} className="form-search__select-list" hidden={data === undefined}>
            {data?.map((item) => (<li key={item.id} className="form-search__select-item" tabIndex={0} onClick={() => history.push(AppRoute.Main)}>{item.name}</li>))}
          </ul>
        </div>
        <a className="header__cart-link" href="#" aria-label="Корзина">
          <svg className="header__cart-icon" width="14" height="14" aria-hidden="true">
            <use xlinkHref="#icon-basket"></use>
          </svg>
          <span className="visually-hidden">Перейти в корзину</span><span className="header__cart-count">2</span>
        </a>
      </div>
    </header>
  );
}

export default Header;
