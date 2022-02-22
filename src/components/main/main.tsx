import Icons from '../icons/icons';
import Header from '../header/header';
import Footer from '../footer/footer';
import Catalog from '../catalog/catalog';
import {Link} from 'react-router-dom';
import {AppRoute, isCatalog} from '../../const';
import {useSearch} from '../../hooks/use-search';

function Main (): JSX.Element {
  const search = useSearch();
  document.title = 'Guitar-shop';

  return (
    <>
      <Icons/>
      <div className="wrapper" data-testid={'main'}>
        <Header isCatalog={isCatalog.yes}/>
        <main className="page-content">
          <div className="container">
            <h1 className="page-content__title title title--bigger">Каталог гитар</h1>
            <ul className="breadcrumbs page-content__breadcrumbs">
              <li className="breadcrumbs__item"><Link to={AppRoute.Main} className="link" >Главная</Link>
              </li>
              <li className="breadcrumbs__item"><Link to={`${AppRoute.Main}page_1?${search.toString()}`} className="link">Каталог</Link>
              </li>
            </ul>
            <Catalog/>
          </div>
        </main>
        <Footer/>
      </div>
    </>
  );
}

export default Main;
