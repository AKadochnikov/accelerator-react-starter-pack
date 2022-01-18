import {render, screen} from '@testing-library/react';
import {Router} from 'react-router-dom';
import CatalogCards from './catalog-cards';
import {makeFakeGuitars} from '../../mockGuitars';
import {createMemoryHistory} from 'history';

const history = createMemoryHistory();
const fakeGuitars = makeFakeGuitars();

describe('Component: CatalogCards', () => {
  it('should render CatalogCards component', () => {
    render(<Router history={history}><CatalogCards guitars={fakeGuitars}/></Router>);

    expect(screen.getByTestId('catalog-cards')).toBeInTheDocument();
  });
} );
