import {render, screen} from '@testing-library/react';
import {Router} from 'react-router-dom';
import CatalogCards from './catalog-cards';
import {makeFakeGuitars} from '../../mock-guitars';
import {createMemoryHistory} from 'history';
import {LoadingStatus} from '../../const';
import {Provider} from 'react-redux';
import {store} from '../../mock-store';

const history = createMemoryHistory();
const fakeGuitars = makeFakeGuitars();

describe('Component: CatalogCards', () => {
  it('should render CatalogCards component', () => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <CatalogCards loadStatus={LoadingStatus.Complete} guitars={fakeGuitars}/>
        </Router>
      </Provider>);

    expect(screen.getByTestId('catalog-cards')).toBeInTheDocument();
  });
} );
