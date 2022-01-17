import {createMemoryHistory} from 'history';
import {render, screen} from '@testing-library/react';
import {Router} from 'react-router-dom';
import {makeFakeGuitars} from '../../mock';
import CatalogCards from './catalog-cards';

const fakeGuitars = makeFakeGuitars();

const history = createMemoryHistory();

describe('Component: CatalogCard', () => {
  it('should render CatalogCard component', () => {
    render(<Router history={history}><CatalogCards guitars={fakeGuitars}/></Router>);

    expect(screen.getByTestId('catalog-cards')).toBeInTheDocument();
  });
} );
